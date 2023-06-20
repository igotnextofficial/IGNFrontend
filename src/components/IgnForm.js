import React from "react";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';

const IgnForm = ({ formProperties }) => {




  const RenderFields = () => {
    const [formData,setFormData] = useState(formProperties.defaults);

  const handleChange = (event => {
    const {name,value} = event.target;
        setFormData((previousFormData) => {
            return { 
                ...previousFormData,
                [name]:value
            }
        })

  });
    useEffect(() => {
     
    },[formData])
    
    return Object.values(formProperties.fields)
      .sort((a, b) => a.order - b.order)
      .map(field => {
   
        if (field.props.type === 'text' || field.props.type === 'password') {
          return <TextField key={field.props.name} {...field.props} onChange={handleChange} value={formData[field.props.name]}  />;
        }
        if(field.props.type === 'checkbox'){
           return  <FormControlLabel
            control={<Checkbox color ='primary' />}
            {...field.props}
          
        />
        }
        return null; // Return null if the field type is not supported
      });
  }

  return (
    <>
      <RenderFields />
    </>
  );
}

export default IgnForm;
