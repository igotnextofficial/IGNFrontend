import { useEffect, useState } from "react"

import { useUser } from "../contexts/UserContext"
import { HttpMethods, UserDataType, structureDataType } from "../types/DataTypes";
import { Button, Grid, Typography } from "@mui/material";
import ContentContainer from "../utils/ContentContainer";
import Artist from "../models/users/Artist";
import IgnFormGenerate from "../components/IgnFormGenerate";
import { useFormDataContext } from "../contexts/FormContext";
import FormDataProvider from "../providers/FormDataProvider";

import { sendRequest } from "../utils/helpers";




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
        // const labels = formStructure.map(({ label }) => label);

        const response = await sendRequest(HttpMethods.PUT,endpoint,{data})
 
        if(response !== null){
            updateUser(response.data as UserDataType)
            setSuccessfulUpdate(true)   
        }
   
    }

    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.fullname}'s Profile</Typography></Grid>

            <IgnFormGenerate formStructures={ formStructure } />
            <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={() => {return handleSubmit()}}>Update</Button>
            {successfulUpdate && <Typography variant="h4">Your account has been successfully updated.</Typography>}

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