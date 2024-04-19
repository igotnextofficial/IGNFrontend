import {httpDataObject,FieldErrorMaintainerType,validationObject } from "../../Types/DataTypes";
import IgnRequest from "../../Features/Http/IgnRequest";
import { UserFields } from "../../Types/UserFields";
import { validateFullname, validateEmail,validatePassword,validateUsername, validateChoices } from '../../Utils/validate';
import { Roles } from "../../Types/Roles";

class User{
    endpoint: string
    baseURI: string
    ignHttpRequest: IgnRequest;
    loginEndpoint:string;
    logoutEndpoint:string;
    fields = [UserFields.FULLNAME,UserFields.EMAIL,UserFields.PASSWORD,UserFields.USERNAME,UserFields.ROLE]
    static readonly registerFormFields = [UserFields.FULLNAME,UserFields.EMAIL,UserFields.PASSWORD,UserFields.USERNAME]
    static readonly loginFormFields = [UserFields.EMAIL, UserFields.PASSWORD]
    static readonly INFO: string = "userInfo"
    static readonly ACCESS_TOKEN: string = "accessToken"
    constructor(){
        this.baseURI = process.env.REACT_APP_ENVIRONMENT === "development" ? `${process.env.REACT_APP_TEST_API}` : `https://${process.env.REACT_APP_USER_API_URI}`; 
        this.endpoint = `${process.env.REACT_APP_USER_API_URI}`;
        this.loginEndpoint = `${process.env.REACT_APP_LOGIN_API}`
        this.logoutEndpoint = `${process.env.REACT_APP_LOGOUT_API}`
   
        this.ignHttpRequest = new IgnRequest({baseURL:this.baseURI})
        this.ignHttpRequest.setHeaders();
    }

    getEndpoint() {
        return this.endpoint
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

    fullnameValidation(){
        return {method:validateFullname,'valid':false,'message':'Fullname is required should be between 3 - 30 characters'}
    }

    emailValidation(){
        return {method:validateEmail,'valid':false,'message':'Fullname is required should be between 3 - 30 characters'}
    }
    
    usernameValidation(){
        return {method:validateUsername,'valid':false,'message':'is required must be between'}
    }
    
    passwordValidation(){
            return {method:validatePassword,'valid':false,'message':'is required must be between'}
    }

    validatingRoles(value:string){
        let choiceList = [Roles.ARTIST,Roles.SUBSCRIBER,Roles.DEFAULT]
        return validateChoices(choiceList,value)
    }
    roleValidation(){

        return {method:this.validatingRoles,'valid':false,'message':'Please choose a role'}
    }

    validateRegistrationForm():validationObject{
        const validate:validationObject = {
            'fullname': this.fullnameValidation(),
            'email':  this.emailValidation(),
            'username': this.usernameValidation(),
            'password': this.passwordValidation(),
            'role': this.roleValidation()
        }

        return validate
    }

    validateLoginForm():validationObject{
        const validate:validationObject = {
            'email':  this.emailValidation(),
            'password': this.passwordValidation()
        }

        return validate
    }

    validationLoginIntialStates():FieldErrorMaintainerType {
        let updatedField:FieldErrorMaintainerType = {};
        
        [UserFields.EMAIL,UserFields.PASSWORD].forEach(field => {
            let currentField = field.toLocaleLowerCase()
            updatedField[currentField] = {"valid":false,"message":""}
        })

        return updatedField
    }
     validationIntialStates():FieldErrorMaintainerType {
        let updatedField:FieldErrorMaintainerType = {};
         this.fields.forEach(field => {
            let currentField = field.toLocaleLowerCase()
            updatedField[currentField] = {"valid":false,"message":""}
        })

        return updatedField
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