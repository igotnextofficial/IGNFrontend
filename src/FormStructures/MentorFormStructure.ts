import { displayType } from "../Types/DataTypes"
export const MentorFormStructure = [
    {
      label: "name",
      visibility: true,
      display: displayType.InputValue,

      props:{
        id:"fullname",

      },
      order:1
    },

    {

      label: "image",
      visibility: false,
      display: displayType.InputValue,
      placeholder: "",
      props:{
        id:"image",
        placeholder:"image"
      },
      order:2

    },
  
    {

      label: "bio",
      visibility: true,
      display: displayType.TextValue,
      props:{
        id:"bio",
        label:"bio",
        variant:"filled"
      },
      order:3

    }

  ]