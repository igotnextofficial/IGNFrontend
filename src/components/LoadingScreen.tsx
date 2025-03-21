import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '200px',
                gap: 2
            }}
        >
            <CircularProgress 
                size={40} 
                thickness={4}
                sx={{
                    color: 'primary.main'
                }}
            />
            <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mt: 2 }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default LoadingScreen; 