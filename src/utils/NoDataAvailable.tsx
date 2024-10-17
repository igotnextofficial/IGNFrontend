import React from 'react'
import { Typography } from '@mui/material'
const NoDataAvailable = () => {
    return <Typography sx={{ display: 'block', color: '#c7c7c7',padding:'15px' }} component="span" variant="body2"> No Data Available </Typography>
}

export default NoDataAvailable