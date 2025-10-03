import type { Socket } from "socket.io-client";
import type { IClientEventHandler,TypedSocket } from "../socketmanager";
import type { AppInbound, AppOutbound } from "./";

// Derive payload types from your inbound map
 

type PeerJoined = Parameters<AppInbound["peer:joined"]>[0];
type PeerLeft   = Parameters<AppInbound["peer:left"]>[0];
type SignalEvt  = Parameters<AppInbound["signal"]>[0];
type SignalPayload = SignalEvt["payload"];

export class VideoEvents implements IClientEventHandler<AppInbound, AppOutbound> {
  private socket?: TypedSocket<AppInbound, AppOutbound>;

  private onPeerJoinedListener?: (e: PeerJoined) => void;
  private onPeerLeftListener?:   (e: PeerLeft) => void;
  private onSignalListener?:     (e: SignalEvt) => void;

  constructor(
    private handlers: {
      onSignal: (from: string, payload: SignalPayload) => void;
      onPeerJoined?: (id: string) => void;
      onPeerLeft?: (id: string) => void;
    }
  ) {}

  register({ socket }: { socket: TypedSocket<AppInbound, AppOutbound> }) {
    this.socket = socket;

    if (!this.onPeerJoinedListener) this.onPeerJoinedListener = (e) => this.handlers.onPeerJoined?.(e.socketId);
    if (!this.onPeerLeftListener)   this.onPeerLeftListener   = (e) => this.handlers.onPeerLeft?.(e.socketId);
    if (!this.onSignalListener)     this.onSignalListener     = (e) => this.handlers.onSignal(e.from, e.payload);

    socket.on("peer:joined", this.onPeerJoinedListener);
    socket.on("peer:left",   this.onPeerLeftListener);
    socket.on("signal",      this.onSignalListener);
  }

  dispose() {
    if (!this.socket) return;
    if (this.onPeerJoinedListener) this.socket.off("peer:joined", this.onPeerJoinedListener);
    if (this.onPeerLeftListener)   this.socket.off("peer:left",   this.onPeerLeftListener);
    if (this.onSignalListener)     this.socket.off("signal",      this.onSignalListener);
    this.socket = undefined;
  }
}