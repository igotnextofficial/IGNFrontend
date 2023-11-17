import * as React from 'react';
import { Box,Button, Grid, List, ListItem,Chip, Typography } from '@mui/material';
import { TaskDataType } from '../Types/DataTypes';




const TaskList: React.FC<{task: TaskDataType, greyOut: boolean}> = ({ task }, greyOut=false ) => {
  let bg = greyOut ? '#f7f7f7':'#ffffff';

  return  task ? (
    <>
    <Box
     component = "div"
     sx={{ bgcolor: bg, padding:'8px 10px', borderBottom:'1px solid #f8f8f8', margin:'3px 0'}}
    >
    <Grid container spacing={2} columns={{xs: 12}}>
      <Grid item xs ={3}>  <Chip label="Task" color='info'/> </Grid>
      <Grid xs={6} item>
      <Typography
          sx={{ display: 'block',color:'#1d1917', fontSize:'1em' }}
          component="p"
          variant="body2">
            {task.title}</Typography>
      </Grid>
      <Grid item xs={3}> 
        <Grid container>
            <Grid item><Chip label={`Type:${task.type}`} />    </Grid>
            <Grid item> 
              <Typography
                sx={{ display: 'block',color:'#f86e51', fontSize:'0.8em' }}
                component="p"
                variant="body2">{task.dueDate}</Typography>  
            </Grid>
        </Grid>
      </Grid>
    </Grid>
    </Box>
   
    </>
  ) : null;
}



export default TaskList