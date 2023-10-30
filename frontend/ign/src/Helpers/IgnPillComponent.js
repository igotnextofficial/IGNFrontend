import { Link } from "@mui/material";
const IgnPillComponent = ({description="", link="/"}) => {
    return(
        <Link to={"/"} sx={styles.pill} >{description}</Link>
    )
}

const styles = {
    pill:{
        color:"#1d1917",
        backgroundImage: "linear-gradient(to right,#ebd805,#eee154 )",
        borderRadius:"3px",
        textDecoration:"none",
        fontSize:"0.8em",
        padding:"5px 8px",
        
    },
}

export default IgnPillComponent;