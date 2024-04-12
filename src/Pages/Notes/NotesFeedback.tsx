import React, {useEffect, useState} from "react"
import { sendRequest } from "../../Utils/helpers"
import { HttpMethods } from "../../Types/DataTypes"
import { useUser } from "../../Contexts/UserContext"
import ListDisplayComponent from "../../Helpers/ListDisplayComponent"
import { Link } from  'react-router-dom'
import { Button,Box } from "@mui/material"
import NoDataAvailable from "../../Utils/NoDataAvailable"

const loadNotes = async (user_id:string,type:"sender" | "recipient") => {
    const url =`${process.env.REACT_APP_NOTES_API}/${user_id}/${type}`
    console.log(`the url is ${url}`)
    const response = await sendRequest(HttpMethods.GET,url)
    if(response){
        return response.data
    }
    else{
        return null
    }
}

const NotesFeedback = () => {
    const { user } = useUser()
    const[notes,setNotes] = useState<Record<string,any>[] | null>(null)
    useEffect(() => {

        const load = async () => {
            if(user){
                const response = await loadNotes(user.id,'recipient');
                const data = response as Record<string,any>[]
                const onlyUnreadNotes =  data.filter(onlyRead => {
                   return  onlyRead.status === "unread"
                })
                const sorted = onlyUnreadNotes.sort((a,b) => {
                    let a_date = new Date(a.created_at);
                    let b_date = new Date(b.created_at)
                   if( (a_date < b_date) ){
                    return 1 
                   }

                   if( a_date  > b_date){
                    return -1 
                   }

                   return 0

                })
                setNotes(sorted )
            }
      
        }
        
        load()
    },[user])

    return (
        notes && notes.length > 0 ? <>
        {notes.map(note => {
            let mentor_message = note.note.length > 40 ? `${note.note.substring(0, 40)}...` : note.note
            const message = {
                title: `subject: ${note.subject}`,
                image_url: note.sender.image,
                subtitle: `message: ${mentor_message}`,
                meta: `sent on: ${ new Date(note.created_at).toDateString()}`
            
            }
            let status:string = note.status as string

           return(
            <React.Fragment key={note.id}>
                <Link to={`/notes/${note.id}`}>
                   <Box sx={status === "unread" ? styles.unread: styles.read}>
                     <ListDisplayComponent   data={message} />
                    <Button>Read Message</Button>
                    </Box>
                </Link>
            </React.Fragment>
           )   
 
        })}
        
        </> : <NoDataAvailable/>
    )
}

export default NotesFeedback
const styles = {
    unread: {
        borderBottom: "2px solid #fd2f30"
    },

    read: {
        border: "none"
    }
}
