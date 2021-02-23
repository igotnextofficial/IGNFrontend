import STATUS from './HttpEnv';
import axios from 'axios';
import validator from 'validator';
class Request {
  constructor(){
    this.client  =  axios; //http client will be using axios;
    this.status  =  STATUS.IDLE;
    this.method  =  'GET';
    this.destination  =  "";
    this.config = {};
    this.responseData =  null;
    this.error = {};
  }

  init (url){
    this.setDestination(url);
    // this.setMethod(method);
    // this.prepRequest(data)
    // this.makeConnection();
  }



  setDestination(url){
    if( !( Boolean(this.paramIsNotPassed(url)) )) return false;
    if( this.validUrl(cleanUrl) == false) return false;
    
    let cleanUrl = url.trim();
    this.destination = cleanUrl;

    return this;
  }

  validUrl(url){
    if(process.env.NODE_ENV == "development") return true;
    try {
      const URL = new URL(url);
       
    } catch (error) {
      return false;
    }

  }

  paramIsNotPassed(param){
    if(!param){return false;}
  } 

  addError(key,message){
    this.error[key] = message;
  
  }

  getErrorMessage(key){
    return this.error[key];
  }

  setMethod(method){
    let validMethods = ["GET","POST","PUT","DELETE"];
    let chosenMethod = validMethods.find(validMethod => validMethod.toLowerCase() === method.toLowerCase().trim());
    this.getProperties().method = Boolean(chosenMethod) ? chosenMethod : validMethods[0]; 
    return this;
  }

  prepRequest(dataToSend){
    let methodChosen = null;
    let httpClient = this.getClient();
    let url = this.getDestination()

    switch(this.getMethod()){
      case "POST":
   
          
            methodChosen = httpClient.post(url,dataToSend);
    
          
      break;
 
      case "GET":
        methodChosen = httpClient.get(url)
      break;

      default: 
       methodChosen =  httpClient.get(url)
    }

    return methodChosen
  }

  makeConnection(handleResponse,handleError){
      
       
    this.client({
       method:this.method,
       url:this.url,
       data:this.data, // only if post request'
       headers:this.config
 
    })
      .then((response)=>{
        handleResponse(response)
      })
      .catch((error)=>{
        handleError(error)
      });

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
      if(data !== null){
          this.responseData = data;
      }
  }
  
  getStatus() {
    return  this.status;
  }

  getMethod(){

  }

  getClient(){
    return  this.client;
  }

  getDestination(){
      return this.destination;
  }

  getData(){
      return this.responseData;
  }


}



export { Request };


/*
 1. set destination url
 2. choose method if not get method
 3. make connection
 4. send data
 5. handle response.
 
 */