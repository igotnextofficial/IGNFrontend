import  React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid ,Button, CardActionArea, CardActions, Box } from '@mui/material';
import { MentorDataType, MenteeDataType } from '../../../types/DataTypes';
import { useUser } from '../../../contexts/UserContext';
import { Endpoints } from '../../../config/app';
import useHttp from '../../../customhooks/useHttp';
import { useErrorHandler } from '../../../contexts/ErrorContext';
import formatPrice from '../../../utils/formatPrice';
 

const labels = {
  "pending":"Pending Approval",
  "approved": "Current Mentor",
  "default": "Book Mentor"

}
const DisplayMentorCard = ({mentor,withoutInfo = false} : {mentor:MentorDataType,withoutInfo?:boolean}) => {
  const {user,accessToken}= useUser()
  const [buttonLabel, setButtonLabel] = useState(labels.default)
  const { post } = useHttp(accessToken);
  const { updateError } = useErrorHandler();

  useEffect(() => {
      if(mentor && mentor.mentees){

    
      const mentee = mentor.mentees.find((mentee: MenteeDataType) => mentee.id === user?.id);
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
      
      const response = await post(endpoint, {}, { 
        requiresAuth: true,
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
      });
      
      if(!response) {
        event.currentTarget.disabled = false
        setButtonLabel(labels.default)
        updateError("Failed to book mentor. Please try again.");
      }
    }
    catch(error){
        if(error instanceof Error){
          console.error(error.message)
          updateError(error.message);
        } else {
          updateError("An unexpected error occurred");
        }
        event.currentTarget.disabled = false
        setButtonLabel(labels.default)
    }
  }




  return (
    <Card sx={{ marginBottom:"3rem" }}>
      <Box sx={{backgroundColor:"#1d1917",padding:"8px 10px",maxWidth:150, borderRadius:"5px",textAlign:'center'}}>
      <Typography sx={{ fontSize: 14, color: "#FBFAF9" }} variant="button" color="text.secondary">
  {formatPrice(mentor.product.price)} per session
</Typography>

      </Box>
      <CardActionArea>
        <CardMedia
          component="img"
          height="350"
          width={350}
          
          image={mentor.profile_photo_path || '/images/default_male_image.jpg'}
          alt={mentor.fullname} 
        />
        <CardContent>
          <Typography sx={{textTransform:'capitalize',marginBottom:0}} gutterBottom variant="h5" component="div">
            {mentor.fullname}
          </Typography>
          <Typography sx={{marginTop :2 , marginBottom:1}} variant="body2" color="text.secondary">
             Specialties:
            </Typography>        
          <Grid  container columnSpacing={2} rowSpacing={1}  sx={{marginBottom:2}} >
  
          {
            mentor.specialties.map((specialty,index) => (
              <Grid item xs={12} xl={4}> 
              <Box key={index} sx={{backgroundColor:"#1d1917", minWidth:180,padding:"8px 10px", borderRadius:"5px",textAlign:'center'}}>
              <Typography sx={{color:"#FBFAF9"}} variant="body2" color="text.secondary">
                #{specialty}
              </Typography>
              </Box>
              </Grid>
            ))
          }
       </Grid>
          <Typography variant="body2" color="text.secondary">
            {mentor.bio?.slice(0,300)}...   
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