import React, {useEffect, useState} from "react"
import { sendRequest } from "../../../Utils/helpers"
import { HttpMethods } from "../../../Types/DataTypes"
import { useUser } from "../../../Contexts/UserContext"
import ListDisplayComponent from "../../../Helpers/ListDisplayComponent"
import { Link } from  'react-router-dom'
import { Button } from "@mui/material"

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

const MentorsFeedback = () => {
    const { user } = useUser()
    const[notes,setNotes] = useState<Record<string,any>[] | null>(null)
    useEffect(() => {

        const load = async () => {
            if(user){
                const response = await loadNotes(user.id,'recipient');
                const data = response as Record<string,any>[]
                const onlyReadNotes =  data.filter(onlyRead => {
                   return  onlyRead.status === "unread"
                })
                const sorted = onlyReadNotes.sort((a,b) => {
                   if( a.created_at < b.created_at){
                    return 1 
                   }

                   if( a.created_at  > b.created_at){
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

           return(
            <React.Fragment key={note.id}>
                <Link to={`/notes/${note.id}`}>
                    <ListDisplayComponent  data={message} />
                    <Button>Read Message</Button>
                </Link>
            </React.Fragment>
           )   
 
        })}
        
        </> : null
    )
}

export default MentorsFeedback