import React, { useState }  from 'react';
import IgnRequest from '../Http/Request';
const CreatePageForm = () =>{
 const [title,setTitle] = useState("");
 const [slug,setSlug] = useState("");
 const [description,setDescription] = useState("");
 const [display,setDisplay] = useState(false);
 const handleSubmit = (e)=>{
     e.preventDefault();
     let form_data = {
         "title":title,
         "slug":slug,
         "description":description,
         "display":display
     }

     let config = {
        url: window.location.protocol + "//" + window.location.hostname + ":8000/api",
        method:"POST",
        data:form_data,
        headers:""
      }
      
      config.data = form_data;
     const ign_request = new IgnRequest();
     let update = ign_request.init(config);
     update.then(res =>{
         console.dir(res)
         console.dir(ign_request.responseData)
     })
     
 }
 const sluggify = (data) => {
    return data.replace(/\s+/g, " ").trim().replaceAll(" ", "-");
  }
 const updateTitleWithSlug = (e)=>{
    setTitle(e.target.value);
    setSlug(sluggify(e.target.value));
 }
 return (
     <div className='form-container'>
  <form onSubmit={ e => {handleSubmit(e)}}>
      <div>
      <input name='title' type = "text" onChange={e=>updateTitleWithSlug(e)} value={title} />

      <input name='slug' type = "text"  value={slug} readOnly />
      </div>
      <div>
      <textarea value={description} onChange={e=>{setDescription(e.target.value)}}></textarea>
      </div>
      <div>
          <label>Make page visible</label>
      <input type="checkbox" checked={display} onChange={e=>{setDisplay(e.target.checked)}} />
    </div>
    <div>
      <input type="submit" value="create page" />
      </div>
  </form>
  </div>
 )
}

export default CreatePageForm;