import React, { useState, useEffect } from 'react';

import { TITLE, CONTENT } from './.settings.json'
import IgnRequest from '../Http/Request';
import Errors from '../Errors/display';
import '../../styles/form.css';


function CreatePage() {
  const [errors, setErrors] = useState([]);

  const [title, setTitle] = useState("");
  const [titleCounter, setTitleCounter] = useState(0);
  const [titleError, setTitleError] = useState({ message: TITLE.REQUIRED.value });

  const [slug, setSlug] = useState("");

  const [content, setContent] = useState("");
  const [contentCounter, setContentCounter] = useState(0);
  const [contentError, setContentError] = useState({ message: CONTENT.REQUIRED.value });

  const [display, setDisplay] = useState(false);

  const [readyToSubmit, setReadyToSubmit] = useState(false);

  let updateTitleAndSlug = (e) => {
    let errorMessage = isValidLength(e.target.value, TITLE);

    if (errorMessage !== titleError.message) { setTitleError({ message: errorMessage }) }

    let cleanValue = e.target.value.replace(/\s+/g, " ").trim()
    let slug = sluggify(cleanValue)

    setSlug(slug)
    setTitle(e.target.value)
    setTitleCounter(e.target.value.length)
  }

  useEffect(() => {
    return () => {
      processFormSubmission();
    }
  }, [titleError])

  useEffect(() => {
    return () => {
      titleRefocus()
    }
  }, [title])

  const titleRefocus = () => {
    document.getElementById('title').firstElementChild.focus();
  }

  const sluggify = (data) => {
    return data.replace(/\s+/g, " ").trim().replaceAll(" ", "-");
  }

  const updateContent = (e) => {
    e.preventDefault()
    let errorMessage = isValidLength(e.target.value, CONTENT);
    let content = e.target.value;
    let cleanContent = content.replace(/\s+/g, " ");

    setContentError({ message: errorMessage })
    setContent(cleanContent)
    setContentCounter(e.target.value.length)
  }

  useEffect(() => {
    return () => {
      contentRefocus();
    }
  }, [content])

  useEffect(() => {
    return () => {
      processFormSubmission();
      contentRefocus();
    }
  }, [contentError])

  const contentRefocus = () => {
    document.getElementById('description').focus()
    let content = document.getElementById('description');
    content.setSelectionRange(content.value.length, content.value.length)
    content = null;
  }


  const updateDisplay = (e) => {
    let displayPage = e.target.value.toLowerCase() !== "hide" ? true : false; // should be set to show
    setDisplay(displayPage);
  }

  useEffect(() => {
    if (!display) { return false }

    let displayElement = document.getElementById("display");
    let hideOption = displayElement.options[0];
    let showOption = displayElement.options[1];

    displayElement.value = showOption.value;
    hideOption.selected = false;
    showOption.selected = true;
  }, [display])


  const notReadyToSubmit = () => {
    if (readyToSubmit === false) { return; }
    setReadyToSubmit(false);
  }

  const ReadyToSubmit = () => {
    if (readyToSubmit === true) { return; }
    setReadyToSubmit(true);
  }

  const processFormSubmission = () => {
    if (titleError.message !== "" || contentError.message !== "") {
      notReadyToSubmit();
    }
    else {
      console.log(`title error message: ${titleError.message} and content error message: ${contentError.message}`)
      ReadyToSubmit();
    }
  }

  useEffect(() => {
    return () => {
      console.dir(errors)
      //  document.getElementById('title').first.value = data['title']
      //  document.getElementById('slug').value = data['slug']
      //  document.getElementById('description').value = data['description']
      //  document.getElementById("display").value = data['display']
    }
  }, [errors])

  useEffect(() => {
    return () => {
      contentRefocus()
    }
  }, [readyToSubmit])
  
  let addErrors = (message) => {
    setErrors(previousMessage => {
      return [...previousMessage, message]
    })
  }


  const updateData = async () => {
 

   if(!readyToSubmit){
     console.log("we are not ready to submit")
     return false
   }
   console.log("sending data to backend")
   
   let data={
    title:title,
    slug:slug,
    description:content,
    display:display
  };

   
    const configuration = {
        url:'http://pages.igotnext.test/api/',
        method:'POST',
        data:data,
        headers:{token:'fb7b888cbbbb7883393ffzvks'}
    };

    const R = new IgnRequest();
    R.init(configuration);
    let connect = await R.makeConnection();
    console.dir(R.getErrors)
    let h = Object.entries(R.getErrors).length > 0 ? setErrors(R.getErrors) : "";
    console.dir(connect)

    return connect;
    
  }






  const classBasedOnLength = (charLength, setting) => {
    let percentage = (parseFloat(charLength / setting.MAXIMUM.value) * 100);

    if (percentage > 70 && percentage < 100) {
      return "slow-down";
    }

    if (charLength <= setting.MAXIMUM.value && charLength >= setting.MINIMUM.value) {
      return "valid"
    }

    if (charLength > setting.MAXIMUM.value || charLength < setting.MINIMUM.value) {
      return "error";
    }






  }





  const isValidLength = (data, setting) => {
    let errorMessage = "";



    if (setting.REQUIRED.value) {

      if (data.length === 0) {
        errorMessage = setting.REQUIRED.errorMessage
      }
      else {
        if (errors.includes(setting.MINIMUM.errorMessage)) { return }
        if (data.length < setting.MINIMUM.value) {
          errorMessage = setting.MINIMUM.errorMessage
        }
      }

    }

    if (data.length > setting.MAXIMUM.value) {
      errorMessage = setting.MAXIMUM.errorMessage

    }
    return errorMessage;

  }

  const CreatePageForm = () => {

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
          options: ['Hide', 'Show']
        },

      ]

    fields.map((field, index) => {
      if (field.type === 'checkbox') {
        output.push(
          <div className="select-holder" key={index}>
            <label>Display page on site?</label>
            <select id="display" onChange={updateDisplay} key={index} value="help">

              {field.options.map(option => { return <option value={option} >{option}</option> })}
            </select>
          </div>
        )
      }
      else if (field.type === 'textarea') {
        output.push(
          <div id="content" className={classBasedOnLength(content.length, CONTENT)} key={index}>
            <textarea id="description" onChange={updateContent} key={index} resize='none' placeholder='content...' value={content} ></textarea>
            <p className="errors">{contentError.message}</p>
            <span className={titleCounter >= TITLE.MAXIMUM.value ? "error" : ""}> <p>{contentCounter} / {CONTENT.MAXIMUM.value}</p></span>
          </div>
        )
      }
      else {
        let phrase = `enter ${field.name} ...`;
        let inputData = field.name !== "slug" ?
          <div id="title" key={index} className={classBasedOnLength(title.length, TITLE)}>
            <input key={index} type='text' name={field.name} value={title} placeholder={phrase} onChange={updateTitleAndSlug} />
            <p > {titleError.message} </p>
            <span className={titleCounter >= TITLE.MAXIMUM.value ? "error" : ""}> <p>{titleCounter} / {TITLE.MAXIMUM.value} </p></span>
          </div> :
          <input id="slug" key={index} type='text' name={field.name} placeholder="slug" value={slug} readOnly />

        output.push(inputData)
      }

      return false;
    })

    output.push(<button className= {readyToSubmit !== false ? "buttonReady" : "buttonNotReady"} onClick={updateData} >Create Page</button>)
    return <div className="inner-form">{output}</div>;

  }

  return (

    <div className='form-container' >


      <Errors errors = {errors} />
      <h1>Create Page</h1>
      <CreatePageForm />


    </div>
  )
}



export default CreatePage