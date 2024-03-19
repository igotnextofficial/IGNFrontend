import { Switch,FormGroup,FormControlLabel } from "@mui/material"
import FormDataProvider from "../../../Providers/FormDataProvider"
import { useFormDataContext } from "../../../Contexts/FormContext"
import { useState } from "react"
const OpenCloseSession = () => {
    const [isChecked, setIsChecked] = useState(false)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event?.target.checked)
    }
    return(
    <>
        <FormGroup>
            <FormControlLabel control={<Switch onChange={handleChange} checked={isChecked} color="warning" />} label= { isChecked ? "Close calendar for mentees" :  "Open up calendar for mentees"}  />
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