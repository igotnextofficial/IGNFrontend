import { UserDataType, httpDataObject } from "../../types/DataTypes";
import IgnRequest from "../../Features/Http/IgnRequest";

class User{
    endpoint: string
    baseURI: string
    static readonly INFO: string = "userInfo"
    static readonly ACCESS_TOKEN: string = "accessToken"
    constructor(){
        this.endpoint = `https://${process.env.REACT_APP_USER_API_URI}/Users`;
        this.baseURI = `https://${process.env.REACT_APP_USER_API_URI}` || ""; 
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

    show(){
        return "The user account"
    }

    isLoggedIn(){

        let user = this.get();
        return user.id === '' ? false : true
    }

    async login (data:httpDataObject){
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI});
        try{
           let response = await ignHttpRequest.post('/login',data);
           if(response.status !== 200){return false}
     
           localStorage.setItem(User.INFO,JSON.stringify(response.data['data']));
           document.cookie = `access_token=${response.data['access_token']}; Secure; HttpOnly`;
           localStorage.setItem(User.ACCESS_TOKEN, response.data['access_token']);
           localStorage.setItem("test","testing to login user")
           console.dir(response)
           return true;
        }
        catch(error){
            console.dir(error)
            return false
        }

       
    }

    async logout(){
        if(!localStorage.getItem(User.INFO)){
            return false;
        }
        let success = false;
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI, headers:{'Authorization': `Bearer ${localStorage.getItem(User.ACCESS_TOKEN)}`}});

        try{
             await ignHttpRequest.post('/logout');
             success = true; 
        }
        catch(error){
            //handle the error
        }

        localStorage.removeItem(User.INFO)
        localStorage.removeItem(User.ACCESS_TOKEN)
        return success;
 
    }

}

export default User;