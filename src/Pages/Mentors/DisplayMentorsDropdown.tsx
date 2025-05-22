import { Avatar,Box,ListItem,ListItemAvatar,ListItemText,Typography } from "@mui/material"
import { MentorDataType } from "../../types/DataTypes"
import {Link} from "react-router-dom"
const DisplayMentorList = ({mentor}:{mentor:MentorDataType}) => {
    return (
        <>
        
        <Link to={`/mentors/book-a-mentor/${mentor.id}`}>
            <ListItem className="listSelection" sx={styles.mentorListView} alignItems="center">
                <ListItemAvatar>
                    <Avatar alt={mentor.fullname} src={mentor.profile_photo_path} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            sx={{ color: '#1d1917', fontSize: '1em' }}
                            component="h3"
                            variant="body2"
                        >
                            {mentor.fullname}
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ color: '#777777', fontSize: '1em' }}
                            component="p"
                            variant="body2"
                        >
                            Specialties: [{mentor.specialties.map(special => special.name).join(",")}] {/* {mentor.fullname} */}
                        </Typography>
                    }
                />
            </ListItem>
            </Link>
        </>
      
    )
}


const DisplayMentorDropdown = ({mentorList} : {mentorList:MentorDataType[]}) => {
    return (
    <Box sx={styles.listContainer}>
        
        {
            mentorList.map(mentor =>{
                return <DisplayMentorList mentor={mentor} key={mentor.id}/>
            })
        }
    </Box>
    )
}

const styles = {
    listContainer:{
        position:"absolute",
        backgroundColor:"white",
        width:"100%",
        border:"1px solid #f4f4f4",
        borderRadius:"5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Adds a nice, subtle shadow
        overflow:"scroll",
        maxHeight:"800px",
        zIndex:1
    },
    mentorListView:{
        padding:"20px 10px",
        borderBottom:"1px solid #f4f4f4",
    }
}
export default DisplayMentorDropdown