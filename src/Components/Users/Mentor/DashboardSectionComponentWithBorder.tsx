import React, { Children } from 'react'
import { Box } from '@mui/material';
import DashboardSectionComponent from '../../DashboardSectionComponent';

interface DashboardSectionBorderComponentProps {
    children: React.ReactNode;
    title: string;
  }
  
const DashboardSectionBorder:React.FC<DashboardSectionBorderComponentProps> = ({children,title}) => {

        return(
            <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white"}}>
            <DashboardSectionComponent title={title} >
                {children}
            </DashboardSectionComponent>
            </Box>
        )

}

export default DashboardSectionBorder