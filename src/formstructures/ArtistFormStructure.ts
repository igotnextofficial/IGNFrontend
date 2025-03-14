import { displayType } from "../types/DataTypes"
// import LocalStorage from "../storage/LocalStorage"

let storage = localStorage.getItem("igotnextmagazine:com")
let musicGenres:string[] = [];

if(storage){
 let storage_data = JSON.parse(storage)
  
  if(storage && 'genres' in storage_data){
    musicGenres = storage_data.genres
  }
}

 
 
 
export const ArtistFormStructure = [
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
        label: "username",
        visibility: true,
        display: displayType.InputValue,

        props:{
          id:"username",
       
        },
        order:2
      },
      {

        label: "image",
        visibility: true,
        display: displayType.Image,
      
        props:{
          id:"image",
      
        },
        order:4

      },
      {

        label: "genre",
        visibility:true,
        display: displayType.ChoiceList,
        placeholder: "genre",
        props:{
          id:"fullname",
          placeholder:"fullname"
        },
        options: [...musicGenres],
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
        order:5

      }
]