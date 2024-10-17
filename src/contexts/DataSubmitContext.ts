import { createContext, useContext } from "react";

interface dataSubmissionType{
    

}


export const DataSubmitContext = createContext<dataSubmissionType | null>(null)
export const useDataSubmitContext = () => {
    const context = useContext(DataSubmitContext);
    if(!context){
        throw new Error("data form context must be within a provider.")
    }
    return context;
}


