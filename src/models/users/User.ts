import { UserDataType, httpDataObject } from "../../Types/DataTypes";
import IgnRequest from "../../Features/Http/IgnRequest";

class User{
    endpoint: string
    baseURI: string
    ignHttpRequest: IgnRequest;
    loginEndpoint:string;
    logoutEndpoint:string;
    static readonly INFO: string = "userInfo"
    static readonly ACCESS_TOKEN: string = "accessToken"
    constructor(){
        this.baseURI = process.env.REACT_APP_ENVIRONMENT === "development" ? `${process.env.REACT_APP_TEST_API}` : `https://${process.env.REACT_APP_USER_API_URI}`; 
        this.endpoint = `http://${this.baseURI}/users`;
        this.loginEndpoint = `http://${this.baseURI}/login`
        this.logoutEndpoint = `http://${this.baseURI}/logout`
   
        this.ignHttpRequest = new IgnRequest({baseURL:this.baseURI})
        this.ignHttpRequest.setHeaders();
    }

    default(){
        return {
            id: '',
            name: 'default',
            email: '',
            username:'',
            role:{ id:'',type:'' }
            
        }
    }
    get(){
        let user = localStorage.getItem(User.INFO) || '{}' ;
        return localStorage.getItem(User.INFO) ? JSON.parse(user) : this.default();
    }

    isLoggedin(){
        return localStorage.getItem(User.INFO) !== null; // and also check if token is valid
    }

    show(){
        return "The user account"
    }


    async login (data:httpDataObject){
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI});
        try{
            
           let response = await ignHttpRequest.post(`${this.loginEndpoint}`,data);
           if(response.status !== 200){return null}
     
           localStorage.setItem(User.INFO,JSON.stringify(response.data['data']));
           document.cookie = `access_token=${response.data['access_token']}; Secure; HttpOnly`;
           localStorage.setItem(User.ACCESS_TOKEN, response.data['access_token']);
           localStorage.setItem("test","testing to login user")

           return response;
        }
        catch(error){
            console.log('could not login')
            console.log(JSON.stringify(error))
            return null
        }

       
    }

    getUserAccessToken(){
        return localStorage.getItem(User.ACCESS_TOKEN) || ""
    }

    async logout(){
        if(!localStorage.getItem(User.INFO)){
            return null;
        }
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI, headers:{'Authorization': `Bearer ${localStorage.getItem(User.ACCESS_TOKEN)}`}});

        try{
            const response = await ignHttpRequest.post(this.logoutEndpoint);
             localStorage.removeItem(User.INFO)
             localStorage.removeItem(User.ACCESS_TOKEN)
             return response
        }
        catch(error){
            console.log(JSON.stringify(error))
            return null
        }

 
    }

    async register(data:httpDataObject){
        try{
           const response = await this.ignHttpRequest.post(`${this.endpoint}`,data)
           return response.data
        }
        catch{
            return null
        }
    }



}

export default User;