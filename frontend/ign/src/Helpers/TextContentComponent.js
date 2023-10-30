import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
const TextContentComponent = ({content= ""}) => {
    return <Typography sx={styles.content} variant="subtitle1">{content}</Typography>
}

export default TextContentComponent;

const styles={
    content:{
        fontSize:"1.2rem",
  
    }
}