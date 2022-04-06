//this wll be the form page
import React, { useState, useEffect,useCallback,createContext } from 'react';

import {INPUTS} from './.settings.json'

import IgnRequest from '../Http/Request';
import Errors from '../Errors/display';
// import '../../styles/form.css';
import FormTags from './FormTags.js';
import { FormContext } from './FormContext'
import uuid from '../helpers/generaterandom';






function CreatePage() {

  let formHasErrors = true
  const FormContent =  {
    pageName:"",
    slug:"",
    description:"",
    display:true
  }


  let submitForm  = (e)=>
  {
    if(!formHasErrors){return false}
    //submitForm  
  }
  let handleUpdate = (e = "")=>{
        if(e.length > 0){

          formHasErrors =  e.trim() != "" ? true : false;
        }

        console.log("Updated form values")
        console.dir(FormContent)

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
     
      <FormContext.Provider value = {{}}>
        <CreateFormTags inputs = {INPUTS} /> 
        <button value="create page" onClick={handleUpdate(FormContent)}>Create Page</button>
        
      </FormContext.Provider>
      {/* <FormTags info={INPUTS.TITLE.elementData}  onInputUpdate={handleUpdate} createWithSlug = {INPUTS.TITLE.hasSlug} /> */}
      
       {/* <div> {test['input']} </div> */}
     
      {/* <CreatePageForm /> */}

 
    </div>
    
  )
}



export default CreatePage