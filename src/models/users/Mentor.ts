import { MentorDataType, MenteeDataType,structureDataType } from "../../Types/DataTypes";
import IgnRequest from "../../Features/Http/IgnRequest";
import Model from "../Model";
import { mentorsFake } from "../../fake-data/mentorsFake";
import { MentorFormStructure } from "../../FormStructures/MentorFormStructure";



class Mentor extends Model {
 
    structure: structureDataType[];
    data: MentorDataType[]
    constructor(){
      super()
      this.structure = MentorFormStructure;
      this.data = mentorsFake;
    }

    getAll (){
        return this.data         
    }

    get():MentorDataType {
      return this.data[0]
    }

    show(){
     
    }


  


}

export default Mentor;