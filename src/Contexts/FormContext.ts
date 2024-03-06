import { createContext,useContext } from "react";

interface FormDataContextState {
    updateFormData:(key:string,value:string)=> void,
    data: any
}

export const FormDataContext = createContext<FormDataContextState | null>(null)

export const useFormDataContext = () => {
    const context =  useContext(FormDataContext);
    if(!context){
        throw new Error("Form context must be within a provider.")
    }
    return context
}