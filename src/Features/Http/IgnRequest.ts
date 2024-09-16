import { HttpConfigurationType, HttpHeaders, httpDataObject } from "../../Types/DataTypes";
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import User from "../../Models/Users/User";


class IgnRequest {
    api: AxiosInstance;
    headers: object | null;
    requestInProgress:boolean

    constructor(config: HttpConfigurationType) {
        this.api = axios.create(config);
        this.headers = null;
        this.requestInProgress = false;
    }

    setHeaders(passedHeaders?:HttpHeaders,needsAuth = true) {
      
        let token = localStorage.getItem(User.ACCESS_TOKEN);
        const headers:HttpHeaders =  {'Content-Type': 'application/json'}

        if(needsAuth){
            headers['Authorization'] = `Bearer ${token}`
        }

        this.headers = headers;
    }

    setRequstInProgress(inProgress:boolean){
        this.requestInProgress = inProgress;
    }

    async get(endpoint: string, params?: object) {
        if(this.requestInProgress === true){throw new Error("Request in progress")}
        try {
            this.setRequstInProgress(true);
            const config: AxiosRequestConfig = { params: params };
            if (this.headers) {
                config.headers = this.headers;
            }

            const response = await this.api.get(endpoint, config);
            return response;
        } catch (error) {
            throw error;
        }
        finally{
            this.setRequstInProgress(false)
        }
        
    }

    async post(endpoint: string, data: httpDataObject = {data: {}}) {
        try {
            const config: AxiosRequestConfig = {};
            if (this.headers) {
                config.headers = this.headers;
            }

            
            const response = await this.api.post(endpoint, data , config);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async put(endpoint: string, data?: httpDataObject) {
        try {
            const config: AxiosRequestConfig = {};
            if (this.headers) {
                config.headers = this.headers;
            }

            const response =  data 
            ? await this.api.put(endpoint, data, config) // corrected to 'put'
            : await this.api.put(endpoint, [], config)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(endpoint: string) {
        try {
            const config: AxiosRequestConfig = {};
            if (this.headers) {
                config.headers = this.headers;
            }

            const response = await this.api.delete(endpoint, config); // corrected to 'delete'
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default IgnRequest;
