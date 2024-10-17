import {useState,useEffect} from "react"
import { Button, Typography } from "@mui/material"
import IgnFormGenerate from "./IgnFormGenerate"
import { NotesFormStructure } from "../formstructures/NotesFormStructure"
import FormDataProvider from "../providers/FormDataProvider"
import { useFormDataContext } from "../contexts/FormContext"
import { httpDataObject, listDisplayDataType, MenteeDataType } from "../types/DataTypes"
import ListDisplayComponent from "../helpers/ListDisplayComponent"
import { useUser } from "../contexts/UserContext"

const Notes = ({recipientOfNote,handleClick,sent}: {recipientOfNote:MenteeDataType,handleClick: (data:httpDataObject,id:string) => Promise<boolean>, sent:(success:boolean) => void}) => {
const { data } = useFormDataContext()
const { user } = useUser()
const [recipient ,setRecipient] = useState<listDisplayDataType | null>(null)

useEffect(() => {
    setRecipient({
        title:`Recipient: ${recipientOfNote?.fullname}`,
        image_url:recipientOfNote?.image ?? "",
        subtitle: "", 
        meta:`` 
     })
},[recipientOfNote])
    const handleSubmit = async ()=>{
        const _data = {...data, recipient:recipientOfNote.id, sender:user?.id}
        let response = await handleClick({"data":_data},recipientOfNote.id)
        sent(response)
    }

    return (
    <>
    {recipient && <ListDisplayComponent data={recipient}/>}
    <IgnFormGenerate formStructures={NotesFormStructure} />
    <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={handleSubmit}>Send Note</Button>
    </>
    )
}

const SuccessMessage = ({person} : {person:string} ) => {
    return <Typography variant="subtitle1" sx={{color:"black"}}>{`Note has been successfully sent to ${person}`}</Typography>
}


const NotesComponent = ({recipient,handleClick}: {recipient:MenteeDataType, handleClick: (data:httpDataObject,id:string) => Promise<boolean> }) => {
    const [sentSuccessfully,setSentSuccessfully] = useState(false)

    const handleSent = ((success:boolean) => {
        setSentSuccessfully(success)
    }) 

    return (
    
    <FormDataProvider>
    {sentSuccessfully ? <SuccessMessage person={recipient.fullname } /> : <Notes recipientOfNote={recipient} handleClick={handleClick} sent={handleSent} /> }
    </FormDataProvider>
    )
}
export default NotesComponent