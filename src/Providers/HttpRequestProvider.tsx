import React, { ReactNode,useEffect, useState } from "react";
import { HttpMethods,HttpHeaders } from "../Types/DataTypes";
import { HttpRequestContext,HttpRequestContextType } from "../Contexts/HttpRequestContext";
import axios,{AxiosError,AxiosHeaders} from "axios";
import { validEndpoints } from "../Config/app";


interface HttpRequestProviderProps {
    url: string;
    method: HttpMethods;
    headers?:AxiosHeaders;
    body?: any;
    children: ReactNode;
  }

export const HttpRequestProvider = ({ 
 
    method = HttpMethods.GET,
    headers  ,
    children 
}: HttpRequestProviderProps) => {
 
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [responseStatus, setResponseStatus] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const makeRequest = async () => {
        setLoading(true);
        if(validEndpoints.includes(url)){
            await submit({ url, method, data, headers });
        }
        else{
           setError("Invalid endpoint")
           setLoading(false)
        }
    }

    makeRequest()


  }, [url, method, headers]);
    
  const submit = async (request: any) => {
    try {
      const response = await axios({
        method: request.method,
        url: request.url,
        data: request.data,
        headers: request.headers,
      });
      setData(response.data);
      return response.data;
    } 
    catch (error) {
        if(error instanceof AxiosError){
            setError(error?.message)
            setResponseStatus(error.response?.status || 500)
        }
        else{
            if(error instanceof Error){
                setError(error?.message)
            }

        }
    }
    finally{
        setLoading(false)
    }
  
}


    const updateUrl = (newUrl:string) => {
        if(validEndpoints.includes(newUrl)){
            setUrl(newUrl);
        }
        else{
            setError("Invalid endpoint")
        }
    }
  
  return (
    <HttpRequestContext.Provider value={
        { 
            data,
            responseStatus,
            loading,
            error,
            updateUrl 
        }}>
        {children} 
    </HttpRequestContext.Provider>
  );


};
