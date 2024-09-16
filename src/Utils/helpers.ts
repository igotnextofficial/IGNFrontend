import axios from "axios"

import { HttpMethods,httpDataObject } from "../Types/DataTypes"

interface axiosDataObject{
  method:HttpMethods,
  url:string,
  data?: object
}


interface optionsDataType{
  headers:any
  method:HttpMethods,
  url:string,
  withCredentials?:boolean,
  data?:FormData | httpDataObject | null
}
async function submit(submissionData: axiosDataObject, updatedData: FormData | httpDataObject | null) {
    try {
      const headers = updatedData instanceof FormData ? {} : { 'Content-Type': 'application/json' };
      const options:optionsDataType = {
        headers,
        method: submissionData.method,
        url: submissionData.url,
      }
      if(updatedData !== null){
          options.data = updatedData;
      }



      const response = await axios(options);
      return response.data;

    } catch (error) {
      if(error instanceof Error){
        console.error("Axios error:", error.message);
      }
   
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

  export async function sendRequest (method:HttpMethods, url:string, data?:httpDataObject | null, headers={}){
    let preparedData = null

    if(data ){
      if('image' in data.data){
        preparedData = getFormData(data.data)
        console.log(`found an image ${data.data}`)
      }
      else{
        preparedData = data;
      }
    }


    const response = await submit({ method, url },preparedData);
    if(response){
      return response as httpDataObject;
    }
    return null
  }
