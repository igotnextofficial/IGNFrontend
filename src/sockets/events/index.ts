// packages/shared/events.ts
export type RtcInbound = {
  "joined": (d: { roomId: string; selfId: string }) => void;
  "peer:joined": (d: { socketId: string; user: { id: string; role: "mentor"|"mentee"|"admin" } }) => void;
  "peer:left": (d: { socketId: string }) => void;
  "signal": (d: { from: string; payload: { type: "offer"|"answer"|"candidate"; sdp?: string; candidate?: any } }) => void;
  "error:event": (d: { code: string; message: string }) => void;
};
export type RtcOutbound = {
  "join": (d: { roomId: string; sessionId: string }, ack?: (ok:boolean)=>void) => void;
  "signal": (d: { to: string; payload: { type:"offer"|"answer"|"candidate"; sdp?: string; candidate?: any } }, ack?: (ok:boolean)=>void) => void;
  "leave": (roomId: string, ack?: (ok:boolean)=>void) => void;
};

export type ChatInbound = {
  "chat:message": (d: { roomId: string; from: string; text: string; ts: number }) => void;
  "chat:typing": (d: { roomId: string; userId: string; isTyping: boolean }) => void;
};
export type ChatOutbound = {
  "chat:send": (d: { roomId: string; text: string }, ack?: (ok:boolean)=>void) => void;
  "chat:typing": (d: { roomId: string; isTyping: boolean }, ack?: (ok:boolean)=>void) => void;
};

export type AnnounceInbound = {
  "announce:receive": (d: { channel: string; title: string; body: string; ts: number }) => void;
};
export type AnnounceOutbound = {
  "announce:publish": (d: { channel: string; title: string; body: string }, ack?: (ok:boolean)=>void) => void;
};

export type AppInbound  = RtcInbound  & ChatInbound  & AnnounceInbound;
export type AppOutbound = RtcOutbound & ChatOutbound & AnnounceOutbound;
