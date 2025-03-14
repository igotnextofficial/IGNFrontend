import { Switch,FormGroup,FormControlLabel } from "@mui/material"
import FormDataProvider from "../../../providers/FormDataProvider"
import {useLayoutEffect, useState } from "react"
import { useUser } from "../../../contexts/UserContext"
import { sendRequest } from "../../../utils/helpers"
import { HttpMethods } from "../../../types/DataTypes"
import { APP_ENDPOINTS } from "../../../config/app"

const OpenCloseSession = () => {
  
    const { user,accessToken } = useUser()
    const [isChecked, setIsChecked] = useState(false)
    useLayoutEffect(() => {

        if(user && 'availability' in user){
            setIsChecked(user.availability)
        }
    
    },[user])

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let checked = event?.target.checked;
        setIsChecked(checked)
        let open = checked ? "open" : "closed";
        let mentor_id = user?.id;
        let url = `${APP_ENDPOINTS.SESSIONS.BASE}/${mentor_id}/availability/${open}`;
        
        let response = await sendRequest(HttpMethods.PUT,url,null,{'Authorization':`Bearer ${accessToken}`})
        if(response !== null) {

        }
        else{
            //handle error case
        }

    }
    return(
    <>
        <FormGroup>
            <FormControlLabel control={<Switch onChange={handleChange} checked={isChecked} color="success" />} label= { isChecked ? "Close calendar for mentees" :  "Open up calendar for mentees" }  />
        </FormGroup>
    </>

    )  
}

const OpenUpForSessions = () => {
    return(
    <FormDataProvider>
        <OpenCloseSession/>
    </FormDataProvider>
    )
}

export default OpenUpForSessions