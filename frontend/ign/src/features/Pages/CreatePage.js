//this wll be the form page
import React, { useState, useEffect,useCallback,createContext } from 'react';

import {INPUTS} from './.settings.json'

import IgnRequest from '../Http/Request';
import Errors from '../Errors/display';
import '../../styles/form.css';
import FormTags from './FormTags.js';
import { FormContext } from './FormContext'


let handleUpdate = (text)=>{

}

let OutputInput = (props)=>{
  let output = [];
  for(const input in props.inputs){
    let inputObject = props.inputs[input];
    output.push(<FormTags info={inputObject}  onInputUpdate={handleUpdate} createWithSlug = {inputObject.hasSlug} tag={inputObject.tag} />)

  }
  return output;
}

function CreatePage() {
  const [hasErrors, setHasErrors] = useState(false)
  let [hasErrorMsg,setHasErrorMsg] = useState("")

  // useEffect(()=>{ 
  //   hasErrors ? setHasErrorMsg("Please Fix errors below") :setHasErrorMsg("")
  // },[hasErrors])
  
  return (
  
    <div className='form-container' >
       
   
      <h1>Create Pages</h1>
      <p className="errorHeader">{hasErrorMsg}</p>
      <FormContext.Provider value = {{ hasErrors, setHasErrors }}>
        <OutputInput inputs = {INPUTS} /> 
        <button value="create page">Create Page</button>
      </FormContext.Provider>
      {/* <FormTags info={INPUTS.TITLE.elementData}  onInputUpdate={handleUpdate} createWithSlug = {INPUTS.TITLE.hasSlug} /> */}
      
       {/* <div> {test['input']} </div> */}
     
      {/* <CreatePageForm /> */}

 
    </div>
    
  )
}



export default CreatePage