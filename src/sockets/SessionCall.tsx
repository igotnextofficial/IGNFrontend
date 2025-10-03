// apps/web/src/sockets/SessionCall.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSocketManager } from "./useSocketManager";
import { VideoEvents } from "./events/videoEvents";
import type { AppInbound, AppOutbound } from "./events";
import IGNLogoWithBg from "../components/common/IGNLogoWithBg";
 

// ---- Types derived from your shared maps ----
type SignalEvt = Parameters<AppInbound["signal"]>[0];
type SignalPayload = SignalEvt["payload"];
type JoinedEvt = Parameters<AppInbound["joined"]>[0];
type ErrorEvt = Parameters<AppInbound["error:event"]>[0];

// ---- RTC config (STUN default). Add TURN via prop for prod networks. ----
const DEFAULT_RTC_CONFIG: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  iceCandidatePoolSize: 4,
};

type Props = {
  jwt: string;
  sessionId: string;
  role: "mentor" | "mentee";
  userId: string;
  signalingUrl?: string;          // default https://comm.igotnextmagazine.com
  rtcConfig?: RTCConfiguration | null;   // pass TURN here for prod
  logoUrl: string;                // shown bottom-right (overlay + in recording)
  onRecordingAvailable?: (blob: Blob) => void; // optional upload hook
};

