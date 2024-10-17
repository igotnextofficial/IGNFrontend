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

      label: "note",
      visibility: true,
      display: displayType.TextValue,
      props:{
        id:"note",
        label:"note",
        variant:"filled"
      },
      order:2

    }

  ]