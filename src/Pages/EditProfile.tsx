import { useEffect } from "react"

import { useUser } from "../Contexts/UserContext"
import { HttpMethods, UserDataType } from "../Types/DataTypes";
import { Button, Grid, Typography } from "@mui/material";
import ContentContainer from "../Utils/ContentContainer";
import Artist from "../Models/Users/Artist";
import IgnFormGenerate from "../Components/IgnFormGenerate";
import { useFormDataContext } from "../Contexts/FormContext";
import FormDataProvider from "../Providers/FormDataProvider";

import { sendRequest } from "../Utils/helpers";




const Profile = () => {
    const { user, updateUser} = useUser();
    const { data, updateFormData } = useFormDataContext()
    const formStructure = new Artist().structure;

useEffect(() => {
    const exclusion = ['id']; // will pull this from model or somewhere else.
            if (user) {
                for (const key in user) {
                    const value = (user as any)[key]
                    if (!exclusion.includes(key)) {
                        updateFormData(key, value);
                    }
                }
            }
},[user,updateFormData])



 
    const handleSubmit = async () => {
        const endpoint = `${process.env.REACT_APP_USER_API_URI}/${user?.id}`
        const response = await sendRequest(HttpMethods.PUT,endpoint,data)
        if(response !== null){

            localStorage.setItem('userInfo',JSON.stringify(response?.data))
            updateUser(response.data as UserDataType)   
        }
   
    }

    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.fullname}'s Profile</Typography></Grid>

            <IgnFormGenerate formStructures={ formStructure } />
            <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={handleSubmit}>Update</Button>

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