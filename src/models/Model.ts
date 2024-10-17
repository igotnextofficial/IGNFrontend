import { displayType } from "../types/DataTypes"
interface structureDataType {
    label:string,
    visibility:boolean,
    display:displayType, // multiChoiceList,choiceList,string,text
    placeholder?:string
}
class Model {
    structure:structureDataType[]
    constructor(){
        this.structure = []
    }
}

export default Model