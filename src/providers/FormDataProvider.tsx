import { ReactNode, useCallback, useEffect, useState } from "react";
import { FormDataContext } from "../contexts/FormContext"
import { validationObject,FieldErrorMaintainerType } from "../types/DataTypes";

interface FormDataProviderProps {
    children:ReactNode
    formKeys?:FieldErrorMaintainerType
    validations?:validationObject
}

const FormDataProvider:React.FC<FormDataProviderProps> = ({children,validations,formKeys}) => {
    const [data, setData] = useState<Record<string, any>>({});
    const [, setFile] = useState<Record<string, File> | null>(null);
    const [hasError,setHasError] = useState<FieldErrorMaintainerType>(formKeys ?? {})
    const [isValid,setIsValid] = useState(false);
 
    // Update isValid whenever hasError changes
    useEffect(() => {
        const allValid = Object.values(hasError).every(error => error.valid);
        setIsValid(allValid);
    }, [hasError]);
    
    const updateData = useCallback((key:string,value:string)=>{
        try {
            const current_key = key.toLowerCase();
            let newError = { valid: true, message: "" };

            if(validations && validations[current_key]) {
                const results = validations[current_key].method(value);
                if(!results) {
                    newError = {
                        valid: false,
                        message: validations[current_key].message
                    };
                }
            }

            setHasError(prev => ({
                ...prev,
                [current_key]: newError
            }));
            
            setData(prev => ({
                ...prev,
                [current_key]: value
            }));
        } catch(error) {
            throw new Error(`All form fields should have a validation function | missing ${key}`);
        }
    }, [validations]);

    const updateFileData = useCallback((key: string, file: File) => {
        setData(prev => ({...prev, [key.toLowerCase()]: file}));
        setFile(prev => ({...prev, [key.toLowerCase()]: file}));
    }, []);

    return (
        <FormDataContext.Provider value={{
            updateFormData: updateData,
            data,
            updateFileData,
            hasError,
            isValid
        }}>
            {children}
        </FormDataContext.Provider>
    );
}

export default FormDataProvider;