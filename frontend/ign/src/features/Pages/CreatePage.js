import {React} from 'react';
import {axios} from 'axios';

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

    fields.map(field =>{
        if(field.type === 'checkbox'){
         output.push( 
          <select>
             {field.options.map(option => {return <option>{option}</option>} )}
          </select>
          )
        }
        else if (field.type === 'textarea'){
          output.push( 
              <textarea resize='none' placeholder='content...'></textarea>
          )
        }
        else{
          let phrase = `enter ${field.name} ...`;
          output.push(
              <input type='text' name={field.name} placeholder={phrase}></input>
          )
        }
    })

    return <div>{output}</div>;
}

const createPage = ()=>{
  return (
    <div className='create-page-form'>
    <h1>Create Page</h1>
    <CreatePageForm/>
</div>
  )
}

export default createPage