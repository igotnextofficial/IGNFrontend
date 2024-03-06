import { useContext, useEffect, useLayoutEffect } from "react"
import { useUser } from "../Contexts/UserContext"
import { useDataSubmitContext } from "../Contexts/DataSubmitContext";
import DataSubmissionProvider from "../Providers/DataSubmissionProvider";
import { HttpMethods } from "../Types/DataTypes";
import { Grid, TextField, Typography } from "@mui/material";
import ContentContainer from "../Utils/ContentContainer";
import { ArtistDataType } from "../Types/DataTypes";
import Artist from "../Models/Users/Artist";
import IgnFormGenerate from "../Components/IgnFormGenerate";
import { useFormDataContext } from "../Contexts/FormContext";
import FormDataProvider from "../Providers/FormDataProvider";


const Profile = () => {
    const { user } = useUser();
    const { updateData } = useDataSubmitContext()
    const { data, updateFormData } = useFormDataContext()
    const currentUser = new Artist();

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


        // console.log(`the data updated in profile page ${JSON.stringify(data)}`)
    }, [user, updateFormData])


    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.name}'s Profile</Typography></Grid>
            <IgnFormGenerate formStructures={currentUser.structure} />

        </>
    )
}


const EditProfile = () => {




    return (
        <FormDataProvider>
            <DataSubmissionProvider httpMethod={HttpMethods.POST} dataUrl={""}>
                <ContentContainer>
                    <Profile />
                </ContentContainer>

            </DataSubmissionProvider>
        </FormDataProvider>

    )
}

export default EditProfile