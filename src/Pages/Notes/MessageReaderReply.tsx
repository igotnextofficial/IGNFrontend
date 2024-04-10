import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../Utils/helpers'
import { useParams } from 'react-router-dom'
import { ArtistDataType, HttpMethods, MentorDataType, UserDataType } from '../../Types/DataTypes'
import { Typography, Grid, Avatar, Button } from '@mui/material'
import { NotesFormStructure } from '../../FormStructures/NotesFormStructure'
import MainHolderComponent from '../../Helpers/MainHolderComponent'
import IgnFormGenerate from '../../Components/IgnFormGenerate'
import { useFormDataContext } from '../../Contexts/FormContext'
import { useUser } from '../../Contexts/UserContext'
import FormDataProvider from '../../Providers/FormDataProvider'

const MessageReaderReplyData = () => {
    const { user } = useUser() 
    const { data } = useFormDataContext()
    const {note_id} = useParams()
    const [note,setNote] = useState<Record<string,any> | null>(null)
    const [showNotesBox,setShowNotesBox] = useState<boolean>(false)
    const [replyTo,setReplyTo] = useState<UserDataType| MentorDataType| ArtistDataType | null>(null)


    useEffect(() => {
        note && setReplyTo(note.sender.id)
    },[note])

    useEffect(()=> {
        const loadMessage = async () => {
            const url = `${process.env.REACT_APP_NOTES_API}/${note_id}`
            let response = await sendRequest(HttpMethods.GET,url)
            if(response){
                setNote(response.data )
            }
           
        }

        loadMessage()
    },[note_id])

    const handleSubmit = async() => {
        const _data = {...data, subject:note?.subject, sender:user?.id}
        let url = `${process.env.REACT_APP_NOTES_API}/${note?.sender.id}`
        console.log(` 
        
            sending: ${JSON.stringify(_data)},
            url: ${url}
        `)
        // let response = await sendRequest(HttpMethods.POST,url,{"data":_data})
       
    }
    const handleReplyClick = () => {
        setShowNotesBox( !showNotesBox )
    }
    return note && (
        <>
            <MainHolderComponent>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={1}> <Avatar alt={`${note.sender.fullname}`} src={`${note.sender.image}`} sx={{ width: 80, height: 80 }}/> </Grid>
                    <Grid item xs={11}> 
                    <Typography variant='h5'>{note.sender.fullname}</Typography> 
                    <Typography sx={{color:'#c7c7c7'}} variant='subtitle2'>{note.sender.role}</Typography>
                    </Grid>

              
                    
                    <Grid item xs={12}  mt={2} mb={2} sx={{border:"1px solid #c7c7c7",padding:"10px"}}> <Typography variant='h6'>Subject: {note.subject}</Typography></Grid>
                    <Grid item xs={12} sx={{border:"1px solid #c7c7c7",borderBottom:'none',padding:"10px"}}> <Typography sx={{lineHeight:"2em"}} variant='subtitle1'>{note.note} </Typography></Grid>
                </Grid>
                
                {
                     showNotesBox === false && 
                     <Grid container justifyContent="flex-end" alignItems="center" mt={3} mb={3} >
                     <Grid item >
                         <Button variant='contained' onClick={handleReplyClick}>Reply to {note.sender.fullname}</Button>
                     </Grid>
                     </Grid>
                }

          
            
      
           
               { showNotesBox &&(
                <>
                    <IgnFormGenerate formStructures={NotesFormStructure.filter(structure => structure.label ==='note')} />
                <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={handleSubmit}>Send Note</Button>
                </>
                )}
           
               
          
            </MainHolderComponent>
        </>
    )
}



const MessageReaderReply = () => {
    return (
        <FormDataProvider>
            <MessageReaderReplyData/>
        </FormDataProvider>
    )
}
export default MessageReaderReply