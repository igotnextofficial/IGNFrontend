
import {httpDataObject,FieldErrorMaintainerType,validationObject, UserDataType, HttpMethods } from "../../types/DataTypes";
import IgnRequest from "../../features/http/IgnRequest";
import { UserFields } from "../../types/UserFields";
import { validateFullname, validateEmail,validatePassword,validateUsername, validateChoices } from '../../utils/validate';
import { Roles } from "../../types/Roles";
import Storage from "../../storage/StorageAbstract";
import { StorageTypes } from "../../storage/StorageTypes";
import { APP_ENDPOINTS } from "../../config/app";
import { sendRequest } from "../../utils/helpers";
 


class User{
    endpoint: string
    private readonly baseURI: string
    ignHttpRequest: IgnRequest;
    loginEndpoint:string;
    logoutEndpoint:string;

    fields = [UserFields.FULLNAME,UserFields.EMAIL,UserFields.PASSWORD,UserFields.USERNAME,UserFields.ROLE]
    static readonly registerFormFields = [UserFields.FULLNAME,UserFields.EMAIL,UserFields.PASSWORD,UserFields.USERNAME]
    static readonly loginFormFields = [UserFields.EMAIL, UserFields.PASSWORD]
    static readonly INFO: string = "user_info"
    static readonly ACCESS_TOKEN: string = "access_token"
    static readonly REFRESH_TOKEN: string = "refresh_token"
    
    constructor(){
        this.baseURI = `https://${process.env.REACT_APP_USER_API_URI}`; 
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
        let local_storage = new Storage(StorageTypes.LocalStorage);
        try{
            
           let response = await ignHttpRequest.post(`${this.loginEndpoint}`,data);
           if(response.status !== 200){return null}
            
           let user_data = response.data['data'];
            let user_role_type = user_data?.role?.type ??  "";
           if(user_role_type === Roles.ARTIST){
                
                user_data.mentorSession = [];
                
                // let resources = [
                //     axios.get(Endpoints.MENTOR),
                //     axios.get(Endpoints.SESSIONS),
                //     axios.get(Endpoints.NOTES)
                // ];

                // axios.all(resources)
                // .then(axios.spread((mentor, session, notes) => {
                //     // Handle each response individually
                //     console.log('Mentor Data:', mentor.data);
                //     console.log('Session Data:', session.data);
                //     console.log('Notes Data:', notes.data);
              
                //     // You can now work with the data, e.g., update state if using React
                // }))
                // .catch(error => {
                //     // Handle error for any of the requests
                //     console.error('Error fetching data:', error);
                // });

           }

           if(user_role_type === Roles.WRITER){

           }
           if(user_role_type === Roles.MENTOR){
                const auth = {Authorization: `Bearer ${response.data['access_token']} `};
                const session_url = `${APP_ENDPOINTS.SESSIONS.MENTOR }/${user_data.id}`;
                const sessions = await sendRequest(HttpMethods.GET,session_url,null, auth);
               
                const mentees_with_sessions = user_data.mentees.map((mentee:UserDataType) => {
                    sessions?.data.forEach((session:any) => {
                        if(session.mentee_id === mentee.id){
                            mentee.request_id = session.id
                            mentee.session_date = session.session_date
                            mentee.progress = 33;
                        }
                       
                    }); 
                    return mentee
                });

                console.log(`mentees with sessions ${JSON.stringify(mentees_with_sessions)}`)
                user_data.mentees = mentees_with_sessions || [];

              }
           // save data to storage , be aware of xss attacks,
        //    local_storage.setItem(User.INFO,JSON.stringify(response.data['data']));
            local_storage.save('user_info',user_data);
 
            return  response;
        }
        catch(error){
            console.log("We ran into an error when trying to login the user")
            console.log(error)
            return null
        }

       
    }

    getUserAccessToken( ){
        let cookie_storage = new Storage(StorageTypes.CookieStorage);
        return cookie_storage.load(User.ACCESS_TOKEN)
    }

    async logout(access_token:string){
    
        let local_storage = new Storage(StorageTypes.LocalStorage);
        
        if(!local_storage.hasItem(User.INFO)){
            return null
        }

        let ignHttpRequest = new IgnRequest({baseURL:this.baseURI, headers:{'Authorization': `Bearer ${access_token}`}});

        try{
            const response = await ignHttpRequest.post(this.logoutEndpoint);
            local_storage.remove(User.INFO);
        
             return response
        }
        catch(error){
             
            return null
        }

 
    }

    fullnameValidation(){
        return {method:validateFullname,'valid':false,
            'message': `Fullname is required and must meet the following criteria: \n 
            
            - Must be between [3] and [30] characters long.
            \n  - Must not contain any numeric characters.
            \n  - Must not contain any special characters.` }
    }

    emailValidation(){
        return {method:validateEmail,'valid':false,'message':'E-Mail is required should be between 3 - 30 characters, and must be a valid email address'}
    }
    
    usernameValidation() {
        return {
            method: validateUsername,
            valid: false,
            message: `Username is required and must meet the following criteria: \n
    
        - Must be between [3] and [25] characters long. \n
        - Must not contain any numeric characters. \n
        - Must not contain spaces.`
        };
    }
    
    
    passwordValidation() {
        return {
            method: validatePassword,
            valid: false,
            message: `Your password is required and must meet the following criteria: \n
        
        - Must be between [8] and [16] characters long. \n
        - Must contain at least one number. \n
        - Must contain at least one special character (e.g., !, @, #, etc.). \n
        - Must contain at least one uppercase letter.`
        };
    }
    
    validatingRoles(value:string){
        // let choiceList = [Roles.ARTIST,Roles.SUBSCRIBER,Roles.DEFAULT]
        let choiceList = [Roles.ARTIST ]
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