import {  useCallback, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Contexts/UserContext"
import { useDataSubmitContext } from "../Contexts/DataSubmitContext";
import DataSubmissionProvider from "../Providers/DataSubmissionProvider";
import { HttpMethods, UserDataType } from "../Types/DataTypes";
import { Button, Grid, TextField, Typography } from "@mui/material";
import ContentContainer from "../Utils/ContentContainer";
import Artist from "../Models/Users/Artist";
import IgnFormGenerate from "../Components/IgnFormGenerate";
import { useFormDataContext } from "../Contexts/FormContext";
import FormDataProvider from "../Providers/FormDataProvider";
import User from "../Models/Users/User";
import UploadImageComponent from "../Components/UploadImageComponent";


const endpoint = new User().getEndpoint()

const Profile = () => {
    const { user, updateUser} = useUser();
    const { updateData,response } = useDataSubmitContext()
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


useEffect(()=> {
    if(response !== null){

        localStorage.setItem('userInfo',JSON.stringify(response?.data))
        updateUser(response.data as UserDataType)   
    }
},[response,updateUser])
 
    const handleSubmit = ()=>{
        updateData(data)
   
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
    const {user} = useUser()
    return (
        <FormDataProvider>
            <DataSubmissionProvider httpMethod={HttpMethods.PUT} dataUrl={`${endpoint}/${user?.id}`}>
                
                <ContentContainer>
                    <Profile />
                </ContentContainer>

            </DataSubmissionProvider>
        </FormDataProvider>

    )
}

export default EditProfile