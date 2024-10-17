//this wll be the form page
import React, { useState, useEffect,useCallback,createContext } from 'react';

// import {INPUTS} from './.settings.json'

// import IgnRequest from '../Http/Request';
// import Errors from '../Errors/display';
import '../../styles/form.css';
import FormTags from './FormTags.js';
// import { FormContext } from './FormContext'
import  CreatePageForm  from '../forms/CreatePageForm';
import uuid from '../helpers/generaterandom';






function CreatePage() {

  let formHasErrors = true
  const FormContent =  {
    pageName:"",
    slug:"",
    description:"",
    display:false
  }


  let submitForm  = (e)=>
  {
    if(!formHasErrors){return false}
    //submitForm  
  }

  let handleUpdate = (e = "")=>{
    let config = {
      url:"",
      method:"",
      data:"",
      headers:""
    }
        if(e.length > 0){

          formHasErrors =  e.trim() != "" ? true : false;
        }
        // config.url = "localhost:8000/api/";
        // FormContent['display'] = Number(FormContent['display']);
        // config.method = "POST";
        // config.data = FormContent;
        // ("sending");
        // console.dir(config)
        // let ign_request = new IgnRequest()
        // ign_request.init(config)

     
       

 }
 
  let CreateFormTags = (props)=>{
    let output = [];
    for(const input in props.inputs){
      let inputObject = props.inputs[input];
      output.push(<FormTags key={uuid('links')} formContentValues={FormContent} info={inputObject} onInputUpdate={handleUpdate} createWithSlug = {inputObject.hasSlug} tag={inputObject.tag} />)
  
    }
    return output;
  }


  useEffect(()=>{ 

  },[FormContent])
  
  return (
  
    <div className='form-container' >
       
   
      <h1>Create Pages</h1>
      <CreatePageForm></CreatePageForm>

     
    </div>
    
  )
}



export default CreatePage