import { Box, Typography} from "@mui/material";
import IGNButton from "../components/Button";

const InformationComponent = ({buttonLink = "",buttonLabel="",title="", children}) => {
    const ShowButton = () => {
        let blink = buttonLink.trim();
        let blabel = buttonLabel.trim();
        if(blink !== "" && blabel !== ""){
            return (
                <IGNButton href={blink} sx={styles.button} buttonLabel={blabel}/>
            )
        }
        return null
    }
    return(
        <>
             <Typography variant="h4">{title}</Typography>
                <Box sx={styles.seperator}></Box>
                {children}
               
               <ShowButton/>
        </>
    )
}

const styles={
    seperator:{
        height:"3px" ,
        width:"20%", 
        margin: "1rem 0  0.5rem", 
        backgroundImage: "linear-gradient(to right,#ebd805,#eee154 )",
    },

    button:{
        margin:"15px 0",
        color:"white",
        fontSize:"1rem", 
      
    }


}

export default InformationComponent;