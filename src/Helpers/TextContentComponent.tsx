
import { Typography } from "@mui/material"
const TextContentComponent = ({content}:{content:string}) => {
    return <Typography sx={styles.content} variant="subtitle1">{content}</Typography>
}

export default TextContentComponent;

const styles={
    content:{
        fontSize:"1.2rem",
        textTransform:"capitalize"
  
    }
}