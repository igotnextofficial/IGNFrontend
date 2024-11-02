import React, {useEffect, useState} from "react"
import { useUser } from "../../contexts/UserContext"
import ListDisplayComponent from "../../helpers/ListDisplayComponent"
import { Link } from  'react-router-dom'
import { Button,Box } from "@mui/material"
import NoDataAvailable from "../../utils/NoDataAvailable"
import axios from "axios"
import { APP_ENDPOINTS } from "../../config/app"


const loadNotes = async (
    user_id: string,
    type: "sender" | "recipient",
    access_token?: string
) => {
    try {
        const url = `${APP_ENDPOINTS.NOTES.BASE}/${user_id}/${type}`;

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error loading notes:", error);
        return null;
    }
};


const NotesFeedback = () => {
    const { user,accessToken } = useUser()
    const[notes,setNotes] = useState<Record<string,any>[] | null>(null)
    useEffect(() => {

        const load = async () => {
            if(user){ 
                try{
                    const response = await loadNotes(user.id,'recipient',accessToken);
                    const data = response.data as Record<string,any>[]
                    if(data === null || data.length === 0 ){return []}
                    if(data){

                   
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
                catch(error){
                    console.error("Error loading notes:", error);
                    return null;
                }
               
            }
      
        }
        
        load()
    },[user,accessToken])

    return (
        notes && notes.length > 0 ? <>
        {notes.map(note => {
            let mentor_message = note.message.length > 40 ? `${note.message.substring(0, 40)}...` : note.message
            const message = {
                title: `subject: ${note.subject}`,
                image_url: note.sender.profile_photo_path,
                subtitle: `message: ${mentor_message}`,
                meta: `sent on: ${ new Date(note.created_at).toDateString()}`
            
            }
            let status:string = note.status as string
            note.id = note['_id']

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
