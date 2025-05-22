import { useEffect, useState } from "react"

import { useUser } from "../contexts/UserContext"
import { HttpMethods, UserDataType, FormField } from "../types/DataTypes";
import { Button, Grid, Typography } from "@mui/material";
import ContentContainer from "../utils/ContentContainer";
 
import IgnFormGenerate from "../components/IgnFormGenerate";
import { useFormDataContext } from "../contexts/FormContext";
import FormDataProvider from "../providers/FormDataProvider";

import {  sendRequest } from "../utils/helpers";
import { APP_ENDPOINTS } from "../config/app";  
import { MentorFormStructure } from "../formstructures/MentorFormStructure";
import { MenteeFormStructure } from "../formstructures/MenteeFormStructure";
import MenteeForm from "../forms/MenteeForm";
import MentorForm from "../forms/MentorForm";




const Profile = () => {
    const { user, updateUser,accessToken} = useUser();
    const { data } = useFormDataContext()
    const [formStructure,setFormStructure] = useState<FormField[]>([])
    const [successfulUpdate,setSuccessfulUpdate] = useState(false)
    const structures:Record<string,FormField[]> = {
        "mentee": MenteeFormStructure,
        "mentor": MentorFormStructure
        
    }
  
    useEffect(() => {
        const user_type = user?.role?.type ?? "default";
        let userFormStructure = structures[user_type];

        // Create a deep copy of the form structure
        const updatedStructure = userFormStructure.map(structure => {
            const newStructure = { ...structure };
            if (user && structure.label in user) {
                if (typeof user[structure.label] !== "string") {
                    let initial_data = user[structure.label];
                    let initial_data_to_string = initial_data?.map((item: any) => item.name).join(",");
                    newStructure.defaultValue = initial_data_to_string;
                } else {
                    newStructure.defaultValue = user[structure.label];
                }
            }
            return newStructure;
        });

        setFormStructure(updatedStructure);
    },[user])



 
    const handleSubmit = async () => {
        const user_endpoint = `${APP_ENDPOINTS.USER.BASE}/${user?.id}`;
        const media_endpoint = `${APP_ENDPOINTS.MEDIA.IMAGE}/${user?.id}`;
        const endpoint = `${process.env.REACT_APP_USER_API_URI}/${user?.id}`
        let image_url = "";
        let data_to_send:Record<string,any> = {};
        // const labels = formStructure.map(({ label }) => label);
        // console.log(`Submitting form data for ${data} and stringified data ${JSON.stringify(data)}`)

        if('media' in data){
            const upload_image_data = {'media': data['media']};
            const upload_image = await sendRequest(HttpMethods.POST,media_endpoint,{"data": upload_image_data},{'Authorization':`Bearer ${accessToken}`})
            // console.log(`Upload image response ${upload_image} with stringified ${JSON.stringify(upload_image)}`);
            image_url = upload_image?.data?.url ?? ""
            data_to_send['profile_photo_path'] = image_url
        }


        for(const key in data){
            if(key !== 'media'){
         
                data_to_send[key] = data[key]
            }
        }
    //    console.log(`Data to send ${data_to_send} as stringified ${JSON.stringify(data_to_send)}`)
        const response = await sendRequest(HttpMethods.PUT,endpoint,{"data":data_to_send},{'Authorization':`Bearer ${accessToken}`});
 
        if(response !== null){
            updateUser(response.data as UserDataType)
            setSuccessfulUpdate(true)   
        }
   
    }

    return (
        <>
            <Grid item xs={12}> <Typography variant="h4" sx={{ color: "black" ,paddingBottom:2}}> Edit {user?.fullname}'s Profile</Typography></Grid>
            {user?.role?.type === "mentee" ? <MenteeForm /> :  
            <>
            <MentorForm />
        </>
        }
        
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