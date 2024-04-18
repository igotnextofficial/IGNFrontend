import { displayType } from "../Types/DataTypes"
import { Roles } from "../Types/Roles"
export const RegisterFormStructure = [
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

        label: "role",
        visibility: true,
        display: displayType.DropDown,
        props:{
          id:"role",
          label:"role",
          variant:"filled",
          type:"role",
          helperText:" Choose a role",
         
        },
        options:[Roles.ARTIST,Roles.SUBSCRIBER,Roles.DEFAULT],
        order:5
  
      }
  

  ]