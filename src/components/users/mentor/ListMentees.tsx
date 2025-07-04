import React, { useEffect, useState } from "react"

import { Box,Grid,Button , Typography} from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';


import { HttpMethods, MenteeDataType, MentorDataType, httpDataObject } from "../../../types/DataTypes";

import LinearProgressBar from "../../../helpers/LinearProgressBar";
import NotesComponent from "../../NotesComponent";


import { sendRequest } from "../../../utils/helpers";
import NoDataAvailable from "../../../utils/NoDataAvailable";
import { APP_ENDPOINTS } from "../../../config/app";
import { useUser } from "../../../contexts/UserContext";

const ListMentees = ({mentor}: {mentor:MentorDataType}) => {
    const[data,setData] = useState<MenteeDataType[]>([])
    const [recipient,setRecipient] = useState<MenteeDataType | null>(null)
    const {accessToken} = useUser();


    useEffect(()=>{
        if(mentor && mentor.mentees){
            setData(mentor.mentees)
        }
       
    },[mentor])

   


    const submitNotes = async (notesData:httpDataObject,recipient:string) => {
    const url = APP_ENDPOINTS.NOTES.CREATE
    let response = await sendRequest(HttpMethods.POST,url,notesData,{Authorization:`Bearer ${accessToken}`})
        // console.log(`Sending ${JSON.stringify(notesData)}`)
        if(!response){return false}

        return true
    }

    return  data.length > 0 ? <>

                {  data.map((mentee,index) => 
                    {
       
                   
                    return (
                        <React.Fragment key={index}>
                        {
                        recipient && recipient.id === mentee.id && <NotesComponent recipient={recipient} handleClick={submitNotes}/>}
                            <Box key={index} component={"div"} sx={{margin:"30px 0", borderBottom:"1px solid  rgba(0,0,0,0.1)", padding:"30px 0"}} >

                                <Box component={"div"}  sx={{ marginBottom:"15px",border:"1px solid  rgba(0,0,0,0.1)",boxShadow:"2px 2px 10px rgba(0, 0, 0, 0.1)",fontSize:0}}>
                                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
                                        <Grid item xs={2}><img src={mentee.profile_photo_path} alt={mentee.fullname} style={{width:"100%",objectFit:"cover"}} /></Grid>
                                        <Grid item xs={10}  sx={{fontSize:"18px",padding:"0 10px"}}>
                                            <Typography sx={{lineHeight:"1.8em",fontSize:"1em"}}>
                                                {mentee.bio ? (mentee.bio.length > 300 ? `${mentee.bio.slice(0, 300)}...` : mentee.bio) : ''}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Grid container spacing={2} justifyContent="space-between" alignItems="center">

                                    <Grid item xs={10} sx={{cursor:"pointer"}} > <Typography variant="subtitle1" sx={{color:'darkgrey'}}> {mentee.fullname} ({mentee.username}) Session Tracker:</Typography>
                                        
                                        <LinearProgressBar userProgress={mentee.progress || 0} />
                                    </Grid>
                                    <Grid item xs={2} ><Button color={"inherit"} sx={{width:"100%"}} variant="contained" startIcon={<EditNoteIcon/>} onClick={() => {
                                        setRecipient(mentee)
                                    }}>Leave Note</Button></Grid>
                                </Grid>
                            </Box>
                    
                        </React.Fragment>
                    )
                })}
          
  
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined">View All</Button>
                            </Box>
       
    </> : <NoDataAvailable/>
}





export default ListMentees