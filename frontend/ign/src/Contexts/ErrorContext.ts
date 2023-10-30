import { createContext } from "react";

interface ErrorContextType {
    error: string;
    updateError: (message:string) => void;
}


export const ErrorContext = createContext<ErrorContextType>({error:"",updateError: () => {}})