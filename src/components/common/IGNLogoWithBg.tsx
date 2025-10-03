import { Box } from "@mui/material";
import Ignlogo from "../Ignlogo";

const IGNLogoWithBg = () => {
     return (
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
   )
}  

export default IGNLogoWithBg;