export function SessionCall({
  jwt,
  sessionId,
  role,
  userId,
  signalingUrl = process.env.REACT_APP_SIGNALING_URL || "https://comm.igotnextmagazine.com",
  rtcConfig = DEFAULT_RTC_CONFIG,
  logoUrl,
  onRecordingAvailable,
}: Props) {
  // ---------- UI state ----------
  const [status, setStatus] = useState<"connecting" | "authorizing" | "ready" | "in-call" | "ended" | "error">("connecting");
  const [statusDetail, setStatusDetail] = useState<string>("Connecting…");
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // ---------- Media/RTC ----------
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const remotePeerIdRef = useRef<string | null>(null);
  const selfSocketIdRef = useRef<string | null>(null);
  const sdpInFlightRef = useRef<Promise<void> | null>(null);

  // ---------- Recorder (canvas mix) ----------
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const mixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mixCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const mixRAFRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  const setLog = useCallback((m: string) => {
    setLogs((prev) => (prev.length > 250 ? [...prev.slice(-250), m] : [...prev, m]));
    // eslint-disable-next-line no-console
    console.log("[SessionCall]", m);
  }, []);

  // ---------- Socket wiring (Video only) ----------
  // Refs used by handler module to avoid TDZ with not-yet-declared functions
  const onSignalRef = useRef<(from: string, payload: SignalPayload) => void>(() => {});
  const onPeerJoinedRef = useRef<(id: string) => void>(() => {});
  const onPeerLeftRef = useRef<(id: string) => void>(() => {});

  const videoHandler = useMemo(
    () =>
      new VideoEvents({
        onSignal: (from, payload) => onSignalRef.current(from, payload),
        onPeerJoined: (id) => onPeerJoinedRef.current(id),
        onPeerLeft: (id) => onPeerLeftRef.current(id),
      }),
    []
  );

  const { connected, socketId, emitWithAck, on, off, lastError } =
    useSocketManager<AppInbound, AppOutbound>({
      url: signalingUrl,
      namespace: "/rtc",
      token: jwt,
      handlers: [videoHandler], // safe: handler calls ref functions set later
      autoJoin: { roomId: sessionId, sessionId },
    });

  // Save our current socket id for initiator selection
  useEffect(() => {
    if (socketId) selfSocketIdRef.current = socketId;
  }, [socketId]);

  // Authorization & transport events
  useEffect(() => {
    if (!connected) {
      setStatus("connecting");
      setStatusDetail("Connecting…");
      return;
    }
    setStatus("authorizing");
    setStatusDetail("Authorizing session…");

    const onJoined = (d: JoinedEvt) => {
      setStatus("ready");
      setStatusDetail("Connected. Waiting for peer…");
      setLog(`joined room ${d.roomId} as ${role} (self: ${d.selfId})`);
    };

    const onErr = (e: ErrorEvt) => {
      if (e.code === "UNAUTHORIZED" || e.code === "FORBIDDEN") {
        setStatus("error");
        setStatusDetail("You are not authorized for this session.");
      } else {
        setStatus("error");
        setStatusDetail(e.message || "An error occurred.");
      }
      setLog(`server error: ${e.code} ${e.message}`);
    };

    on("joined", onJoined);
    on("error:event", onErr);
    return () => {
      off("joined", onJoined);
      off("error:event", onErr);
    };
  }, [connected, on, off, role, setLog]);

  useEffect(() => {
    if (lastError) {
      setStatus("error");
      setStatusDetail(lastError);
    }
  }, [lastError]);

  // ---------- define emitSignal BEFORE any helper that uses it ----------
  const emitSignal = useCallback(
    async (to: string, payload: SignalPayload) => {
      await emitWithAck("signal", { to, payload }).catch((e:any) =>
        setLog(`signal emit failed: ${e?.message || e}`)
      );
    },
    [emitWithAck, setLog]
  );

  // ---------- WebRTC helpers (safe order; can use emitSignal above) ----------
  const ensurePeerConnection = useCallback(() => {
    if (pcRef.current) return pcRef.current;
    const pc = new RTCPeerConnection(rtcConfig || undefined);
    pcRef.current = pc;

    pc.ontrack = (e) => {
      if (!remoteStreamRef.current) remoteStreamRef.current = new MediaStream();
      e.streams[0]?.getTracks().forEach((t) => {
        if (!remoteStreamRef.current!.getTracks().includes(t)) {
          remoteStreamRef.current!.addTrack(t);
        }
      });
      if (remoteVideoRef.current && remoteStreamRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }
    };

    pc.onicecandidate = (ev) => {
      if (!ev.candidate) return;
      const to = remotePeerIdRef.current;
      if (!to) return;
      emitSignal(to, { type: "candidate", candidate: ev.candidate.toJSON() }).catch((e) =>
        setLog(`send candidate failed: ${e?.message || e}`)
      );
    };

    pc.oniceconnectionstatechange = async () => {
      const st = pc.iceConnectionState;
      setLog(`ice state: ${st}`);
      if (st === "failed") {
        try {
          const offer = await pc.createOffer({ iceRestart: true });
          await pc.setLocalDescription(offer);
          const to = remotePeerIdRef.current;
          if (to) await emitSignal(to, { type: "offer", sdp: offer.sdp! });
          setLog("ICE restarted");
        } catch (e) {
          setLog(`ICE restart failed: ${(e as any)?.message || e}`);
        }
      }
    };

    pc.onconnectionstatechange = () => {
      setLog(`pc state: ${pc.connectionState}`);
    };

    return pc;
  }, [emitSignal, rtcConfig, setLog]);

  const attachLocalTracks = useCallback(async () => {
    if (!localStreamRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    }
    const pc = ensurePeerConnection();
    const senders = pc.getSenders();
    const haveVideo = senders.some((s) => s.track?.kind === "video");
    const haveAudio = senders.some((s) => s.track?.kind === "audio");
    localStreamRef.current.getTracks().forEach((track) => {
      if (track.kind === "video" && haveVideo) return;
      if (track.kind === "audio" && haveAudio) return;
      pc.addTrack(track, localStreamRef.current!);
    });
  }, [ensurePeerConnection]);

  const makeOffer = useCallback(async (to: string) => {
    const pc = ensurePeerConnection();
    await attachLocalTracks();
    const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await pc.setLocalDescription(offer);
    await emitSignal(to, { type: "offer", sdp: offer.sdp! });
    setLog("sent offer");
  }, [attachLocalTracks, ensurePeerConnection, emitSignal, setLog]);

  const handleOffer = useCallback(async (from: string, sdp: string) => {
    const pc = ensurePeerConnection();
    await attachLocalTracks();
    sdpInFlightRef.current = (async () => {
      await pc.setRemoteDescription({ type: "offer", sdp });
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      await emitSignal(from, { type: "answer", sdp: answer.sdp! });
      setLog("received offer → sent answer");
      setStatus("in-call");
    })();
    await sdpInFlightRef.current;
  }, [attachLocalTracks, ensurePeerConnection, emitSignal, setLog]);

  const handleAnswer = useCallback(async (sdp: string) => {
    const pc = ensurePeerConnection();
    sdpInFlightRef.current = (async () => {
      await pc.setRemoteDescription({ type: "answer", sdp });
      setLog("received answer");
      setStatus("in-call");
    })();
    await sdpInFlightRef.current;
  }, [ensurePeerConnection, setLog]);

  const handleCandidate = useCallback(async (cand: RTCIceCandidateInit) => {
    const pc = ensurePeerConnection();
    try {
      await pc.addIceCandidate(cand);
    } catch (e) {
      setLog(`addIceCandidate error: ${(e as any)?.message || e}`);
    }
  }, [ensurePeerConnection, setLog]);

  // Bind the real implementations into the refs AFTER helpers exist
  useEffect(() => {
    onSignalRef.current = (from: string, payload: SignalPayload) => {
      if (!remotePeerIdRef.current) remotePeerIdRef.current = from;
      if (payload.type === "offer" && payload.sdp) { void handleOffer(from, payload.sdp); return; }
      if (payload.type === "answer" && payload.sdp) { void handleAnswer(payload.sdp); return; }
      if (payload.type === "candidate" && payload.candidate) { void handleCandidate(payload.candidate); }
    };

    onPeerJoinedRef.current = (id: string) => {
      setLog(`peer joined: ${id}`);
      remotePeerIdRef.current = id;
      // Deterministic initiator: lower socket id starts the offer
      if (selfSocketIdRef.current && id && selfSocketIdRef.current.localeCompare(id) < 0) {
        makeOffer(id).catch((e) => setLog(`makeOffer failed: ${e?.message || e}`));
      }
      if (status === "ready") setStatus("in-call");
    };

    onPeerLeftRef.current = (id: string) => {
      setLog(`peer left: ${id}`);
      if (remotePeerIdRef.current === id) {
        remotePeerIdRef.current = null;
        clearRemoteMedia();
        if (isRecording) stopRecording(true);
        setStatus("ready");
        setStatusDetail("Waiting for peer…");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleOffer, handleAnswer, handleCandidate, makeOffer, status, isRecording]);

  // Start local media once socket connects & auth begins
  useEffect(() => {
    if (!connected) return;
    (async () => {
      try {
        await attachLocalTracks();
        setLog("local media ready");
      } catch (e) {
        setStatus("error");
        setStatusDetail(`getUserMedia error: ${(e as any)?.message || e}`);
      }
    })();
  }, [connected, attachLocalTracks, setLog]);

  // ---------- Controls ----------
  const toggleMic = useCallback(() => {
    setMicOn((prev) => {
      const next = !prev;
      localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, []);

  const toggleCam = useCallback(() => {
    setCamOn((prev) => {
      const next = !prev;
      localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, []);

  const startScreenShare = useCallback(async () => {
    if (isScreenSharing) return;
    try {
      const ds = await (navigator.mediaDevices as any).getDisplayMedia({ video: true, audio: false });
      const track: MediaStreamTrack | undefined = ds.getVideoTracks()[0];
      if (!track) return;

      const pc = ensurePeerConnection();
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");
      if (sender) await sender.replaceTrack(track);

      setIsScreenSharing(true);
      track.onended = async () => {
        const cam = localStreamRef.current?.getVideoTracks()[0];
        if (cam && sender) await sender.replaceTrack(cam);
        setIsScreenSharing(false);
      };
    } catch (e) {
      setLog(`screen share error: ${(e as any)?.message || e}`);
    }
  }, [ensurePeerConnection, isScreenSharing, setLog]);

  // ---------- Recording (canvas + mixed audio) ----------
  const chooseMime = () => {
    const cands = [
      "video/webm;codecs=vp9,opus",
      "video/webm;codecs=vp8,opus",
      "video/webm",
    ];
    for (const t of cands) {
      if ((window as any).MediaRecorder?.isTypeSupported?.(t)) return t;
    }
    return "video/webm";
  };

  const createMixedStream = useCallback(async (): Promise<{ stream: MediaStream; stop: () => void }> => {
    const W = 1280, H = 720;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("2D context not available");
    mixCanvasRef.current = canvas;
    mixCtxRef.current = ctx;

    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    const logoLoadP = new Promise<void>((res, rej) => {
      logoImg.onload = () => res();
      logoImg.onerror = () => rej(new Error("Logo failed to load"));
    });
    logoImg.src = logoUrl;
    logoImageRef.current = logoImg;
    await logoLoadP;

    const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ac;
    const dest = ac.createMediaStreamDestination();
    audioDestRef.current = dest;

    const addSource = (ms?: MediaStream | null) => {
      if (!ms) return;
      const s = ac.createMediaStreamSource(ms);
      const g = ac.createGain();
      g.gain.value = 1.0;
      s.connect(g).connect(dest);
    };
    addSource(localStreamRef.current);
    addSource(remoteStreamRef.current);

    const draw = () => {
      const localV = localVideoRef.current;
      const remoteV = remoteVideoRef.current;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      if (remoteV && remoteV.readyState >= 2) {
        const rw = remoteV.videoWidth || W, rh = remoteV.videoHeight || H;
        const rRatio = rw / rh, cRatio = W / H;
        let dw = W, dh = H, dx = 0, dy = 0;
        if (rRatio > cRatio) { dh = H; dw = rh * cRatio; dx = (W - dw) / 2; }
        else { dw = W; dh = W / rRatio; dy = (H - dh) / 2; }
        ctx.drawImage(remoteV, dx, dy, dw, dh);
      }

      const pipW = Math.round(W * 0.26);
      const pipH = Math.round(H * 0.26);
      if (localV && localV.readyState >= 2) {
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 16;
        (ctx as any).beginPath?.();
        (ctx as any).roundRect?.(16, H - pipH - 16, pipW, pipH, 12);
        (ctx as any).clip?.();
        ctx.drawImage(localV, 16, H - pipH - 16, pipW, pipH);
        ctx.restore();
      }

      const lg = logoImageRef.current;
      if (lg && lg.width && lg.height) {
        const targetH = Math.round(H * 0.10);
        const scale = targetH / lg.height;
        const targetW = Math.round(lg.width * scale);
        ctx.save();
        ctx.globalAlpha = 0.92;
        ctx.drawImage(lg, W - targetW - 16, H - targetH - 16, targetW, targetH);
        ctx.restore();
      }

      mixRAFRef.current = requestAnimationFrame(draw);
    };
    draw();

    const videoTrack = (canvas as any).captureStream(30).getVideoTracks()[0];
    const mixed = new MediaStream();
    mixed.addTrack(videoTrack);

    const audioTracks = dest.stream.getAudioTracks();
    if (audioTracks.length) {
      mixed.addTrack(audioTracks[0]);
    } else if (remoteStreamRef.current?.getAudioTracks()[0]) {
      mixed.addTrack(remoteStreamRef.current.getAudioTracks()[0]);
    } else if (localStreamRef.current?.getAudioTracks()[0]) {
      mixed.addTrack(localStreamRef.current.getAudioTracks()[0]);
    }

    const stop = () => {
      if (mixRAFRef.current) cancelAnimationFrame(mixRAFRef.current);
      mixRAFRef.current = null;
      try { videoTrack.stop(); } catch {}
      try { audioCtxRef.current?.close(); } catch {}
      mixCanvasRef.current = null;
      mixCtxRef.current = null;
      audioCtxRef.current = null;
      audioDestRef.current = null;
    };

    return { stream: mixed, stop };
  }, [logoUrl]);

  const startRecording = useCallback(async () => {
    if (isRecording) return;
    if (!remoteStreamRef.current || remoteStreamRef.current.getVideoTracks().length === 0) {
      setLog("Cannot start recording: no remote video yet.");
      return;
    }
    try {
      const { stream, stop } = await createMixedStream();
      const mimeType = chooseMime();
      const rec = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2_000_000 });
      recorderRef.current = rec;
      recordingChunksRef.current = [];

      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) recordingChunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        stop();
        const blob = new Blob(recordingChunksRef.current, { type: rec.mimeType });
        setLog(`recording complete: ${(blob.size / (1024 * 1024)).toFixed(2)} MB`);
        setIsRecording(false);
        if (onRecordingAvailable) onRecordingAvailable(blob);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        a.download = `session-${sessionId}-${stamp}.webm`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      };

      rec.start(4000);
      setIsRecording(true);
      setLog(`recording started (${rec.mimeType})`);
    } catch (e) {
      setLog(`recording error: ${(e as any)?.message || e}`);
    }
  }, [createMixedStream, isRecording, onRecordingAvailable, sessionId, setLog]);

  const stopRecording = useCallback((silent = false) => {
    if (!recorderRef.current) return;
    try { recorderRef.current.stop(); } catch {}
    if (!silent) setLog("stopping recording…");
  }, [setLog]);

  // ---------- End call / cleanup ----------
  const clearRemoteMedia = () => {
    remoteStreamRef.current?.getTracks().forEach((t) => t.stop());
    remoteStreamRef.current = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
  };

  const endCall = useCallback(() => {
    if (isRecording) stopRecording(true);
    try {
      pcRef.current?.getSenders().forEach((s) => s.track?.stop());
      pcRef.current?.getReceivers().forEach((r) => r.track?.stop());
      pcRef.current?.close();
    } catch {}
    pcRef.current = null;

    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;

    clearRemoteMedia();

    remotePeerIdRef.current = null;
    setStatus("ended");
    setStatusDetail("Call ended.");
    setLog("ended call");
  }, [isRecording, stopRecording, setLog]);

  useEffect(() => endCall, [endCall]); // cleanup on unmount

  // ---------- Render ----------
  const canControl = status === "ready" || status === "in-call";

  return (
    <div className="session-call" style={{ display: "grid", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontWeight: 600 }}>
          Session: {sessionId} • You: {role} ({userId})
        </div>
        <div style={{ marginLeft: "auto", opacity: 0.8 }}>
          {status.toUpperCase()} {statusDetail ? `— ${statusDetail}` : ""}
        </div>
      </div>

      {/* Video stage with logo overlay (bottom-right) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <div style={{ position: "relative" }}>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", background: "#000", borderRadius: 8 }}
          />
              <div style={{ position: "absolute", right: 12, bottom: 0, maxWidth: 180, width: "100%", zIndex: 2, pointerEvents: "none", userSelect: "none" }}>
              <IGNLogoWithBg/>
            </div>
          </div>
          <div style={{ position: "relative" }}>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", background: "#000", borderRadius: 8 }}
          />
            <div style={{ position: "absolute", right: 12, bottom: 0, maxWidth: 150, width: "100%", zIndex: 2, pointerEvents: "none", userSelect: "none" }}>
              <IGNLogoWithBg/>
            </div>
          </div>
        </div>
   

      {/* Controls */}
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={toggleMic} disabled={!canControl}>
          {micOn ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button onClick={toggleCam} disabled={!canControl}>
          {camOn ? "Turn Camera Off" : "Turn Camera On"}
        </button>
        {/* <button onClick={startScreenShare} disabled={!canControl || isScreenSharing}>
          {isScreenSharing ? "Sharing…" : "Share Screen"}
        </button> */}
          { role === 'mentor' &&  (!isRecording ? (
          <button onClick={startRecording} disabled={!(status === "in-call")}>
            Start Recording  
          </button>
        ) : (
          <button onClick={() => stopRecording()} style={{ color: "#fff", background: "#d33" }}>
            Stop Recording
          </button>
        ))}
        <button onClick={endCall} style={{ marginLeft: "auto", color: "#fff", background: "#d33" }}>
          End Call
        </button>
      </div>

      {(status === "error" || lastError) && (
        <div style={{ color: "#d33" }}>
          {statusDetail || lastError}
        </div>
      )}
      <details>
        <summary>Logs</summary>
        <pre style={{ whiteSpace: "pre-wrap" }}>{logs.join("\n")}</pre>
      </details>
    </div>
  );
}

/**
 * example:
 * <SessionCall
 *   jwt={jwt}
 *   sessionId={sessionId}
 *   role="mentor"
 *   userId={user.id}
 *   logoUrl="/assets/logo.png"
 *   rtcConfig={{
 *     iceServers: [
 *       { urls: "stun:stun.l.google.com:19302" },
 *       { urls: ["turns:turn.example.com:5349", "turn:turn.example.com:3478"], username: "u", credential: "p" }
 *     ],
 *     iceCandidatePoolSize: 4,
 *   }}
 *   onRecordingAvailable={(blob) => //upload to backend }}
 * />
 */
