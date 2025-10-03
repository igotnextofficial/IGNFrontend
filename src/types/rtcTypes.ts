// packages/shared/rtc-types.ts
import { z } from "zod";

/** Roles we expect in IGN */
export const UserRole = z.enum(["mentor", "mentee", "admin"]);
export type UserRole = z.infer<typeof UserRole>;

export const Claims = z.object({
  sub: z.string().min(3),
  role: UserRole,
  email: z.string().email().optional()
});
export type Claims = z.infer<typeof Claims>;

/** Core RTC payloads */
export const JoinReq = z.object({
  roomId: z.string().min(8),
  sessionId: z.string().min(8)
});
export type JoinReq = z.infer<typeof JoinReq>;

export const Joined = z.object({
  roomId: z.string(),
  selfId: z.string()
});
export type Joined = z.infer<typeof Joined>;

export const PeerJoined = z.object({
  socketId: z.string(),
  user: z.object({ id: z.string(), role: UserRole })
});
export type PeerJoined = z.infer<typeof PeerJoined>;

export const PeerLeft = z.object({
  socketId: z.string()
});
export type PeerLeft = z.infer<typeof PeerLeft>;

export const IceCandidate = z.object({
  candidate: z.any() // Use RTCIceCandidateInit shape on the client
});

export const Offer = z.object({
  sdp: z.string()
});

export const Answer = z.object({
  sdp: z.string()
});

/** Union for signaling payload */
export const SignalPayload = z.discriminatedUnion("type", [
  z.object({ type: z.literal("offer"), sdp: z.string() }),
  z.object({ type: z.literal("answer"), sdp: z.string() }),
  z.object({ type: z.literal("candidate"), candidate: z.any() })
]);
export type SignalPayload = z.infer<typeof SignalPayload>;

/** Outbound (client -> server) events */
export type ClientOutboundEvents = {
  "join": (data: JoinReq, ack?: (ok: boolean) => void) => void;
  "signal": (data: { to: string; payload: SignalPayload }, ack?: (ok: boolean) => void) => void;
  "leave": (roomId: string, ack?: (ok: boolean) => void) => void;
};

/** Inbound (server -> client) events */
export type ClientInboundEvents = {
  "joined": (data: Joined) => void;
  "peer:joined": (data: PeerJoined) => void;
  "peer:left": (data: PeerLeft) => void;
  "signal": (data: { from: string; payload: SignalPayload }) => void;
  "error:event": (data: { code: string; message: string }) => void;
};
