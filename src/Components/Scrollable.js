import React from "react"
import { Box } from "@mui/material"

 const Scrollable = ({children, height = 400}) => {
   return ( <Box
        component={'div'}
        sx={{ overflow:'scroll', maxHeight:`${height}px`}}
    >
        { children }
    </Box>
   )
}

export default Scrollable