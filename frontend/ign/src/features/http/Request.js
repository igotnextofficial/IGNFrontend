import STATUS from './HttpEnv';
import axios from 'axios';
const Request = ( () =>{
    const requestProperties = {
      client : axios, //http client , will be using axios;
      status : STATUS.IDLE,
      method : 'GET',
      destination : "",
      responseData: null

    };

    return  {
        init:function(url,method,data){
          this.setDestination(url);
          this.setMethod(method);
          this.prepRequest(data)
          this.makeConnection();
        },

        getProperties:function(){
          return requestProperties
        },

        setDestination:function (url){
          this.getProperties().destination = url.trim() !== "" ? url.trim() : "";
          return this;
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


      makeConnection:function(){
       
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