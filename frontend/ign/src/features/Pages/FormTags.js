// testing react using Refs

import React, { useState, useEffect,useRef, useContext }  from 'react';
import Errors from '../Errors/display'
import { FormContext } from '../Pages/FormContext'


let defaultStyles = {margin:"20px", padding:"8px",fontSize:"20px"}

const sluggify = (data) => {
  return data.replace(/\s+/g, " ").trim().replaceAll(" ", "-");
}

const FormTags = (props)=>{
  const  [formErrors, setFormErrors]  = useState({errors: ""})
  const {setHasErrors} = useContext(FormContext)
  let contentErrors = {errors:[]}
  let [manageInput,setManageInput] = useState('');
  const inputel = useRef("")
   
  useEffect(()=>{
    inputel.current.focus()
    inputel.current.setSelectionRange(inputel.current.value.length,inputel.current.value.length)
   
  },[manageInput]);

  useEffect(()=>{
    setFormErrors(formErrors)
   
  },[formErrors]);
  let checkValidLength = (currentLength,validLength,checkingForMin = false)=>{
    return checkingForMin ? minLength(currentLength,validLength) : maxLength(currentLength,validLength)
 }
  function updateContent(){
    let currentLength = inputel.current.value.length 
     console.log("the value has changed and has a length of ", currentLength)
     if(!(isEmpty(currentLength))){
       checkValidLength(currentLength,props.info.rules.MAXIMUM.value,false)
       checkValidLength(currentLength,props.info.rules.MINIMUM.value,true)
    }


     
    props.onInputUpdate(inputel.current.value)
    if(props.info.name === "slug"){
     setManageInput(props.info.value)
     
    }
    else{
      setManageInput(inputel.current.value)
    }
   
  }
  function addErrors(error,errorType){
    console.log("adding error ... ")
   console.dir(error)
   let errorMessage = {errors:error}
    setFormErrors(errorMessage)
    setHasErrors(true)
  }
  function clearErrors(){
    const clearedObj = {errors: ""}
    setFormErrors(clearedObj)
    setHasErrors(false)
  }
  //error checking

   let maxLength = (currentLength,validLength)=>{
      let message =props.info.rules.MAXIMUM.errorMessage
    //  clearErrors()
     if(currentLength > validLength){
      addErrors(message,"max")
      // setFormErrors({errors:message})
    }
  }
   let minLength = (currentLength,validLength)=>{
    //  console.log("checking min length.",currentLength)
    //  console.log("the valid length length.",validLength)
     let message =props.info.rules.MINIMUM.errorMessage
    //  clearErrors()
     if(currentLength < validLength){
      //  console.log("not enough characters")
      //  console.dir()
      addErrors(message,"min")
     }
  }
   let isEmpty = (currentLength)=>{
    clearErrors()
    // console.log("isEmpty")
    // console.dir(props.info.rules.REQUIRED)
      if(currentLength < 1){
        addErrors(props.info.rules.REQUIRED.errorMessage,"empty")
        return true
      }
      return false
   }
      //error checking ends
    

   let GenerateInputTagWithSlug = (data)=>{
    return ( 
      <div>
        <input {...data.props.info.options} onChange={updateContent} ref={inputel} style={defaultStyles} value={manageInput} />
        <Errors errors ={formErrors} />
        <input name="slug" readOnly={true}  placeholder="slug" style={defaultStyles} value={sluggify(manageInput)} />
      </div>
      )
   }

   let GenerateInputTagWithoutSlug = (data) =>{
      return (
      <div>
         <input {...data.props.info.options} onChange={updateContent} ref={inputel} style={defaultStyles} value={manageInput} />
         <Errors errors ={formErrors} />
      </div>
      )
   }
   


   function GenerateInputTag(data){
     let output = data.props.createWithSlug ? GenerateInputTagWithSlug(data) : GenerateInputTagWithoutSlug(data);
     return output; 
   }

  function GenerateTextAreaTag(data){
    return (
      <div>
         <textarea {...data.props.info.options} onChange={updateContent} ref={inputel} style={defaultStyles} value={manageInput}> </textarea>
         <Errors errors = {formErrors} />
      </div>
      
      )
  }

  function GenerateTag(data){
    // console.dir(data)
    if(data.props.tag === "input"){return <GenerateInputTag props ={props} />}
    if(data.props.tag === "textarea"){return <GenerateTextAreaTag props ={props}/> }
    return <div></div>
  }
  return(
      
      <>
      
      <GenerateTag props ={props} />
      

       
      </>
  )
}

export default FormTags;