import React,{useState,useEffect} from "react"
import { Button, Typography } from "@mui/material"
import IgnFormGenerate from "./IgnFormGenerate"
import { NotesFormStructure } from "../FormStructures/NotesFormStructure"
import FormDataProvider from "../Providers/FormDataProvider"
import { useFormDataContext } from "../Contexts/FormContext"
import { listDisplayDataType, MenteeDataType } from "../Types/DataTypes"
import ListDisplayComponent from "../Helpers/ListDisplayComponent"

const Notes = ({recipientOfNote,sent}: {recipientOfNote:MenteeDataType,sent: (success:boolean) => void}) => {
const { data, updateFormData } = useFormDataContext()
const [recipient ,setRecipient] = useState<listDisplayDataType | null>(null)

useEffect(() => {
    setRecipient({
        title:`Recipient: ${recipientOfNote?.name}`,
        image_url:recipientOfNote?.image ?? "",
        subtitle: "", 
        meta:`` 
     })
},[recipientOfNote])
    const handleSubmit = ()=>{
        let submitData = JSON.stringify({data:data})
        console.log(`submitting the data ${submitData}`)
        sent(true)
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
const NotesComponent = ({recipient}: {recipient:MenteeDataType}) => {
    const [sentSuccessfully,setSentSuccessfully] = useState(false)

    const handleSent = ((success:boolean) => {
        setSentSuccessfully(success)
    }) 

    return (
    
    <FormDataProvider>
    {sentSuccessfully ? <SuccessMessage person={recipient.name } /> : <Notes recipientOfNote={recipient} sent={handleSent} /> }
    </FormDataProvider>
    )
}
export default NotesComponent