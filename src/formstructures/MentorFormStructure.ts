import { displayType, FormField } from "../types/DataTypes"
// import LocalStorage from "../storage/LocalStorage"

// const local_storage = new LocalStorage();
// const Specialties = local_storage.load("specialties") ?? []

let storage = localStorage.getItem("igotnextmagazine:com")
let Specialties: string[] = [];

if(storage) {
    let storage_data = JSON.parse(storage)
    if(storage && 'specialties' in storage_data) {
        Specialties = storage_data.specialties
    }
}

export const MentorFormStructure: FormField[] = [
    {
        label: "fullname",
        visibility: true,
        display: displayType.InputValue,
        order: 1,
        props: {
            id: "fullname",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Enter your full name"
        },
        validation: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        errorMessage: "Full name is required and must be between 2-50 characters",
        ariaLabel: "Full Name"
    },
    {
        label: "image",
        visibility: true,
        display: displayType.Image,
        order: 2,
        props: {
            id: "image",
            accept: "image/*",
            required: true
        },
        validation: {
            required: true,
            custom: (value) => {
                if (!value) return true; // Optional field
                return value instanceof File && value.type.startsWith('image/');
            }
        },
        errorMessage: "Please upload a valid image file",
        ariaLabel: "Profile Image"
    },
    {
        label: "specialties",
        visibility: true,
        display: displayType.MultiChoiceList,
        order: 3,
        props: {
            id: "specialties",
            required: true,
            fullWidth: true,
            variant: "outlined"
        },
        options: [...Specialties],
        validation: {
            required: true,
            custom: (value) => value.split(',').length > 0
        },
        errorMessage: "Please select at least one specialty",
        ariaLabel: "Specialties"
    },
    {
        label: "bio",
        visibility: true,
        display: displayType.TextValue,
        order: 4,
        props: {
            id: "bio",
            required: true,
            fullWidth: true,
            variant: "filled",
            multiline: true,
            rows: 4,
            placeholder: "Tell us about yourself"
        },
        validation: {
            required: true,
            minLength: 50,
            maxLength: 500
        },
        errorMessage: "Bio is required and must be between 50-500 characters",
        ariaLabel: "Biography"
    }
]