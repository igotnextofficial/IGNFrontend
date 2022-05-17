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
  const  [hasErrors, setHasErrors]  = useState(false)
  const {} = useContext(FormContext)
  
  
  let contentErrors = {errors:[]}
  let [manageInput,setManageInput] = useState('');
  let[manageCheckbox,setManageCheckbox] = useState(false)
  const inputel = useRef("")
  
  useEffect(() =>{
try {
  inputel.current.focus()
  inputel.current.setSelectionRange(inputel.current.value.length,inputel.current.value.length)
} catch (error) {
  
}
    // inputel.current.setSelectionRange(inputel.current.value.length,inputel.current.value.length)
  },[manageInput])


  useEffect(()=>{
    setFormErrors(formErrors)
    props.onInputUpdate(formErrors.errors)

  },[formErrors]);

  // useEffect(()=>{
  //   inputel.current.focus()
  // },[setHasErrors])


  let checkValidLength = (currentLength,validLength,checkingForMin = false)=>{
    return checkingForMin ? minLength(currentLength,validLength) : maxLength(currentLength,validLength)
 }
  function updateContent(){
    let currentLength = inputel.current.value.length
 
    if(!(isEmpty(currentLength)) && inputel.current.type !== "checkbox"){
      checkValidLength(currentLength,props.info.rules.MAXIMUM.value,false)
      checkValidLength(currentLength,props.info.rules.MINIMUM.value,true)
    }

    if(inputel.current.type == "checkbox"){
      
      let passedValue = inputel.current.checked ? "on" : "off";
      
      setManageInput(passedValue);
      props.formContentValues[inputel.current.id] = inputel.current.checked;
      console.dir(props.formContentValues)
    }
    else{
      setManageInput(inputel.current.value)
      props.formContentValues[inputel.current.id] = inputel.current.value
    }
    
    

  
    
    // let updatedValue = inputel.current.type === "checkbox" ? !(updatedFormContent[inputel.current.id]) : inputel.current.value;
    // const updatedFormContent = {...FormContent};
    // updatedFormContent[inputel.current.id] = updatedValue
    // setFormContent(updatedFormContent)
    // console.log(`updating ${inputel.current.id} : ${updatedValue} ${typeof(updatedValue)} should be ${!(inputel.current.checked)} `)
    // props.info.name === "slug" ?  setManageInput(props.info.value) :  setManageInput(inputel.current.value)
  
  }
  
  function addErrors(error,errorType){

   let updatedErrorMessage = {...formErrors}
   updatedErrorMessage['errors'] = error
    setFormErrors(updatedErrorMessage)
    setHasErrors(true)
  }
  function clearErrors(){
    const updatedClearErrors = {...formErrors}
    updatedClearErrors['errors'] = ""
    setFormErrors(updatedClearErrors)
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
     let message =props.info.rules.MINIMUM.errorMessage
    //  clearErrors()
     if(currentLength < validLength){
      addErrors(message,"min")
     }
  }
   let isEmpty = (currentLength)=>{
    clearErrors()
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
        
        <input {...data.props.info.options} onChange={updateContent} ref={inputel} style={defaultStyles} value={manageInput}  />
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

  function handleCheckbox(){
   
    // let changedTo = !inputel.current.checked
    // console.log(`The item changed to ${changedTo}`)
    // setManageCheckbox(!inputel.current.checked)
    // console.log(inputel.current.checked)
   
  }
  function GenerateCheckbox(data){

    return (
      <div>
          <label htmlFor={data.props.info.options.id}>{data.props.info.labelMessage} </label>
          <input {...data.props.info.options} ref={inputel} onChange={updateContent} style={{padding:"8px",width:"auto",backgroundColor:"white"}}  checked={manageInput == "on"}/>
      </div>
      
      )
  }

  function GenerateTag(data){
  
    if(data.props.info.options.type === "checkbox"){return <GenerateCheckbox props ={props} />}
    if(data.props.info.options.type  === "text"){return <GenerateInputTag props ={props} />}
    if(data.props.info.tag === "textarea"){return <GenerateTextAreaTag props ={props}/> }
    return <div></div>
  }
  return(
      
    <>
      <GenerateTag props ={props} />
    </>
  )
}

export default FormTags;