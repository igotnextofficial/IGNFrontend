// apps/web/src/components/SessionCommClient.tsx
import { useEffect, useMemo, useCallback } from "react";
import { useSocketManager } from "./useSocketManager";
import { VideoEvents } from "./events/videoEvents";
import { ChatEvents } from "./events/chatEvents";

/** Inline event maps (client ← server / client → server). Keep these in sync with your server. */
type AppInbound = {
  "joined": (d: { roomId: string; selfId: string }) => void;
  "peer:joined": (d: { socketId: string; user: { id: string; role: "mentor" | "mentee" | "admin" } }) => void;
  "peer:left": (d: { socketId: string }) => void;
  "signal": (d: { from: string; payload: { type: "offer" | "answer" | "candidate"; sdp?: string; candidate?: any } }) => void;
  "chat:message": (d: { roomId: string; from: string; text: string; ts: number }) => void;
  "announce:receive": (d: { channel: string; title: string; body: string; ts: number }) => void;
  "error:event": (d: { code: string; message: string }) => void;
};

type AppOutbound = {
  "join": (d: { roomId: string; sessionId: string }, ack?: (ok: boolean) => void) => void;
  "signal": (d: { to: string; payload: { type: "offer" | "answer" | "candidate"; sdp?: string; candidate?: any } }, ack?: (ok: boolean) => void) => void;
  "leave": (roomId: string, ack?: (ok: boolean) => void) => void;

  "chat:send": (d: { roomId: string; text: string }, ack?: (ok: boolean) => void) => void;
  "chat:typing": (d: { roomId: string; isTyping: boolean }, ack?: (ok: boolean) => void) => void;

  "announce:publish": (d: { channel: string; title: string; body: string }, ack?: (ok: boolean) => void) => void;
};

// Derived payload types (no `any`)
type SignalPayload = Parameters<AppInbound["signal"]>[0]["payload"];
type ChatMessage = Parameters<AppInbound["chat:message"]>[0];
type Announcement = Parameters<AppInbound["announce:receive"]>[0];

export type SessionCommClientProps = {
  jwt: string;
  sessionId: string;
  signalingUrl?: string;  // default provided below
  namespace?: string;     // default '/rtc'
};

export function SessionCommClient({
  jwt,
  sessionId,
  signalingUrl = process.env.REACT_APP_SIGNALING_URL   ,
  namespace = "/rtc",
}: SessionCommClientProps) {
  if (!jwt) throw new Error("SessionCommClient: 'jwt' is required");
  if (!sessionId) throw new Error("SessionCommClient: 'sessionId' is required");

  // ---- stable, typed callbacks ----
  const onPeerJoined = useCallback((id: string) => {
    // TODO: set remote peer in state if needed
    console.log("[peer:joined]", id);
  }, []);

  const onPeerLeft = useCallback((id: string) => {
    // TODO: teardown peer connection if needed
    console.log("[peer:left]", id);
  }, []);

  const onSignal = useCallback(async (_from: string, payload: SignalPayload) => {
    // TODO: wire to RTCPeerConnection (setRemote/answer/addIceCandidate)
    console.log("[signal]", payload.type);
  }, []);

  const onChatMessage = useCallback((m: ChatMessage) => {
    // TODO: push to chat store
    console.log("[chat:message]", m.text, "from", m.from);
  }, []);

  // ---- handler modules (Video + Chat), memoized ----
  const handlers = useMemo(
    () => [
      new VideoEvents({ onSignal, onPeerJoined, onPeerLeft }),
      new ChatEvents(onChatMessage),
    ],
    [onSignal, onPeerJoined, onPeerLeft, onChatMessage]
  );

  // ---- socket manager (typed) ----
  const { connected, emitWithAck, on, off, lastError } =
    useSocketManager<AppInbound, AppOutbound>({
      url: signalingUrl || "" ,
      namespace,
      token: jwt,
      handlers,
      // If your hook supports autoJoin, you can pass: autoJoin: { roomId: sessionId, sessionId }
    });

  // Join room when connected (and on reconnects).
  useEffect(() => {
    if (!connected) return;
    emitWithAck("join", { roomId: sessionId, sessionId }).catch((e:any) =>
      console.error("join failed:", e?.message || e)
    );
  }, [connected, sessionId, emitWithAck]);

  // Announcements (ad-hoc listener)
  useEffect(() => {
    const cb = (a: Announcement) => console.log("[announce]", a.title);
    on("announce:receive", cb);
    return () => off("announce:receive", cb);
  }, [on, off]);

  // Chat send helper you can pass to a child UI
  const sendChat = useCallback(
    async (text: string) => {
      await emitWithAck("chat:send", { roomId: sessionId, text });
    },
    [emitWithAck, sessionId]
  );

  // Example render: return null if this component is headless,
  // or expose `sendChat` via props/context as needed.
  if (lastError) {
    // eslint-disable-next-line no-console
    console.error("[socket-error]", lastError);
  }
  return null;
}
