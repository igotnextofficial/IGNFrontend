import { ReactNode, useEffect, useRef, useState } from "react"
import { DataSubmitContext } from "../Contexts/DataSubmitContext"
import axios, { AxiosError } from "axios"
import { httpDataObject,HttpMethods } from "../Types/DataTypes"

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
  
  const getFormData = (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

const DataSubmissionProvider: React.FC<dataProviderType> = (
    {children,httpMethod=HttpMethods.GET,dataUrl})=>{
    const [data,setData] = useState<Record<string, any>>({})
    const [error,setErrorMessage] = useState("")
    const [response,setResponse] = useState<httpDataObject | null>(null)
    const [canSubmitData,setcanSubmitData] = useState(false)
    
    useEffect(()=>{
      
       
        const fetchData = async () => {
            if (canSubmitData) {
              const updatedData = getFormData(data);
              const responseData = await submit({ method: httpMethod, url: dataUrl }, updatedData);
              if (responseData !== null) {
                setResponse(responseData);
              } else {
                setErrorMessage("An error occurred while submitting data.");
              }
            }
          };
          fetchData();
    
    },[data,dataUrl,httpMethod,canSubmitData]) 

    useEffect(() => {
    },[response])

    
    

    function updateData(dataObj:httpDataObject){

         setData(dataObj)
         setcanSubmitData(true)

    }               
    
    return (
        <DataSubmitContext.Provider value={{data ,response, updateData:updateData}}>
             {children}
         </DataSubmitContext.Provider>
    )
}

export default DataSubmissionProvider   