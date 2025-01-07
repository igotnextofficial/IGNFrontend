import { displayType } from "../types/DataTypes"
// import LocalStorage from "../storage/LocalStorage"

// const local_storage = new LocalStorage();
// const Specialties = local_storage.load("specialties") ?? []

let storage = localStorage.getItem("igotnextmagazine:com")
let Specialties:string[] = [];

if(storage){
 let storage_data = JSON.parse(storage)
  console.log(storage_data)
  if(storage && 'specialties' in storage_data){
    Specialties = storage_data.specialties
  }
}


export const MentorFormStructure = [
    {
      label: "fullname",
      visibility: true,
      display: displayType.InputValue,

      props:{
        id:"fullname",

      },
      order:1
    },

    {

      label: "image",
      visibility: true,
      display: displayType.Image,
      placeholder: "",
      props:{
        id:"image",
        placeholder:"image"
      },
      order:2

    },
    {

      label: "specialties",
      visibility:true,
      display: displayType.MultiChoiceList,
      placeholder: "specialties",
      props:{
        id:"specialties",
        placeholder:"specialties"
      },
      options: [...Specialties],
      order:3
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
      order:4

    }

  ]