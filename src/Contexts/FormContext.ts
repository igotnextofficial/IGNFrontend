import { createContext,useContext } from "react";
import { FieldErrorMaintainerType } from "../types/DataTypes";

interface FormDataContextState {
    updateFormData:(key:string,value:any )=> void,
    updateFileData:(key:string,value:File )=> void,
    hasError:FieldErrorMaintainerType,
    isValid:boolean,
    data: Record<string, any>
  
}

export const FormDataContext = createContext<FormDataContextState | null>(null)

export const useFormDataContext = () => {
    const context =  useContext(FormDataContext);
    if(!context){
        throw new Error("Form context must be within a provider.")
    }
    return context
}