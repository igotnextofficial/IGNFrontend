import STATUS from './HttpEnv';
import axios from 'axios';
import validator from 'validator';
class IgnRequest {
  constructor(){
    this.client  =  axios; //http client will be using axios;
    this.status  =  STATUS.IDLE;
    this.method  =  'GET';
    this.destination  = "";
    this.data = {}; // the data being sent on a post request.
    this.header = {};
    this.payload = {};
    this.responseData =  null;
    this.error = {};
  }

  init(configuration){// expects an object with the appropriate property names
    this.setDestination(configuration.url);
    this.setMethod(configuration.method);
    this.setData(configuration.data)
    this.setHeader(configuration.headers);
    this.setPayload(); // combines the configurations that were passed into an object.
    // this.makeConnection();
  }
  
  setDestination(url){
    if ( !this.paramIsNotPassed(url) ){
      return false;
    }
    
    let cleanUrl = url.trim();
    
    if( !this.validUrl(cleanUrl) ) {
      this.addError("Invalid Url",`The url you provided ${url} is invalid.`) 
      return false;
    }
    
    this.updateDestination = cleanUrl;
    return this;

  }


  get getDestination(){
      return this.destination;
  }

  set updateDestination(url){
    this.destination = url;
  }

  validUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
    
  }
  
  paramIsNotPassed(param){
    if(!param){
      this.addError("Missing Parameter","no parameter was passed to the function")
      return false;
    }
    return true;
  } 

  addError(key,message){
    this.error[key] = message;
  
  }

  get getErrors(){
    return this.error;
  }

  getErrorMessage(key){
    return this.error[key];
  }

  setMethod(method){
    let validMethods = ["GET","POST","PUT","DELETE"];
    let chosenMethod = validMethods[0];
    
    validMethods.find(validMethod => {
      if ( validMethod.toLowerCase() === method.toLowerCase().trim() ){
        chosenMethod = validMethod;
      }
    });

    this.updateMethod = chosenMethod;
    return this;
  }

  set updateMethod(method){
    this.method = method
  }

  get getMethod(){
    return this.method;
  }
  // handleResponse,handleError

 async makeConnection(){
   try {
    let response = await axios(this.getPayload)
    let data = await response.data;
    this.setResponseData(data)    
    return true;
   } catch (error) {
       let statusCode = error.response.status ;
       if(statusCode === 422){
        let errors = error.response.data.errors;
          for (error in errors){
           this.addError(error, errors[error].toString())
          }  
          return false;
       }




    
      // process by status codes 
     this.addError("connecteion Failed", error.message)
     return false;
   }



  
  }

  setProcessing(){
    this.status = STATUS.PROCESSING;
    return this;
  }
  
  setIdle(){
    this.status = STATUS.IDLE;
    return this;    
  } 
  
  setFailed(){
    this.status = STATUS.FAILED;
    return this;
  }
  
  setSuccess(){
    this.status = STATUS.SUCCESS;
    return this;
  }

  setClient(){
    //this.client = axios;
  } 
  
  setData(data){
    if((data !== null || Object.entries(data).length > 0) && this.method !== "GET"){
      this.updateData = data;
    }
  }

  set updateData(data){
    this.data = data;
  }

  get getData(){
    return this.data
  }

  setHeader(header){
    if(header === undefined) {return false;}
    if((header !== null && Object.entries(header).length > 0) ){
      this.updateHeader = header;
     }
  }

  set updateHeader(header){
    this.header = header;
  }
  
  get getHeader(){
    return this.header;
  }
  
  get getStatus() {
    return  this.status;
  }

  setPayload(){
    let payload = {
      url:this.getDestination,
      method:this.getMethod,
    }

    if(Object.entries(this.getHeader).length > 0){
      payload['headers'] = this.getHeader;
    }

    if(this.getMethod !== "GET"){
      payload['data'] = this.getData;
    }

    this.updatePayload = payload;
  }

  set updatePayload(payload){
     this.payload = payload;
  }

  get getPayload(){
    return this.payload;
  }

  
  getClient(){
    return  this.client;
  }

 setResponseData(data){
   this.updateResponseData = data;
 }

 set updateResponseData(data){
     this.responseData = data
 }

 get getResponseData(){
    return this.responseData;
  }
  

}



export default IgnRequest ;


/*
 1. set destination url
 2. choose method if not get method
 3. make connection
 4. send data
 5. handle response.
 
 */