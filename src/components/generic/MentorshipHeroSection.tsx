import { Box, Typography, Grid } from '@mui/material';
import RegisterForm from '../../forms/RegisterForm';
import IGNButton from '../common/IGNButton';
import { useNavigate } from 'react-router-dom';
import { text } from 'stream/consumers';

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
    backgroundColor: '#cf1d1d',
    // background: 'linear-gradient(135deg, #fd2f30, #ff6347, #f2c85b )',
    // backgroundSize: '400% 400%',
    // animation: 'gradientFlow 20s ease infinite',

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
          <Typography sx={styles.topLine} variant="h2" fontWeight={700} gutterBottom> Mentorship That </Typography>
          <Typography sx={styles.midLine} variant="h2" fontWeight={700} gutterBottom>
          Elevates
          </Typography>
           <Typography sx={styles.bottomLine} variant="h2" fontWeight={700} gutterBottom>  Your Career </Typography>
          <Typography sx={styles.subText} variant="h6" >
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
        `},
      </style>
    </Box>
  );
};

const styles = {
  topLine: {
    fontSize: { xs: '2em', sm: '2.5em', md:'2em', lg: '3em' },
    textTransform: 'uppercase',
    lineHeight: '1em',
    textAlign: 'left',
  },
  midLine: {
    fontSize: { xs: '4em', sm: '5em',md:'4em', lg: '6em' },
    textTransform: 'uppercase',
    lineHeight: { xs: '0.5em', sm: '0.7em', lg: '0.5em' },
  },
  bottomLine: {
    fontSize: { xs: '2em', sm: '2.5em', md:'2em', lg: '3em' },
    textTransform: 'uppercase',
    lineHeight: { xs: '1em', md: '0' },
    textAlign: 'left',
  },
  subText: {
    fontWeight: 'normal',
    marginTop: {xs:'0',md:'60px'},
    fontSize: { xs: '1em'  },
    wordBreak: "keep-all",
    whiteSpace: "normal", 
    overflowWrap: "normal",
    maxWidth: '750px',
  
  },
};


export default MentorshipHeroSection;
