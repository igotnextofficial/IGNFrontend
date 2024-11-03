import axios from "axios"

import { HttpMethods,httpDataObject } from "../types/DataTypes"

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

interface CustomError extends Error{
  response?:Record<string,any>
}
async function submit(submissionData: axiosDataObject, updatedData: FormData | httpDataObject | null, headers:Record<string,any> = {}) {
    try {
      headers = updatedData instanceof FormData ? {...headers} : { ...headers, 'Content-Type': 'application/json' };
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
      const custom_error = error as CustomError
      if(custom_error && custom_error.response){
        if(custom_error.response.data.errors){
          return custom_error.response.data as httpDataObject;
        }
        console.error("Axios error:", error );
        
      }
   
      return null;
    }
  }

  
  export const getFormData = (data: Record<string, any>) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  };

  export async function sendRequest (method:HttpMethods, url:string, data?:httpDataObject | null, headers:Record<string,any> = {}):Promise<httpDataObject | null>{  
    let preparedData = null

    if(data ){
      if('media' in data.data){
        preparedData = getFormData(data.data)
        // console.log(`found an image ${data.data}`)
      }
      else{
        preparedData = data;
      }
    }


    const response = await submit({ method, url },preparedData,headers);
    if(response){
      return response as httpDataObject;
    }
    return null
  }




  export const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000); // Difference in seconds

    let interval = Math.floor(diffInSeconds / 3600); // Difference in hours

    if (interval >= 24) {
        interval = Math.floor(interval / 24); // Convert hours to days
        return interval + (interval === 1 ? " day ago" : " days ago");
    } else if (interval >= 1) {
        return interval + (interval === 1 ? " hour ago" : " hours ago");
    }

    interval = Math.floor(diffInSeconds / 60); // Difference in minutes
    if (interval >= 1) {
        return interval + (interval === 1 ? " minute ago" : " minutes ago");
    }

    return "just now";
};
