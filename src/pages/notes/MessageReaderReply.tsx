import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/helpers'
import { useParams } from 'react-router-dom'
import { ArtistDataType, HttpMethods, MentorDataType, UserDataType } from '../../types/DataTypes'
import { Typography, Grid, Avatar, Button } from '@mui/material'
import { NotesFormStructure } from '../../formstructures/NotesFormStructure'
import MainHolderComponent from '../../helpers/MainHolderComponent'
import IgnFormGenerate from '../../components/IgnFormGenerate'
import { useFormDataContext } from '../../contexts/FormContext'
import { useUser } from '../../contexts/UserContext'
import FormDataProvider from '../../providers/FormDataProvider'
import { APP_ENDPOINTS } from '../../config/app'



const MessageReaderReplyData = () => {
    const { user,accessToken } = useUser() 
    const { data } = useFormDataContext()
    const {note_id} = useParams()
    const [note,setNote] = useState<Record<string,any> | null>(null)
    const [showNotesBox,setShowNotesBox] = useState<boolean>(false)
    const [successful,setSuccessful] = useState<boolean>(false)
    const [message,setMessage] = useState("")
    const [replyTo,setReplyTo] = useState<UserDataType| MentorDataType| ArtistDataType | null>(null)

    useEffect(() => {
        setShowNotesBox(false)
        if(successful){

            setMessage(`Hey ${user?.fullname}, Your reply to ${note?.sender.fullname} was successfully sent`)
        }
    },[successful,note,user])

    useEffect(() => {
        note && setReplyTo(note.sender.id)
    },[note])

    useEffect(()=> {
        const loadMessage = async () => {
            const url = `${APP_ENDPOINTS.NOTES.BASE}/${note_id}`
            let response = await sendRequest(HttpMethods.GET,url,null,{Authorization:`Bearer ${accessToken}`})
            if(response){
                setNote(response.data )
            }
           
        }

        loadMessage()
    },[note_id])

    const handleSubmit = async() => {
        const _data = {...note, ...data,sender_id:user?.id,sender:user,recipient_id:note?.sender_id,recipient:note?.sender}
        console.log(`sending ${JSON.stringify(_data)}`)
        let url = `${APP_ENDPOINTS.NOTES.BASE}`

        let response = await sendRequest(HttpMethods.POST,url,{"data":_data},{Authorization:`Bearer ${accessToken}`})
        if(response){
            setSuccessful(true)
        }
       
    }
    const handleReplyClick = () => {
        setShowNotesBox(true )
    }
    return note && (
        <>
            <MainHolderComponent>
                <Grid container justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={1}> <Avatar alt={`${note.sender.fullname}`} src={`${note.sender.profile_photo_path}`} sx={{ width: 80, height: 80 }}/> </Grid>
                    <Grid item xs={11}> 
                    <Typography variant='h5'>{note.sender.fullname}</Typography> 
                    <Typography sx={{color:'#c7c7c7'}} variant='subtitle2'>{note.sender.role.type}</Typography>
                    </Grid>

              
                    
                    <Grid item xs={12}  mt={2} mb={2} sx={{border:"1px solid #c7c7c7",padding:"10px"}}> <Typography variant='h6'>Subject: {note.subject}</Typography></Grid>
                    <Grid item xs={12} sx={{border:"1px solid #c7c7c7",borderBottom:'none',padding:"10px"}}> <Typography sx={{lineHeight:"2em"}} variant='subtitle1'>{note.message} </Typography></Grid>
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
                    <IgnFormGenerate formStructures={NotesFormStructure.filter(structure => structure.label ==='message')} />
                <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={handleSubmit}>Send Note</Button>
                </>
                )}
           
               {
                message.trim() !== "" && (
                    <Typography variant='h6' color={"success"}>{message}</Typography>
                )
               }
          
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