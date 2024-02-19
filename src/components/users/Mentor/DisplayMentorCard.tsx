import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid ,Button, CardActionArea, CardActions } from '@mui/material';
import { MentorDataType } from '../../../Types/DataTypes';

 function DisplayMentorCard({mentor} : {mentor:MentorDataType}) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom:"3rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={mentor.image}
          alt={mentor.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mentor.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mentor.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container>
            <Grid item>
            <Button size="small" color="primary" data-src="">
              Book Mentor
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


export default DisplayMentorCard;