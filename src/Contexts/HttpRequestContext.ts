import { createContext,useContext } from "react";
import { httpDataObject, HttpHeaders, HttpMethods } from "../Types/DataTypes";

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