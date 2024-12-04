import { displayType } from "../types/DataTypes"
import { Roles } from "../types/Roles"
export const RegisterMentorFormStructure = [
    {
      label: "fullname",
      visibility: true,
      display: displayType.InputValue,

      props:{
        id:"fullname"
     },
      order:1
    },
    {
        label: "username",
        visibility: true,
        display: displayType.InputValue,
  
        props:{
          id:"username",
       },
        order:2
      },
    {

      label: "Email",
      visibility: true,
      display: displayType.InputValue,
      placeholder: "email address",
      props:{
        id:"email",
        placeholder:"Email Address"
      },
      order:3

    },
  
    {

      label: "password",
      visibility: true,
      display: displayType.InputValue,
      props:{
        id:"password",
        label:"password",
        variant:"filled",
        type:"password",
        helperText:"Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji"
      },
      order:4

    },

    {

        label: "Price",
        visibility: true,
        display: displayType.InputValue,
        props:{
          id:"price",
          label:"price",
          variant:"filled",
          type:"number",
          min:0,
          max:3000,
          placeholder:"price for (6 sessions) $0.00",
          helperText:" Choose a role",
         
        },
        order:5
  
      }
  

  ]