import axios from "axios"
import { HttpMethods,httpDataObject } from "../Types/DataTypes"

interface axiosDataObject{
  method:HttpMethods,
  url:string,
  data?: object
}



async function submit(submissionData: axiosDataObject, updatedData: FormData | httpDataObject | null) {
    try {
      const response = await axios({
        headers: updatedData && 'image' in updatedData ? { 'Content-Type': 'multipart/form-data' } : {'Content-Type': 'application/json'},
        method: submissionData.method,
        url: submissionData.url,
        data: updatedData ? updatedData : {},
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

  export async function sendRequest (method:HttpMethods, url:string, data?:httpDataObject | null, headers={}){
    let preparedData = null
    if(data ){
      if('image' in data){
        preparedData = getFormData(data)
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
