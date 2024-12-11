import React , {useMemo} from "react"
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { List,ListItem,ListItemAvatar,Avatar,ListItemText,Typography } from "@mui/material"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {  MentorDataType } from "../../types/DataTypes";

const ProfileTopSection = () => {
    const { user } = useUser()
    const role = useMemo(() => {
        return user?.getUserRole();
      }, [user])
    return user && (
        <Link to={"/edit-profile"}>
        <List sx={{ width: '100%', maxWidth: 640, bgcolor: 'background.paper' }}>
        
            <ListItem >
                <ListItemAvatar sx={{ marginRight: 2 }}>
                    <Avatar alt={user.fullname} src={user.image} sx={{ width: 56, height: 56 }} />
                </ListItemAvatar>
                <ListItemText

                    primary={
                        <React.Fragment>
                            <Typography
                                sx={{ color: '#1d1917', fontSize: '2em', fontWeight: "bold" }}
                                component="h2"
                                variant="body2"
                            >
                                {user.fullname ?? user.fullname}'s Profile
                            </Typography>
                        </React.Fragment>
                    }
                    secondary=
                    {<React.Fragment>


                        <Typography
                            sx={{ display: 'block', color: '#c7c7c7' }}
                            component="span"
                            variant="body2"

                        >
                       
                          {role === "artist" && 'genre' in user ? `Genre: ${ user.genre }` : ''}
                          {role === "mentor" ? `specialties: ${(user as MentorDataType).specialties.join(", ")}` : ''}
                        </Typography>
                    </React.Fragment>
                    }
                />
                   <ModeEditIcon sx={{alignSelf:"flex-start",opacity:0.5,color:"black"}}/>
            </ListItem>
        </List>
        </Link>
    )
}

export default ProfileTopSection