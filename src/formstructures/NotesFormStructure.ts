import { displayType } from "../types/DataTypes"
export const NotesFormStructure = [
    {
      label: "subject",
      visibility: true,
      display: displayType.InputValue,

      props:{
        id:"subject",

      },
      order:1
    },
    {

      label: "message",
      visibility: true,
      display: displayType.TextValue,
      props:{
        id:"note",
        label:"message",
        variant:"filled"
      },
      order:2

    }

  ]