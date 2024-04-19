import { displayType } from "../Types/DataTypes"

export const LoginFormStructure = [

    {

      label: "Email",
      visibility: true,
      display: displayType.InputValue,
      placeholder: "email address",
      props:{
        id:"email",
        placeholder:"Email Address"
      },
      order:1

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
      order:2

    }
  

  ]