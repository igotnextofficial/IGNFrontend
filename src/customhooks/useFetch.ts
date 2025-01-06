import { send } from "process";
import { useState, useEffect, useCallback, useMemo } from "react";
import { sendRequest } from "../utils/helpers";
import { HttpMethods } from "../types/DataTypes";

interface FetchOptions {
    method?: string;
}

interface CustomError extends Error {
    response?: Record<string, any>;
}

const useFetch = (  options: FetchOptions = { method: 'GET' }) => {
    const [data, setData] = useState(null);
    const [sendData, setSendData] = useState<Record<string,any> | null>(null);
    const [mediaData, setMediaData] = useState<FormData | null>(null);
    const [headers, setHeaders] = useState<Record<string,any> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [responseStatus, setResponseStatus] = useState<number | null>(null);

    const [sendRequest, setSendRequest] = useState(false);

    // Memoize options if they are provided inline
    // const memoizedOptions = useMemo(() => options, [options]);
    // const url = useMemo(() => url, [url]);



  


    const fetchData = useCallback(async ( url:string,method:HttpMethods = HttpMethods.GET,headers:Record<string,any> = {},data:string|Record<string,any> = {} ,has_media=false ) => {

        setLoading(true); // Set loading state before fetching
        const application_headers = new Headers()
        // add all headers to the request
        for(const key in headers){
            application_headers.append(key,headers[key])
        }
        
        try {
            const payload:Record<string,any> = {method:method,headers:application_headers,credentials:'include'};

            if(method !== HttpMethods.GET){
                let passed_data = null;
                if(has_media){
                    passed_data = data as FormData;
                }
                else{
                    passed_data =  typeof data === 'string' ? data : JSON.stringify(data);
                }
                payload['body'] = passed_data
            }
            

            const response = await fetch(url, payload );

            const responseData = await response.json();
            setData(responseData);
            setResponseStatus(response.status);
            return responseData;
        } catch (error) {   
            // console.log('error fetching data')
            // console.log(error)
            const customError = error as CustomError;
            if (customError && customError.response) {
                if (customError.response.data.errors) {
                    setError(customError.response.data.errors);
                }
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
        return null
      
    }, []);

    return { fetchData,data, loading, error, responseStatus,setSendRequest,setSendData,setMediaData,setHeaders };
};



export default useFetch;
