// apps/web/src/rtcore/SocketManager.ts
import { io, type Socket as RawSocket } from "socket.io-client";

/** Structural event map (each key -> (...args) => void). */
export type EventMap = { [event: string]: (...args: any[]) => void };

/** Utility: first parameter type of a function. */
type FirstArg<F> = F extends (a: infer A, ...rest: any[]) => any ? A : never;

/** Strongly-typed Socket facade with safe overloads. */
export interface TypedSocket<In extends EventMap, Out extends EventMap>
  extends Omit<RawSocket, "on" | "off" | "emit"> {
  on<E extends keyof In & string>(event: E, listener: In[E]): TypedSocket<In, Out>;
  off<E extends keyof In & string>(event: E, listener: In[E]): TypedSocket<In, Out>;

  /** Payload only (common case). */
  emit<E extends keyof Out & string>(event: E, payload: FirstArg<Out[E]>): RawSocket;

  /** Payload + boolean-ack (standardized). */
  emit<E extends keyof Out & string>(
    event: E,
    payload: FirstArg<Out[E]>,
    ack: (ok: boolean) => void
  ): RawSocket;

  /** Full tuple escape hatch (payload, ack?, ...). */
  emit<E extends keyof Out & string>(event: E, ...args: Parameters<Out[E]>): RawSocket;
}

/** Pluggable handler interface. */
export interface IClientEventHandler<
  In extends EventMap = EventMap,
  Out extends EventMap = EventMap
> {
  register(ctx: { socket: TypedSocket<In, Out>; token: string; namespace: string }): void;
  dispose?(): void;
}

/** Manager options. */
type Options<In extends EventMap, Out extends EventMap> = {
  url: string;
  token: string;
  namespace?: string;
  transports?: ("websocket" | "polling")[];
  maxQueue?: number; // queued emits while disconnected
};

/**
 * Production-ready Socket.IO client manager:
 * - Typed on/off/emit via facade with overloads (payload | payload+ack | full tuple)
 * - Reconnect-safe (queues emits, optional auto-rejoin)
 * - Backoff + soft rate limiting
 * - Pluggable handler modules
 */
export class SocketManager<
  In extends EventMap = EventMap,
  Out extends EventMap = EventMap
> {
  private ctx!: { socket: TypedSocket<In, Out>; token: string; namespace: string };
  private connected = false;
  private queue: { event: keyof Out; payload: any }[] = [];
  private readonly maxQueue: number;
  private handlers: IClientEventHandler<In, Out>[] = [];
  private rooms = new Set<string>(); // auto-rejoin 'join' with {roomId, sessionId: roomId}
  private rate = new Map<string, { tokens: number; last: number }>(); // token-bucket per event

  constructor(private opts: Options<In, Out>) {
    this.maxQueue = opts.maxQueue ?? 100;
  }

  /** Open the socket and install transport listeners. */
  connect() {
    const ns = this.opts.namespace ?? "/rtc";

    const raw = io(`${this.opts.url}${ns}`, {
      auth: { token: this.opts.token },
      withCredentials: true,
      transports: this.opts.transports ?? ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelayMax: 5000,
    }) as RawSocket;

    console.log(`attempting to connect via socket manager`);
    console.log(raw)
    // Cast once to our typed facade for application events.
    const socket = raw as unknown as TypedSocket<In, Out>;
    this.ctx = { socket, token: this.opts.token, namespace: ns };

    raw.on("connect", () => {
      this.connected = true;

      // Register handler modules.
      this.handlers.forEach((h) => h.register(this.ctx));

      // Flush queued emits.
      while (this.queue.length) {
        const e = this.queue.shift()!;
        this.ctx.socket.emit(e.event as any, e.payload);
      }

      // Auto-rejoin known rooms (expects Out has "join": (payload, ack?) => void).
      this.rooms.forEach((roomId) =>
        this.ctx.socket.emit("join", { roomId, sessionId: roomId } as FirstArg<Out["join"]>)
      );
    });

    raw.on("disconnect", () => {
      this.connected = false;
    });

    return this;
  }

  /** Add a handler module. */
  use(h: IClientEventHandler<In, Out>) {
    this.handlers.push(h);
    if (this.connected) h.register(this.ctx);
    return this;
  }

  /** Typed socket facade. */
  get socket(): TypedSocket<In, Out> {
    return this.ctx.socket;
  }

  /** Token-bucket soft rate limiter (default 5 events/sec per event name). */
  private allow(event: string, ratePerSec = 5): boolean {
    const now = Date.now();
    const cap = ratePerSec;
    const state = this.rate.get(event) ?? { tokens: cap, last: now };
    const refill = ((now - state.last) / 1000) * ratePerSec;
    state.tokens = Math.min(cap, state.tokens + refill);
    state.last = now;
    if (state.tokens < 1) {
      this.rate.set(event, state);
      return false;
    }
    state.tokens -= 1;
    this.rate.set(event, state);
    return true;
  }

  /** Track a primary room for auto-rejoin. */
  trackRoom(roomId: string): void { this.rooms.add(roomId); }
  untrackRoom(roomId: string): void { this.rooms.delete(roomId); }

  /**
   * Fire-and-forget emit. If disconnected and `queueIfDisconnected=true`,
   * queues (event, payload) to flush on next connect.
   */
  emit<E extends keyof Out & string>(
    event: E,
    payload: FirstArg<Out[E]>,
    queueIfDisconnected = true
  ): void {
    if (!this.connected) {
      if (!queueIfDisconnected) throw new Error("socket not connected");
      if (this.queue.length >= this.maxQueue) this.queue.shift();
      this.queue.push({ event, payload });
      return;
    }
    if (!this.allow(String(event))) return;
    this.ctx.socket.emit(event, payload); // matches overload 1
  }

  /**
   * Emit with ack. Your Out map should use `(payload, ack?: (ok:boolean) => void) => void`.
   * We pass the ack and resolve/reject based on the boolean.
   */
  emitWithAck<E extends keyof Out & string>(
    event: E,
    payload: FirstArg<Out[E]>,
    timeoutMs = 8000
  ): Promise<boolean> {
    if (!this.connected) {
      if (this.queue.length >= this.maxQueue) this.queue.shift();
      this.queue.push({ event, payload });
      return Promise.resolve(true);
    }
    if (!this.allow(String(event))) {
      return Promise.reject(new Error("rate limited"));
    }

    return new Promise<boolean>((resolve, reject) => {
      let done = false;
      const t = setTimeout(() => {
        if (!done) { done = true; reject(new Error(`Ack timeout for ${event}`)); }
      }, timeoutMs);

      // Directly call the (payload, ack) overload — fully typed, no array spread.
      this.ctx.socket.emit(event, payload, (ok: boolean) => {
        if (done) return;
        done = true;
        clearTimeout(t);
        ok ? resolve(true) : reject(new Error(`Server rejected ${event}`));
      });
    });
  }

  /** Exponential backoff retry over emitWithAck. */
  async emitWithRetry<E extends keyof Out & string>(
    event: E,
    payload: FirstArg<Out[E]>,
    retries = 3,
    base = 400
  ): Promise<boolean> {
    for (let i = 0; i <= retries; i++) {
      try { return await this.emitWithAck(event, payload); }
      catch (e) { if (i === retries) throw e; await new Promise(r => setTimeout(r, base * Math.pow(2, i))); }
    }
    return false;
  }

  /** Clean teardown. */
  dispose(): void {
    try { (this.ctx?.socket as any)?.disconnect?.(); } catch {}
    this.handlers.forEach((h) => h.dispose?.());
    this.queue = [];
    this.rooms.clear();
    this.connected = false;
  }
}
