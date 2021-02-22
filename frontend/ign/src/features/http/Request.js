import STATUS from './HttpEnv';
import axios from 'axios';
const Request = ( () =>{
    const requestProperties = {
      client : axios, //http client , will be using axios;
      status : STATUS.IDLE,
      method : 'GET',
      destination : "",
      config:{},
      responseData: null,
      error:{}

    };

    return  {
        init:function(url,method,data){
          this.setDestination(url);
          // this.setMethod(method);
          // this.prepRequest(data)
          // this.makeConnection();
        },

        getProperties:function(){
          return requestProperties
        },

        setDestination:function (url){
          if(!this.paramIsNotPassed(url)){return false;}
          // let cleanUrl = url.trim() !== "" ? url.trim() : "";
          // !this.validUrl(cleanUrl) ? this.addError("invalidUrl",`The url you entered ${url} is invalid`) : this.getProperties.destination = url;
          // return this.getProperties().error["invalidUrl"]
        },

        //validation on setDestination
          paramIsNotPassed:function(param){
            if(!param){return false;}
          },

          validUrl:function(url){
             try {
               let url = new URL(url); // this object is not supported in IE need to use polyfill
               return url;
             } catch (error) {
               return false;
             }
          },
        //end validation on setDestination
        

        addError:function(key,message){
          this.getProperties().error[key] = message;
          return this.getErrorMessage(key)
        
        },

        getErrorMessage:function(key){
          return this.getProperties().error[key];
        },
        setMethod:function (method){
          let validMethods = ["GET","POST","PUT","DELETE"];
          let chosenMethod = validMethods.find(validMethod => validMethod.toLowerCase() === method.toLowerCase().trim());
          this.getProperties().method = Boolean(chosenMethod) ? chosenMethod : validMethods[0]; 
          return this;
        },

        prepRequest:function(dataToSend){
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
      },


      makeConnection:function(handleResponse,handleError){
      
       
      this.client({
         method:this.method,
         url:this.url,
         data:this.data, // only if post request'
         headers:this.config
   
      })
        .then(handleResponse(response))
        .catch(handleError(error));
  
        return false;
        this.prepRequest()
        .then((response)=>{
           this.setData(response.data);
           console.log(response.data)
        })
        .catch(error =>{
          console.log(error)
        })
      },
        
        setProcessing: function(){
          this.status = STATUS.PROCESSING;
          return this;
        },
        
        setIdle: function(){
          this.getProperties().status = STATUS.IDLE;
          return this;    
        }, 
        
        setFailed: function(){
          this.getProperties().status = STATUS.FAILED;
          return this;
        },
        
        setSuccess: function(){
          this.getProperties().status = STATUS.SUCCESS;
          return this;
        },

        setClient: function(){
          //this.client = axios;
        }, 
        
        setData:function(data){
            if(data !== null){
                this.getProperties().responseData = data;
            }
        },
        
        getStatus: function() {
          return  this.getProperties().status;
        },

        getMethod(){
         console.log(`The method is ${requestProperties.method}`)
          return this.getProperties().method
        },

        getClient:  function(){
          return  this.getProperties().client;
        },

        getDestination(){
            return this.getProperties().destination;
        },

        getData: function(){
            return this.getProperties().responseData;
        },


        
      }
})();



export { Request };


/*
 1. set destination url
 2. choose method if not get method
 3. make connection
 4. send data
 5. handle response.
 
 */