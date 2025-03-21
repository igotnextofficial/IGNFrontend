import { FormField } from "../../types/DataTypes"
import { MentorFormStructure } from "../../formstructures/MentorFormStructure"
import { mentorsFake } from "../../fake-data/mentorsFake"
import Model from "../Model"

export class Mentor extends Model {
    structure: FormField[];
    data: any[];

    constructor() {
        super()
        this.structure = MentorFormStructure;
        this.data = mentorsFake;
    }

    getAll() {
        return this.data         
    }

    get(): any {
        return this.data[0]
    }

    show() {
        // Implementation
    }
}