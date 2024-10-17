import { createContext, useContext } from "react";

interface ErrorContextType {
    error: string;
    updateError: (message:string) => void;
}


export const useErrorHandler = () => {
    const errorContext = useContext(ErrorContext);

    if(!errorContext){
        throw new Error("Component must be wrapped in an error provider")
    }
    return errorContext
}

export const ErrorContext = createContext<ErrorContextType>({error:"",updateError: () => {}})