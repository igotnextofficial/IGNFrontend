import  React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid ,Button, CardActionArea, CardActions } from '@mui/material';
import { HttpMethods, MentorDataType } from '../../../types/DataTypes';


import { useUser } from '../../../contexts/UserContext';
import { sendRequest } from '../../../utils/helpers';
import { Endpoints } from '../../../config/app';
 

const labels = {
  "pending":"Pending Approval",
  "approved": "Current Mentor",
  "default": "Book Mentor"

}
const DisplayMentorCard = ({mentor} : {mentor:MentorDataType}) => {
  const {user,accessToken}= useUser()
  const [buttonLabel, setButtonLabel] = useState(labels.default)

  useEffect(() => {
      if(mentor && mentor.mentees){

    
      const mentee = mentor.mentees.find(mentee => mentee.id === user?.id);
      if(mentee){
        if(mentee.status === "approved"){
          setButtonLabel(labels.approved)
        } 

        if(mentee.status === "pending"){
          setButtonLabel(labels.pending)
        } 

      }
    }
  },[mentor,user])

  const handleBooking = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try{
      setButtonLabel(labels.pending)
      let mentor_id = event.currentTarget.dataset.src;
      let endpoint = `${Endpoints.MENTOR}/${mentor_id}/request/${user?.id}` // request to book mentor
        event.currentTarget.disabled = true
        let response = await sendRequest(HttpMethods.POST,endpoint,null,{Authorization:`Bearer ${accessToken}`});
        if(response === null){
          event.currentTarget.disabled = false
          setButtonLabel(labels.default)
        }
    }
    catch(error){
        if(error instanceof Error){
          console.error(error.message)
        }
    }
  }




  return (
    <Card sx={{ minWidth: 345, marginBottom:"3rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          image={mentor.profile_photo_path || '/images/default_male_image.jpg'}
          alt={mentor.fullname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mentor.fullname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mentor.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container>
            <Grid item>
        
            {user && <Button size="small" color= "primary" data-src={mentor.id} onClick={(event) => handleBooking(event)} disabled={buttonLabel === "Current Mentor" || buttonLabel === "Pending Approval"}>
 {buttonLabel}
</Button>}

            </Grid>
            <Grid item>
            <Button size="small" color="primary">
              Learn More
            </Button>
            </Grid>
        </Grid>

   
      </CardActions>
    </Card>
  );
}





export default DisplayMentorCard;