import React, { useEffect, useState } from "react"

import { Box,Grid,Button , Typography} from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';

import DashboardSectionComponent from "../../DashboardSectionComponent";
import { MenteeDataType, MentorDataType } from "../../../Types/DataTypes";

import LinearProgressBar from "../../../Helpers/LinearProgressBar";
import NotesComponent from "../../NotesComponent";

const ListMentees =  ({user}: {user:MentorDataType}) => {
    const[data,setData] = useState<MenteeDataType[]>([])
    const [recipient,setRecipient] = useState<MenteeDataType | null>(null)
    const [hoveredMenteeId, setHoveredMenteeId] = useState(null);
    useEffect(()=>{
        setData(user.mentees.slice(3,6))
    },[])

   

    const handleMouseEnter = () => {
      setHoveredMenteeId(null);
    };
  
    const handleMouseLeave = () => {
      setHoveredMenteeId(null);
    };
    return <>
    <Box sx={{border:"1px solid rgba(0,0,0,0.1)", padding:"8px 20px" , borderRadius:"5px",backgroundColor:"white"}}>
            <DashboardSectionComponent title={`Mentee(s) (${data.length})`}><></></DashboardSectionComponent>
                {data.length > 0 ?  data.map((mentee,index) => {
       
                   
                    return (
                        <>
                        {recipient && recipient.id === mentee.id && <NotesComponent recipient={recipient}/>}
                            <Box key={index} component={"div"} sx={{margin:"30px 0", borderBottom:"1px solid  rgba(0,0,0,0.1)", padding:"30px 0"}} >

                                <Box component={"div"}  sx={{ marginBottom:"15px",border:"1px solid  rgba(0,0,0,0.1)",boxShadow:"2px 2px 10px rgba(0, 0, 0, 0.1)",fontSize:0}}>
                                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={2}><img src={mentee.image} alt={mentee.name} style={{width:"100%",objectFit:"cover"}} /></Grid>
                                        <Grid item xs={10}  sx={{fontSize:"18px",padding:"0 10px"}}><Typography sx={{lineHeight:"1.8em",fontSize:"1em"}}>{ mentee.bio.length > 300 ? `${mentee.bio.slice(0, 300)}...`: mentee.bio} </Typography></Grid>
                                    </Grid>
                                </Box>
                                <Grid container spacing={2} justifyContent="space-between" alignItems="center">

                                    <Grid item xs={10} sx={{cursor:"pointer"}} > <Typography variant="subtitle1" sx={{color:'darkgrey'}}> {mentee.name} ({mentee.username}) Session Tracker:</Typography>
                                        
                                        <LinearProgressBar userProgress={mentee.progress} />
                                    </Grid>
                                    <Grid item xs={2} ><Button color={"inherit"} sx={{width:"100%"}} variant="contained" startIcon={<EditNoteIcon/>} onClick={() => {
                                        setRecipient(mentee)
                                    }}>Leave Note</Button></Grid>
                                </Grid>
                            </Box>
                    
                        </>
                    )
                }) : null}
          
  
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined">View All</Button>
                            </Box>
          </Box>
    </>
}

export default ListMentees