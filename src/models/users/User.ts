import { UserDataType, httpDataObject } from "../../types/DataTypes";
import IgnRequest from "../../features/Http/IgnRequest";

class User{
    endpoint: string
    baseURI: string
    static readonly INFO: string = "userInfo"
    static readonly ACCESS_TOKEN: string = "accessToken"
    constructor(){
        this.endpoint = `https://${process.env.REACT_APP_USER_API_URI}/users`;
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
        console.log(`the user id is: ${user.id}`)
        return user.id === '' ? false : true
    }

    async login (data:httpDataObject){
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI});
        console.log(`The base uri is ${this.baseURI}`)
        try{
           let response = await ignHttpRequest.post('/login',data);
           if(response.status !== 200){return false}
     
           localStorage.setItem(User.INFO,JSON.stringify(response.data['data']));
           document.cookie = `access_token=${response.data['access_token']}; Secure; HttpOnly`;
           localStorage.setItem(User.ACCESS_TOKEN, response.data['access_token']);
           console.log(`setting access token: ${response.data['access_token']}`)
           localStorage.setItem("test","testing to login user")
           console.dir(response)
           return true;
        }
        catch(error){
            console.log("We faced a login error ")
       
     
            console.dir(error)
            return false
        }

       
    }

    async logout(){
        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI, headers:{'Authorization': `Bearer ${localStorage.getItem(User.ACCESS_TOKEN)}`}});

        try{
            let response = await ignHttpRequest.post('/logout');
            if(response.status !== 200 || (!localStorage.getItem(User.INFO))){return false}
            localStorage.removeItem(User.INFO)
            localStorage.removeItem(User.ACCESS_TOKEN)
            return true; 
        }
        catch(error){
            return false;
        }
 
    }

}

export default User;