import {React} from 'react';
import axios from 'axios';
import '../../styles/form.css';
let data={
    title:'',
    slug:'',
    description:'',
    display:false
};

let updateData = ()=>{
   const config = {
        headers: {
          "Access-Control-Allow-Origin": '*',
        }
      }
     console.log(data)
    axios({
       method:"POST",
       url:'http://pages.igotnext.test/api/',
   
       data:data
 
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log("received one error try again");
      });

      return false;
}


let  sluggify = (data)=>{
  return data.replace(/\s+/g," ").trim().replaceAll(" ","-");
}

let updateContent = (e) =>{
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


const createPage = ()=>{
    console.log(process.env.NODE_ENV)
  return (
     
    <div className='form-container' >
    <h1>Create Page</h1>
    <CreatePageForm/>
    
</div>
  )
}



export default createPage