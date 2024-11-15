import { send } from "process";
import { useState, useEffect, useCallback, useMemo } from "react";
import { sendRequest } from "../utils/helpers";

interface FetchOptions {
    method?: string;
    headers?: Record<string, string>;
    data?: Record<string, any>; // JSON data wrapped in a `data` object
    body?: FormData;            // FormData for media uploads
}

interface CustomError extends Error {
    response?: Record<string, any>;
}

const useFetch = (  options: FetchOptions = { method: 'GET' }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [responseStatus, setResponseStatus] = useState<number | null>(null);
    const [url, setUrl] = useState("");
    const [sendRequest, setSendRequest] = useState(false);

    // Memoize options if they are provided inline
    // const memoizedOptions = useMemo(() => options, [options]);
    // const url = useMemo(() => url, [url]);

    useEffect(() => {
    
        if(url !== "" && sendRequest){
             fetchData();
        }
        
    }, [url,sendRequest]);

  


    const fetchData = useCallback(async () => {
        setLoading(true); // Set loading state before fetching
        try {
       
            const isJsonData = options.data !== undefined;
            const isFormData = options.body instanceof FormData;

            const response = await fetch(url, {
                method: options.method,
                headers: isFormData ? options.headers : {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.method !== 'GET'
                    ? isFormData
                        ? options.body
                        : JSON.stringify({ data: options.data })
                    : null,
            });

            const responseData = await response.json();
            setData(responseData);
            setResponseStatus(response.status);
        } catch (error) {
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
      
    }, [url, options]);

    return { data, loading, error, responseStatus,setUrl,setSendRequest };
};



export default useFetch;
