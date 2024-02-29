import { ReactNode, useEffect, useState } from "react"
import { DataSubmitContext } from "../Contexts/DataSubmitContext"
import axios, { AxiosError } from "axios"
import { httpDataObject } from "../Types/DataTypes"

enum httpMethods {
    GET= "get",
    POST= "post",
    PUT= "put"

}
interface axiosDataObject{
    method:httpMethods,
    url:string,
    data?: object
}
interface dataProviderType{
    children:ReactNode,
    httpMethod:httpMethods,
    dataUrl:string
}

const DataSubmissionProvider = (
    {children,httpMethod=httpMethods.GET,dataUrl}
    :   
    {children:ReactNode,httpMethod:httpMethods,dataUrl:string}
    )=>{
    const [data,setData] = useState({data:{}})
    const [error,setErrorMessage] = useState("")
    const [url,setUrl] = useState("")
    const [response,setResponse] = useState({})
    
    useEffect(()=>{
        submit({method:httpMethod,data:data,url:dataUrl})
    },[data,dataUrl,httpMethod]) 
    
    function submit(submissionData:axiosDataObject) {
      axios({
        method:submissionData.method,
        url:submissionData.url,
        data:submissionData.data
      })
      .then((response) => {
        setResponse(response)
            //set response for user of this to handle
      })
      .catch((error:AxiosError)=>{
            setErrorMessage(error.message)
      })
    }




    function updateData(dataObj:httpDataObject){
        if(!('data' in dataObj)){
           throw new Error("Wrap object in a data object")
        }
         setData(dataObj)

    }
    
    return (
        <DataSubmitContext.Provider value={{data ,response, updateData:updateData}}>
             {children}
         </DataSubmitContext.Provider>
    )
}

export default DataSubmissionProvider   