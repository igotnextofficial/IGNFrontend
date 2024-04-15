import React from 'react';
import { Divider,Box,Typography } from '@mui/material';


interface DashboardSectionComponentProps {
    children: React.ReactNode;
    title: string;
    width?: number
  }
const DashboardSectionComponent: React.FC<DashboardSectionComponentProps> = ({children,title}) => {
        return (
            <>
                    <Box component={'div'} sx={{backgroundColor:'background.paper', padding:'5px'}}>
                    <Typography
                        sx={{ display: 'block',color:'#1d1917', fontSize:'1.2em', padding:'10px', fontWeight:'bold' }}
                        component="h2"
                        variant="body2"  
                    >
                       {title}
                    </Typography>
                    <Divider></Divider>
                    {children}
                    </Box>
            </>
        )
}

export default DashboardSectionComponent;


