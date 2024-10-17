/*
     ====================== HTTP CONNECTIONS ======================
        This context is responsible for handling all HTTP requests.
        Once MVP is done, I will cirle back to this context and add
        more features like error handling, etc.
        allowing this to be the main and only  point of communication with APIs.

*/
import { createContext,useContext } from "react";
import { httpDataObject } from "../types/DataTypes";

export interface HttpRequestContextType {
    data?:httpDataObject | null
    responseStatus:number | null,
    loading:boolean,
    error:string
    updateUrl:(url:string)=>void
 
}
export const HttpRequestContext = createContext<HttpRequestContextType | null>({
    data:null,
    responseStatus:null,
    loading:true,
    error:"",
    updateUrl: () => {}
});


export const useHttpRequest = (url:string) => {
    const context = useContext(HttpRequestContext)
    if(!context){
        throw Error("useHttpRequest must be wrapped in a provider.")
    }

    context.updateUrl(url)
    return context
}