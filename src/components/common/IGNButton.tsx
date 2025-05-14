import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface IGNButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    fullWidth?: boolean;
    loading?: boolean;
}

const IGNButton: React.FC<IGNButtonProps> = ({
    children,
    onClick,
    disabled = false,
    type = 'button',
    fullWidth = true,
    loading = false,
}) => {
    return (
        <Button
            type={type}
            fullWidth={fullWidth}
            variant="contained"
            onClick={onClick}
            disabled={disabled || loading}
            sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#1d1917',
                color: '#FBFAF9',
                '&:hover': {
                    backgroundColor: '#2d2927',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                },
                '&:hover::after': {
                    transform: 'translateX(100%)',
                },
            }}
        >
            {loading ? (
                <CircularProgress size={24} color="inherit" />
            ) : (
                children
            )}
        </Button>
    );
};

export default IGNButton; 