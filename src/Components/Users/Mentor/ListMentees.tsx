import React, { useEffect, useState } from "react"

import { Box,Grid,Button , Typography} from "@mui/material"
import EditNoteIcon from '@mui/icons-material/EditNote';


import { HttpMethods, MenteeDataType, MentorDataType, httpDataObject } from "../../../Types/DataTypes";

import LinearProgressBar from "../../../Helpers/LinearProgressBar";
import NotesComponent from "../../NotesComponent";


import { sendRequest } from "../../../Utils/helpers";
import NoDataAvailable from "../../../Utils/NoDataAvailable";

const ListMentees = ({mentor}: {mentor:MentorDataType}) => {
    const[data,setData] = useState<MenteeDataType[]>([])
    const [recipient,setRecipient] = useState<MenteeDataType | null>(null)



    useEffect(()=>{
        setData(mentor.mentees.filter(mentee => mentee.status === "approved"))
    },[mentor])

   


    const submitNotes = async (notesData:httpDataObject,recipient:string) => {
    const url = `${process.env.REACT_APP_TEST_API}/notes/${recipient}`
    let response = await sendRequest(HttpMethods.POST,url,notesData)
        console.log(`Sending ${JSON.stringify(notesData)}`)
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
                                        <Grid item xs={2}><img src={mentee.image} alt={mentee.fullname} style={{width:"100%",objectFit:"cover"}} /></Grid>
                                        <Grid item xs={10}  sx={{fontSize:"18px",padding:"0 10px"}}><Typography sx={{lineHeight:"1.8em",fontSize:"1em"}}>{ mentee.bio.length > 300 ? `${mentee.bio.slice(0, 300)}...`: mentee.bio} </Typography></Grid>
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