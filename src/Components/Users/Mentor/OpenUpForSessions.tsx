import { Switch,FormGroup,FormControlLabel } from "@mui/material"
import FormDataProvider from "../../../Providers/FormDataProvider"
import {useLayoutEffect, useState } from "react"
import { useUser } from "../../../Contexts/UserContext"
import { sendRequest } from "../../../Utils/helpers"
import { HttpMethods } from "../../../Types/DataTypes"

const OpenCloseSession = () => {
  
    const { user } = useUser()
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
        let url = `${process.env.REACT_APP_MENTOR_API}/${mentor_id}/availability/${open}`;
        let response = await sendRequest(HttpMethods.POST,url)
        if(response !== null) {

        }
        else{
            //handle error case
        }

    }
    return(
    <>
        <FormGroup>
            <FormControlLabel control={<Switch onChange={handleChange} checked={isChecked} color="success" />} label= { isChecked ? "Close calendar for mentees" :  "Open up calendar for mentees"}  />
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