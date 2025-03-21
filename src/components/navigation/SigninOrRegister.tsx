import { Grid, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom";

const SigninOrRegister = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Box
          component={Link}
          to="/login"
          sx={{
            textDecoration: 'none',
            color: '#fd2f30',
            fontWeight: 500,
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            padding: { xs: '6px 12px', sm: '8px 16px' },
            borderRadius: '20px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 99, 71, 0.1)',
              transform: 'translateY(-2px)',
              textDecoration: 'none',
              color: '#1d1917'
            }
          }}
        >
          Log in
        </Box>
      </Grid>
      <Grid item>
        <Box
          component={Link}
          to="/register"
          sx={{
            textDecoration: 'none',
            backgroundColor: '#fd2f30',
            color: '#FBFAF9',
            fontWeight: 500,
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            padding: { xs: '6px 12px', sm: '8px 16px' },
            borderRadius: '20px',
            border: '1px solid #ff6347',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#ff6347',
              borderColor: '#ff6347',
              transform: 'translateY(-2px)',
              textDecoration: 'none',
              color: '#FBFAF9'
            }
          }}
        >
          Sign up
        </Box>
      </Grid>
    </Grid>
  )
}

export default SigninOrRegister

const styles={
    login:{
  
    }
}