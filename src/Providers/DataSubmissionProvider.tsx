import { ReactNode, useEffect, useRef, useState,useCallback } from "react"
import { DataSubmitContext } from "../Contexts/DataSubmitContext"
import axios, { AxiosError } from "axios"
import { httpDataObject,HttpMethods } from "../Types/DataTypes"
import { Http } from "@mui/icons-material"

interface axiosDataObject{
    method:HttpMethods,
    url:string,
    data?: object
}
interface dataProviderType{
    children:ReactNode,
    httpMethod:HttpMethods,
    dataUrl:string
}

async function submit(submissionData: axiosDataObject, updatedData: FormData) {
    try {
      const response = await axios({
        headers: { 'Content-Type': 'multipart/form-data' },
        method: submissionData.method,
        url: submissionData.url,
        data: updatedData,
      });
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      return null;
    }
  }


  async function retrieve(submissionData: axiosDataObject) {
    try {
      const response = await axios({
        method: submissionData.method,
        url: submissionData.url,
      });
      return response.data;
    } catch (error) {
      console.error("Axios error:", error);
      return null;
    }
  }
  
  const getFormData = (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

const DataSubmissionProvider: React.FC<dataProviderType> = (
    {children,httpMethod=HttpMethods.GET,dataUrl})=>{

    const [url,setUrl] = useState(``)  
    const [data,setData] = useState<Record<string, any>>({})
    const [error,setErrorMessage] = useState("")
    const [response,setResponse] = useState<httpDataObject | null>(null)
    const [canSubmitData,setcanSubmitData] = useState(false)

    const getData = useCallback(async() => {
      let temp_url = url !== "" ? url : dataUrl
        let response_data = await retrieve({ method: httpMethod, url: temp_url })
        if (response_data !== null) {
          setResponse(response_data );
        } else {
          setErrorMessage("An error occurred while submitting data.");
        }
    },[dataUrl,url,httpMethod])

    useEffect(() => {
      if(response === null && httpMethod === HttpMethods.GET){
        getData()
      }
    },[getData,response,httpMethod])

    useEffect(()=>{
    
       
        const fetchData = async () => {
          let temp_url = url !== "" ? url : dataUrl
            if (canSubmitData) {
              const updatedData = getFormData(data);
              const responseData = await submit({ method: httpMethod, url: temp_url }, updatedData);
              if (responseData !== null) {
                setResponse(responseData);
              } else {
                setErrorMessage("An error occurred while submitting data.");
              }
            }
          };
          fetchData();
    
    },[data,dataUrl,httpMethod,canSubmitData,url]) 

    useEffect(() => {
    },[response])

    
    

    function updateData(dataObj:httpDataObject | null){
        if(dataObj){
         setData(dataObj)
        }
         setcanSubmitData(true)

    }
    
    function updateUrl(passedurl = ""){
      setUrl(passedurl)
    }
    
    return (
        <DataSubmitContext.Provider value={{data ,response, updateData,updateUrl}}>
             {children}
         </DataSubmitContext.Provider>
    )
}

export default DataSubmissionProvider     