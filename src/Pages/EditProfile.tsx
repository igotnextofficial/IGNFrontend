import { useEffect, useState } from "react"

import { useUser } from "../Contexts/UserContext"
import { HttpMethods, UserDataType, structureDataType } from "../Types/DataTypes";
import { Button, Grid, Typography } from "@mui/material";
import ContentContainer from "../Utils/ContentContainer";
import Artist from "../Models/Users/Artist";
import IgnFormGenerate from "../Components/IgnFormGenerate";
import { useFormDataContext } from "../Contexts/FormContext";
import FormDataProvider from "../Providers/FormDataProvider";

import { sendRequest } from "../Utils/helpers";




const Profile = () => {
    const { user, updateUser} = useUser();
    const { data } = useFormDataContext()
    const [formStructure,setFormStructure] = useState<structureDataType[]>([])
    const [successfulUpdate,setSuccessfulUpdate] = useState(false)
  
    useEffect(() => {
        const artist = new Artist()
        let userFormStructure = artist.structure as structureDataType[];
        for(const structure of userFormStructure){
            if(user && structure.label in user){
                structure.default = user[structure.label]
            }
        }
        setFormStructure(userFormStructure)
    },[user])



 
    const handleSubmit = async () => {
        const endpoint = `${process.env.REACT_APP_USER_API_URI}/${user?.id}`

        const labels = formStructure.map(({ label }) => label);
        console.log("clicked the update button: labels " + labels)
        
        const response = await sendRequest(HttpMethods.PUT,endpoint,{data})
 
        if(response !== null){

            localStorage.setItem('userInfo',JSON.stringify(response?.data))
            updateUser(response.data as UserDataType)
            setSuccessfulUpdate(true)   
        }
   
    }

    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.fullname}'s Profile</Typography></Grid>

            <IgnFormGenerate formStructures={ formStructure } />
            <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={() => {return handleSubmit()}}>Update</Button>
            {successfulUpdate && <Typography variant="h4">Your account has beent successfully updated.</Typography>}

        </>
    )
}

const EditProfile = () => {
    return (
        <FormDataProvider>
             <ContentContainer>
                    <Profile />
                </ContentContainer>
        </FormDataProvider>

    )
}

export default EditProfile