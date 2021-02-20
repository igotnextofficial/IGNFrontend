import {React} from 'react';
import axios from 'axios';
import '../../styles/form.css';
let data={};
let update = (e) =>{
    let cleanValue = e.target.value.replace(/\s+/g," ").trim()
    e.target.nextElementSibling.value = e.target.value.replace(/\s+/g," ").trim().replaceAll(" ","-")
    e.target.addEventListener('blur',function(e){
        console.log(e.target.name + " was focused out")
        //update data object
    })
      

  

   data[e.target.name] = cleanValue
    
   console.log(data.title)

   const config = {
        headers: {
          "Access-Control-Allow-Origin": '*',
        }
      }

    // axios({
    //    method:"POST",
    //    url:'http://pages.igotnext.test/api/',
    //    headers:config,
    //    data:data
 
    // })
    //   .then(function (response) {
     
    //   })
    //   .catch(function (error) {
    //     console.log("received one error try again");
    //   });

    //   return false;
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
        options:['Show','Hide']
      },

    ]

    fields.map((field,index) =>{
        if(field.type === 'checkbox'){
         output.push( 
          <div className="select-holder">
          <select  key={index}>
             {field.options.map(option => {return <option>{option}</option>} )}
          </select>
          </div>
          )
        }
        else if (field.type === 'textarea'){
          output.push( 
              <textarea  key={index} resize='none' placeholder='content...'></textarea>
          )
        }
        else{
          let phrase = `enter ${field.name} ...`;
          let inputData = field.name !== "slug" ? <input key={index} type='text' name={field.name} placeholder={phrase} onChange={update}/> : <input key={index} type='text' name={field.name} placeholder="slug"  readOnly/>
          output.push( inputData )
        }

        return false;
    })
    output.push(<button onClick={update}>Create Page</button>)
    return <div className="inner-form">{output}</div>;
}


const createPage = ()=>{
  return (
    <div className='form-container' >
    <h1>Create Page</h1>
    <CreatePageForm/>
    
</div>
  )
}



export default createPage