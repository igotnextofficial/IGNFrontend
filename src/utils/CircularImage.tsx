import { Box } from "@mui/material";
const CircularImage = ({image, size}: {image: string, size: number}) => {
    return (
        <Box>
            <img src={image} alt="profile" style={{width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: `3px solid #fd2f30`, transform: 'translate(4px, 4px)'}} />
        </Box>
    );
};

export default CircularImage;

 