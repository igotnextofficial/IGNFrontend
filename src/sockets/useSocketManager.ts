// apps/web/src/rtcore/useSocketManager.ts
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { Socket } from "socket.io-client";
import { SocketManager, IClientEventHandler,EventMap, TypedSocket } from "./socketmanager";
 

type UseSocketManagerOpts<In extends EventMap,Out extends EventMap> = {
  url: string; token: string; namespace?: string;
  handlers?: IClientEventHandler<In,Out>[];
  transports?: ("websocket"|"polling")[];
  autoConnect?: boolean;
  autoJoin?: { roomId: string; sessionId: string } | null;
};

export function useSocketManager<In extends Record<string,any>, Out extends Record<string,any>>(opts: UseSocketManagerOpts<In,Out>) {
  const { url, token, namespace="/rtc", handlers=[], transports, autoConnect=true, autoJoin=null } = opts;

  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState<string|null>(null);
  const [lastError, setLastError] = useState<string|null>(null);
  const [socket,setSocket] = useState<Socket<In,Out> | null>(null);

  const mgr = useMemo(() => new SocketManager<In,Out>({ url, token, namespace, transports }), [url, token, namespace]);

  const handlersRef = useRef(handlers);
  useEffect(() => { handlersRef.current = handlers; }, [handlers]);

  useEffect(() => {
    if (!autoConnect) return;
    handlersRef.current.forEach(h => mgr.use(h));
    const s = mgr.connect().socket as unknown as Socket<In,Out>;
    
    setSocket(s)

    const onConnect = () => { setConnected(true); setSocketId((s as any).id ?? null); setLastError(null); };
    const onDisconnect = () => { setConnected(false); setSocketId(null); };
    const onErr = (e:any) => setLastError(typeof e === "string" ? e : e?.message || "socket error");

    (s as any).on("connect", onConnect);
    (s as any).on("disconnect", onDisconnect);
    (s as any).on("error:event", onErr);

    return () => {
      (s as any).off("connect", onConnect);
      (s as any).off("disconnect", onDisconnect);
      (s as any).off("error:event", onErr);
      mgr.dispose();
    };
  }, [mgr, autoConnect]);

  // auto-join (and rejoin) a primary room if requested
  useEffect(() => {
    if (!connected || !autoJoin) return;
    mgr.trackRoom(autoJoin.roomId);
    mgr.emitWithAck("join" as unknown as keyof Out & string, { roomId: autoJoin.roomId, sessionId: autoJoin.sessionId } as any).catch(err => setLastError(err?.message || "join failed"));
    return () => mgr.untrackRoom(autoJoin.roomId);
  }, [connected, autoJoin, mgr]);

  // typed helpers
  const emit       = useCallback(mgr.emit.bind(mgr) as any, [mgr]);
  const emitWithAck= useCallback(mgr.emitWithAck.bind(mgr) as any, [mgr]);
  const on  = useCallback(<E extends keyof In>(event: E, cb: In[E]) => (mgr.socket.on as any)(event, cb), [mgr]);
  const off = useCallback(<E extends keyof In>(event: E, cb?: In[E]) => (mgr.socket.off as any)(event, cb as any), [mgr]);

  return { connected, socketId, lastError, socket , emit, emitWithAck, on, off };
}
