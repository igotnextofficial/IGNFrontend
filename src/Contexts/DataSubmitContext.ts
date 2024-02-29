import { createContext, useContext } from "react";
import { httpDataObject } from "../Types/DataTypes";
interface dataSubmissionType{
    data:object,
    response:object,
    updateData:((data:httpDataObject) => void)    
}


export const DataSubmitContext = createContext<dataSubmissionType | null>(null)
export const useDataSubmitContext = () => {
    const context = useContext(DataSubmitContext);
    if(!context){
        throw new Error("data form context must be within a provider.")
    }
    return context;
}


