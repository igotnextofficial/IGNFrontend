import  React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid ,Button, CardActionArea, CardActions } from '@mui/material';
import { HttpMethods, MentorDataType } from '../../../Types/DataTypes';
import { Link } from 'react-router-dom';
import DataSubmissionProvider from '../../../Providers/DataSubmissionProvider';
import { useDataSubmitContext } from '../../../Contexts/DataSubmitContext';
import FormDataProvider from "../../../Providers/FormDataProvider";
import { useFormDataContext } from "../../../Contexts/FormContext";
import { useUser } from '../../../Contexts/UserContext';
 

const labels = {
  "pending":"Pending Approval",
  "approved": "Current Mentor"

}
function DisplayMentorCardData({mentor} : {mentor:MentorDataType}) {
  const {user}= useUser()
  const {updateUrl,updateData} = useDataSubmitContext()
  const [buttonLabel, setButtonLabel] = useState("Book Mentor")

  useEffect(() => {
      const mentee = mentor.mentees.find(mentee => mentee.id === user?.id);
      if(mentee){
        if(mentee.status === "approved"){
          setButtonLabel("Current Mentor")
        } 

        if(mentee.status === "pending"){
          setButtonLabel("Pending Approval")
        } 

      }
  },[mentor,user])
  const handleBooking = (event: React.MouseEvent<HTMLButtonElement>) => {
    let mentor_id = event.currentTarget.dataset.src;
    let endpoint = `${process.env.REACT_APP_MENTOR_API}/${mentor_id}/request/${user?.id}`
    console.log(`the endpoint is : ${endpoint}  |  ${event.currentTarget}`)
      event.currentTarget.disabled = true
      updateUrl(endpoint)
      updateData(null)
      setButtonLabel("Request Pending")

  }


  const hasMentor = () => {
    let mentees = mentor.mentees ? mentor.mentees :[]
    
    for(const mentee of mentees) {
      if(mentee.id === user?.id){

        return true
      }
    }
    return false
  }
  return (
    <Card sx={{ maxWidth: 345, marginBottom:"3rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={mentor.image}
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
        
            <Button size="small" color= "primary" data-src={mentor.id} onClick={(event) => handleBooking(event)} disabled={buttonLabel === "Current Mentor" || buttonLabel === "Pending Approval"}>
 {buttonLabel}
</Button>

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



const DisplayMentorCard = ({mentor} : {mentor:MentorDataType}) => {
  return (
    <>
            <FormDataProvider>
        <DataSubmissionProvider httpMethod={HttpMethods.POST} dataUrl={``}>
            <DisplayMentorCardData mentor={mentor} />
          </DataSubmissionProvider>
      </FormDataProvider>
    </>
  )
}

export default DisplayMentorCard;