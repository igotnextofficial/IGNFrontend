import { ArtistDataType, structureDataType } from "../../Types/DataTypes";
import Model from "../Model";
import { displayType } from "../../Types/DataTypes";
import { ArtistFake } from "../../fake-data/ArtistFake";

const musicGenres = [
  'Rock',
  'Pop',
  'Hip Hop',
  'Jazz',
  'Classical',
  'Electronic',
  'Country',
  'Blues',
  'Reggae',
  'Folk',
  'R&B',
  'Soul',
  'Metal',
  'Punk',
  'Funk',
  'Disco',
  'House',
  'Techno',
  'Trance',
  'Opera'
];


class Artist extends Model {
  structure: structureDataType[];
  constructor() {
    super()
    this.structure = [
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
  }

  data = ArtistFake


  getAll() {
    return this.data
  }

  get(): ArtistDataType {
    const currentUser = ArtistFake[0];
    return currentUser
  }

  show() {

  }





}

export default Artist;