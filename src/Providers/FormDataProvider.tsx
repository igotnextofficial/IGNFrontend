import { ReactNode, useCallback, useState } from "react";
import { FormDataContext } from "../Contexts/FormContext"

interface FormDataProviderProps {
    children:ReactNode
}
const FormDataProvider:React.FC<FormDataProviderProps> = ({children}) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [, setFile] = useState<Record<string, File>>({});

    
    const updateData = useCallback((key:string,value:string)=>{
    
      setData((currentData) => ({...currentData,[key]:value}))
     },[])
    

     const updateFileData = (key:string,file: File) => {
        setData((currentData) => ({...currentData,[key]:file}))
        setFile({[key]:file});
    };



    return (
        <FormDataContext.Provider value={{updateFormData:updateData,data:data, updateFileData}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataProvider