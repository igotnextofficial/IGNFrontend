import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";

interface ConfettiOverlayProps {
  active: boolean;
  durationMs?: number;
  density?: number;
  onComplete?: () => void;
}

const fall = keyframes`
  0% {
    transform: translate3d(0, -100%, 0) rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: translate3d(var(--confetti-x), 100vh, 0) rotateZ(360deg);
    opacity: 0;
  }
`;

const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"];

const ConfettiOverlay = ({
  active,
  durationMs = 2800,
  density = 120,
  onComplete,
}: ConfettiOverlayProps) => {
  const pieces = useMemo(() => {
    return Array.from({ length: density }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 1.5,
      color: colors[index % colors.length],
      translateX: `${Math.random() * 200 - 100}px`,
      size: 6 + Math.random() * 8,
    }));
  }, [density]);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => onComplete?.(), durationMs);
    return () => clearTimeout(timeout);
  }, [active, durationMs, onComplete]);

  if (!active) {
    return null;
  }

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: (theme) => theme.zIndex.snackbar + 1,
      }}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.id}
          sx={{
            position: "absolute",
            top: "-10vh",
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 0.4,
            bgcolor: piece.color,
            borderRadius: "2px",
            opacity: 0,
            animation: `${fall} ${piece.duration}s linear ${piece.delay}s forwards`,
            transformOrigin: "left top",
            "--confetti-x": piece.translateX,
          }}
        />
      ))}
    </Box>
  );
};

export default ConfettiOverlay;
