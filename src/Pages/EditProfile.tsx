import {  useCallback, useEffect } from "react"
import { useUser } from "../Contexts/UserContext"
import { useDataSubmitContext } from "../Contexts/DataSubmitContext";
import DataSubmissionProvider from "../Providers/DataSubmissionProvider";
import { HttpMethods } from "../Types/DataTypes";
import { Button, Grid, Typography } from "@mui/material";
import ContentContainer from "../Utils/ContentContainer";
import Artist from "../Models/Users/Artist";
import IgnFormGenerate from "../Components/IgnFormGenerate";
import { useFormDataContext } from "../Contexts/FormContext";
import FormDataProvider from "../Providers/FormDataProvider";

const Profile = () => {
    const { user } = useUser();
    const { updateData } = useDataSubmitContext()
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

 
    const handleSubmit = ()=>{
        let submitData = JSON.stringify({data:data})
        console.log(`submitting the data ${submitData}`)
    }

    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.name}'s Profile</Typography></Grid>
            <IgnFormGenerate formStructures={ formStructure } />
            <Button sx={{marginTop:3,marginBottom:3}} variant="contained" onClick={handleSubmit}>Update</Button>

        </>
    )
}

const EditProfile = () => {
    return (
        <FormDataProvider>
            <DataSubmissionProvider httpMethod={HttpMethods.PUT} dataUrl={""}>
                <ContentContainer>
                    <Profile />
                </ContentContainer>

            </DataSubmissionProvider>
        </FormDataProvider>

    )
}

export default EditProfile