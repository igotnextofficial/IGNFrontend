
import React from "react"
import { useUser } from "../../Contexts/UserContext"
import { Link } from "react-router-dom"
import { Box,Typography } from "@mui/material"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const IconOnlyTopSection = () => {
    const { user } = useUser()
    const styles = {
        mainContentHolder:{
            height: "300px",
            backgroundColor: "black",
            borderRadius: "5px",
            backgroundSize: "contain",
            backgroundImage: `linear-gradient(to right, #FFFFFF, #D3D3D3,#FFFFFF)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            border:"none",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        imageContainer:{
            width: "200px", // Adjust the size as needed
            height: "200px",
            borderRadius: "50%",
            backgroundSize: "cover",
            border: "3px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 1 // Ensure the image circle is fully opaque
        }
    }
    
    return user && (
        <>
            <Link to={"/edit-profile"}>

                <Box
                    sx={styles.mainContentHolder}
                    component={"div"}
                >
                    <ModeEditIcon sx={{ alignSelf: "flex-end", opacity: 0.3, color: "black", margin: "10px" }} />
                    <div style={styles.imageContainer}> 
                        <img
                            src={user?.image || "/images/default_male_image.jpg"}
                            alt={user?.fullname}
                            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit:"cover" }} // Ensure the image is styled properly
                        />
                    </div>

                    <Box component={"div"} sx={{ margin: "10px 0" }}>
                        <Typography sx={{ fontSize: '1.3em', letterSpacing: '0.1em',color:"black" }} variant='body1'>{user?.fullname} </Typography>
                        <Typography sx={{ fontSize: '1em', textAlign: "center", letterSpacing: '0.1em',color:"black" }} variant='body1'>{user?.genre ? `genre: ${user?.genre}` : ""} </Typography>
                    </Box>

                </Box>
            </Link>
        </>
    )
    
}


export default IconOnlyTopSection