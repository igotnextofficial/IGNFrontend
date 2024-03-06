import { ReactNode, useEffect, useState } from "react";
import { FormDataContext } from "../Contexts/FormContext"

interface FormDataProviderProps {
    children:ReactNode
}
const FormDataProvider:React.FC<FormDataProviderProps> = ({children}) => {
    const [data,setData] = useState({})
    useEffect(()=>{
    },[data])
    
    const updateData = (key:string,value:string) => {
        setData((currentData) => ({...currentData,[key]:value}))
    }

    return (
        <FormDataContext.Provider value={{updateFormData:updateData,data:data}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataProvider