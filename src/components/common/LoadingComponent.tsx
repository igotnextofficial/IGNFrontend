import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import Ignlogo from "../Ignlogo";

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const waveAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const dotsAnimation = keyframes`
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60% { content: '...'; }
  80%, 100% { content: '.'; }
`;

const LoadingComponent = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBFAF9',
      zIndex: 9999,
      overflow: 'hidden',
    }}
  >
    {/* Animated background elements */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.03,
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#1d1917',
            animation: `${waveAnimation} 3s infinite`,
            animationDelay: `${index * 0.5}s`,
            transform: `rotate(${index * 72}deg) translateY(100px)`,
          }}
        />
      ))}
    </Box>

    {/* Main content */}
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: `${pulseAnimation} 2s infinite`,
      }}
    >
      {/* Logo container with gradient border */}
      <Box
        sx={{
          position: 'relative',
          mb: 4,
          padding: '2px',
          borderRadius: '12px',
          background: 'linear-gradient(45deg, #fd2f30, #ff6347, #fd2f30)',
          backgroundSize: '200% 200%',
          animation: 'gradient 3s ease infinite',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fd2f30',
            borderRadius: '10px',
            padding: '8px',
          }}
        >
          <Ignlogo />
        </Box>
      </Box>

      {/* Loading text with custom styling */}
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#1d1917',
          fontWeight: 600,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          '&::after': {
            content: '""',
            animation: `${dotsAnimation} 1.5s infinite`,
          }
        }}
      >
        Loading
      </Typography>

      {/* Decorative elements */}
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          mt: 2,
        }}
      >
        {[...Array(3)].map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#fd2f30',
              animation: `${pulseAnimation} 1s infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </Box>
    </Box>

    {/* Add the gradient animation keyframes */}
    <style>
      {`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>
  </Box>
);

export default LoadingComponent; 