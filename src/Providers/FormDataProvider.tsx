import { ReactNode, useEffect, useState } from "react";
import { FormDataContext } from "../Contexts/FormContext"

interface FormDataProviderProps {
    children:ReactNode
}
const FormDataProvider:React.FC<FormDataProviderProps> = ({children}) => {
    const [data,setData] = useState({})
    useEffect(()=>{
        console.log(`updated ${JSON.stringify(data)}`)
    },[data])
    
    const updateData = (key:string,value:string) => {
        console.log(`Now should be updating ${key} with ${value}`)
        setData((currentData) => ({...currentData,[key]:value}))
        console.log(`the data was updated with ${JSON.stringify(data)}`)
    }

    return (
        <FormDataContext.Provider value={{updateFormData:updateData,data:data}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataProvider