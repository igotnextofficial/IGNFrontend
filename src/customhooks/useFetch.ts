import { useState, useCallback } from "react";
import { HttpMethods } from "../types/DataTypes";
import { safeFetch, SafeFetchError } from "../utils/safeFetch";

// @Deprecated use usHttp.ts instead
const useFetch = () => {
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
        try {
            const payload: Record<string, any> = {
                method: method,
                headers,
                credentials: 'include'
            };

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
            

            const response = await safeFetch(url, {
                ...payload,
                requestName: "useFetch.fetchData"
            });

            const responseData = await response.json();
            setData(responseData);
            setResponseStatus(response.status);
            return responseData;
        } catch (error) {   
            if (error instanceof SafeFetchError) {
                setError(error.message);
                setResponseStatus(error.status ?? null);
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
