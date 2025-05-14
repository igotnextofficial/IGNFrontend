import { Switch,FormGroup,FormControlLabel } from "@mui/material"
import FormDataProvider from "../../../providers/FormDataProvider"
import {useLayoutEffect, useState, useEffect } from "react"
import { useUser } from "../../../contexts/UserContext"
import { sendRequest } from "../../../utils/helpers"
import { HttpMethods, MentorDataType } from "../../../types/DataTypes"
import { APP_ENDPOINTS } from "../../../config/app"
import StripeOnBoarding from "./StripeOnBoarding"
const OpenCloseSession = ({user}:{user:MentorDataType}) => {
  
    const { accessToken } = useUser()
    const [isVerified,setIsVerified] = useState(false)
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

const OpenUpForSessions = ({user}:{user:MentorDataType}) => {
    const [isVerified,setIsVerified] = useState(false)
    useEffect(() => {
        if(user && 'product' in user && user.product !== null){
            setIsVerified(user.product.stripe_account.is_verified)
        }
    },[user.product])

    return(
    <FormDataProvider>
        {isVerified && <OpenCloseSession user={user}/>}
        {user.product !== null && !isVerified && <StripeOnBoarding stripe_account_id={user.product.stripe_account_id}  />}
    </FormDataProvider>
    )
}

export default OpenUpForSessions