import React from "react";
import { Box, Typography, Avatar, Tooltip, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MenteeDataType } from "../../types/DataTypes";

type Props = {
  mentees: MenteeDataType[];
};

const RisingStarsSection: React.FC<Props> = ({ mentees }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMediumDown = useMediaQuery('(max-width:960px)');
  const isSmallDown = useMediaQuery('(max-width:780px)');

  const isShrink = useMediaQuery('(max-width:1470px)');

  if (!mentees || mentees.length === 0) return null;

  const centerMentee = mentees[0];
  const surroundingMentees = mentees.slice(1, 7);

  const positions = [
    { top: '0%', left: '50%' },
    { top: '25%', left: '0%' },
    { top: '15%', left: '95%' },
    { top: '70%', left: '5%' },
    { top: '70%', left: '100%' },
    { top: '100%', left: '50%' },
  ];

  const HoverAvatar = ({ mentee, size = 180 }: { mentee: MenteeDataType; size?: number }) => (
    <Box
      onClick={() => navigate(`/profile/mentee/${mentee.id}`)}
      sx={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
    >
      <Avatar
        src={mentee.profile_photo_path}
        alt={mentee.fullname}
        sx={{
          width: size,
          height: size,
          border: '3px solid white',
          boxShadow: 3,
        }}
      />
      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(204, 27, 27, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <Typography
          color="white"
          fontWeight={600}
          textAlign="center"
          sx={{
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
            px: 1,
            fontSize: '0.9rem',
          }}
        >
          {mentee.fullname}
        </Typography>
      </Box>
    </Box>
  );

  // Dynamically adjust size based on screen
  const centerSize = isMediumDown ? 220 : isShrink ? 260 : 300;
  const surroundSize = isMediumDown ? 120 : isShrink ? 160 : 180;
  const headingSize = isMediumDown ? '5em' : isShrink ? '6em' : '10em';
  const subtitleSize = isMediumDown ? '1.5em' : '2em';

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 10 }}>
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        direction={isMediumDown ? "column" : "row"}
      >
        {/* Text Column */}
        <Grid item xs={12} md={5} sx={{ textAlign: isMediumDown ? 'center' : 'left' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'normal',
              fontSize: subtitleSize,
              mb: 0,
              textTransform: 'uppercase',
              color: '#111',
            }}
          >
            You should get to Know them
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: headingSize,
              lineHeight: '0.8em',
              mb: 2,
              textTransform: 'uppercase',
              color: '#111',
            }}
          >
            Rising Stars
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#333',
              fontWeight: 'normal',
              maxWidth: 600,
              mx: isMediumDown ? 'auto' : 0,
              mb: isMediumDown ? 4 : 0, 
            }}
          >
            These talented mentees are on the rise. Discover who’s next in music, film, fashion, and beyond.
          </Typography>
        </Grid>

        {/* Avatars */}
        <Grid item xs={12} md={7} sx={{ position: 'relative', width: isSmallDown ? '60%' : '100%' }}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 600,
              height: 600,
              mx: 'auto',
              px: isSmallDown ? 2 : 0,
            }}
          >
            {/* Center Avatar */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <HoverAvatar mentee={centerMentee} size={centerSize} />
            </Box>

            {/* Surrounding Avatars */}
            {surroundingMentees.map((mentee, index) => (
              <Box
                key={mentee.id}
                sx={{
                  position: 'absolute',
                  ...positions[index % positions.length],
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <HoverAvatar
                  mentee={mentee}
                  size={surroundSize + (index % 2 === 0 ? 20 : 0)}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RisingStarsSection;
