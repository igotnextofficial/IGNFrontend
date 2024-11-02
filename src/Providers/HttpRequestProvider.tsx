import React, { ReactNode,useEffect, useState } from "react";
import { HttpMethods,HttpHeaders, httpDataObject } from "../types/DataTypes";
import { HttpRequestContext } from "../contexts/HttpRequestContext";
import axios,{AxiosError} from "axios";
import { validEndpoints } from "../config/app";

import { response } from "express";


interface HttpRequestProviderProps {
 
 
    body?: any;
    accessToken?: string;
    children: ReactNode;
  }

  const HttpRequestProvider = ({ 
    children , accessToken, body 
}: HttpRequestProviderProps) => {
 
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(HttpMethods.GET);
  const [headers, setHeaders] = useState<HttpHeaders | null>(null);

  const [data, setData] = useState<httpDataObject | FormData | null>(null);
  const [error, setError] = useState("");
  const [responseStatus, setResponseStatus] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
  const [sendRequest, setSendRequest] = useState(false);
 

  useEffect(() => {
    if(sendRequest){
        makeRequest()
    }
  }, [sendRequest]);
  
  useEffect(() => {
    if(accessToken && accessToken?.length > 0){
        setHeaders({...headers,Authorization: `Bearer ${accessToken}`})
    }
  })
 

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

const submit = async (request: any) => {
    setLoading(true); // Set loading to true at the beginning
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: JSON.stringify(request.data),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      setData(responseData);
      return responseData;
    } 
    catch (error) {
      if (error instanceof Error) {
        console.log("Fetch error:", error);
        setError(error.message);
        setResponseStatus(error instanceof Response ? error.status : 500);
      }
    } 
    finally {
      setLoading(false); // Set loading to false after the try-catch block
    }
  };
  

const getFormData = (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

const updateUrl = (newUrl:string) => {
    if(validEndpoints.includes(newUrl)){
        setUrl(newUrl);
    }
    else{
        setError("Invalid endpoint")
    }
}

const updateData = (intial_data:any) => {
    let prepared_data = null

    if(intial_data){
      if('media' in intial_data.data){
        prepared_data = getFormData(intial_data.data)
        // console.log(`found an image ${data.data}`)
      }
      else{
        prepared_data = data;
      }
      setData(prepared_data);
    }
}

const updateMethod = (newMethod:HttpMethods) => { 
    setMethod(newMethod);
}

const updateSendRequest = (send:boolean) => {
    setSendRequest(send);
}
 
  
  return (
    <HttpRequestContext.Provider value={
        { 
            updateData,
            updateUrl,
            updateMethod,
            updateSendRequest, 
            responseStatus,
            loading,
            error,
        }}>
        {children} 
    </HttpRequestContext.Provider>
  );


};


export default HttpRequestProvider;