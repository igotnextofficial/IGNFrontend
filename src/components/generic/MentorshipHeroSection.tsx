import { Box, Typography, Grid } from '@mui/material';
import RegisterForm from '../../forms/RegisterForm';
import IGNButton from '../common/IGNButton';
import { useNavigate } from 'react-router-dom';

const MentorshipHeroSection = () => {
  const navigate = useNavigate();

  const handleExploreMentors = () => {
    navigate('/mentors');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        py: { xs: 10, md: 16 },
        px: { xs: 2, md: 8 },
        background: 'linear-gradient(135deg, #fd2f30, #ff6347, #f2c85b, #1d1917)',
        backgroundSize: '400% 400%',
        animation: 'gradientFlow 20s ease infinite',
        clipPath: {
          xs: 'polygon(0 0, 100% 0, 100% 95%, 0% 100%)',
          md: 'polygon(0 0, 100% 0, 100% 90%, 0% 100%)',
        },
      }}
    >
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative', zIndex: 2 }}
      >
        {/* Left content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Mentorship That Elevates Your Career
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join the next generation of artists, actors, and creators getting real-world guidance from industry pros. 
            Book 1-on-1 sessions, get honest feedback, and grow with support from those who've already made it.
          </Typography>
          <IGNButton 
            onClick={handleExploreMentors}
            fullWidth={false}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              width: '250px',
              justifyContent: 'center'
            }}>
              Explore Mentors
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L20 12L12 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          </IGNButton>
        </Grid>

        {/* Right side: Register Form */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              bgcolor: 'white',
              color: 'black',
              p: 4,
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <RegisterForm />
          </Box>
        </Grid>
      </Grid>

      {/* Keyframe animation */}
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default MentorshipHeroSection;
