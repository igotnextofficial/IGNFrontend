import { HttpConfigurationType, httpDataObject } from "../../types/DataTypes";
import axios, { AxiosInstance } from 'axios';

class IgnRequest{
    api: AxiosInstance;

  constructor(config: HttpConfigurationType) {
    this.api = axios.create(config);
  }

    async get(endpoint:string,params:object){
       try{
            const response = await this.api.get(endpoint,{params:params})
            return response
       }
       catch (error) {
            throw error
       }
    }

    async post(endpoint:string, data:httpDataObject){
        try{
            const response = await this.api.post(endpoint,data)
            return response
        }
        catch(error){
            throw error
        }
    }

    async put(endpoint:string, data:httpDataObject){
        try{
            const response = await this.api.post(endpoint,data)
            return response.data
        }
        catch(error){
            throw error
        }
    }

    async delete(endpoint:string){
        try{
            const response = await this.api.post(endpoint)
            return response.data
        }
        catch(error){
            throw error
        }
    }




}

export default IgnRequest