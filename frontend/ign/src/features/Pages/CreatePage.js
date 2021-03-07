import React, { useState,useEffect } from 'react';

import settings from './.settings.json'
// import IgnRequest from '../Http/Request';
import Errors from '../Errors/display';
import '../../styles/form.css';
let data={
    title:'',
    slug:'',
    description:'',
    display:false
};





function CreatePage(){
    const [errors, setErrors] = useState([]);
    const [counter,setCounter] = useState(0);
   console.dir(settings)
   
    useEffect(()=>{
     console.log(errors)
    

    },[errors])
    let updateData = async ()=>{
         console.log("the button was clicked")
         console.dir(errors)
         setErrors(previousError => [...previousError,`error is ${counter}`])
         setCounter(prevCounter => prevCounter + 1)

         
        
        // const configuration = {
        //     url:'http://pages.igotnext.test/api/',
        //     method:'POST',
        //     data:data,
        //     headers:{token:'fb7b888cbbbb7883393ffzvks'}
        // };
    
        // const R = new IgnRequest();
        // R.init(configuration);
        // let connect = await R.makeConnection();
        // errors = R.getErrors;
        // console.dir(R.getErrors)
        // return connect;
    //
    }
    
    
    let  sluggify = (data)=>{
      return data.replace(/\s+/g," ").trim().replaceAll(" ","-");
    }
    
    let updateContent = (e) =>{
        let content = e.target.value;
        if(content.length < 5){}
        let cleanContent = e.target.value.replace(/\s+/g," ").trim();
        
        data['description'] = cleanContent;
    }
    
    let updateDisplay = (e)=>{
      data['display'] = e.target.value.toLowerCase() !=="hide" ? true: false;
    }
    
    let updateTitleAndSlug = (e) =>{
        let cleanValue = e.target.value.replace(/\s+/g," ").trim()
        let slug = sluggify(e.target.value)
        e.target.nextElementSibling.value = slug
        e.target.addEventListener('blur',function(e){
            data['title'] = cleanValue;
            data['slug'] = slug;
            
        })
    }
    
    let CreatePageForm = ()=>{
      
      let output = [];
      const fields = 
        [
    
          {
            name: 'title',
            type: 'text'
          },
          {
            name: 'slug',
            type: 'text'
          },
          {
            name: 'description',
            type: 'textarea'
          },
    
          {
            name: 'display',
            type: 'checkbox',
            options:['Hide','Show']
          },
    
        ]
    
        fields.map((field,index) =>{
            if(field.type === 'checkbox'){
             output.push( 
              <div className="select-holder">
              <select onChange={updateDisplay}  key={index}>
                 {field.options.map(option => {return <option>{option}</option>} )}
              </select>
              </div>
              )
            }
            else if (field.type === 'textarea'){
              output.push( 
                  <textarea onBlur={updateContent}  key={index} resize='none' placeholder='content...'></textarea>
              )
            }
            else{
              let phrase = `enter ${field.name} ...`;
              let inputData = field.name !== "slug" ? <input key={index} type='text' name={field.name} placeholder={phrase} onChange={updateTitleAndSlug}/> : <input key={index} type='text' name={field.name} placeholder="slug"  readOnly/>
              output.push( inputData )
            }
    
            return false;
        })
        output.push(<button onClick={updateData}>Create Page</button>)
        return <div className="inner-form">{output}</div>;
        
    }
 
  return (

    <div className='form-container' >


     <Errors errors = {errors} />
    <h1>Create Page</h1>
    <CreatePageForm/>

    
</div>
  )
}



export default CreatePage