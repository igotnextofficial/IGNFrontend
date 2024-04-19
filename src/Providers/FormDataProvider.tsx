import { ReactNode, useCallback, useEffect, useState } from "react";
import { FormDataContext } from "../Contexts/FormContext"
import { validationObject,FieldErrorMaintainerType } from "../Types/DataTypes";

interface FormDataProviderProps {
    children:ReactNode
    formKeys?:FieldErrorMaintainerType // will make this mandatory 
    validations?:validationObject // will make this mandatory 
}


const FormDataProvider:React.FC<FormDataProviderProps> = ({children,validations,formKeys}) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [file, setFile] = useState<Record<string, File> | null>(null);
    const [hasError,setHasError] = useState<FieldErrorMaintainerType>(formKeys ?? {}  )
    const [isValid,setIsValid] = useState(false);
    
    useEffect(() => {
        let valids = []
        for(const fieldKey in formKeys){
            let valid = hasError[fieldKey].valid ?? false
            valids.push(valid )
        }
        let checkValid = !(valids.includes(false));
        setIsValid(checkValid)
    },[formKeys, hasError])
    
    const updateData = useCallback((key:string,value:string)=>{
        try{
            let current_key = key.toLowerCase()
            if(validations){
                let results = validations[current_key].method(value)
                let error_message = ""
                
                if(results === false) {
                    error_message = validations[current_key].message
                }
                
                const updateHasError = {
                    ...hasError,
                    [current_key]:{valid:results,message:error_message}
                }
              
                setHasError(updateHasError)
            }

            
            setData((currentData) => ({...currentData,[current_key]:value}))
       
        }
        catch(error){
                throw new Error(`All form fields should have a validation function | missing ${key}`)
             
        }
    },[hasError, validations])
    

    const updateFileData = useCallback((key: string, file: File) => {
        setData((currentData) => ({...currentData,[key.toLowerCase()]: file}))
        setFile({[key.toLowerCase()]: file}); // Append file or update existing file entry
    }, []);



    return (
        <FormDataContext.Provider value={{updateFormData:updateData,data, updateFileData,hasError,isValid , file}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataProvider