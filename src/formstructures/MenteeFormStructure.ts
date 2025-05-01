import { displayType, FormField } from "../types/DataTypes"
// import LocalStorage from "../storage/LocalStorage"

let storage = localStorage.getItem("igotnextmagazine:com")
let musicGenres: string[] = [];

if(storage) {
    let storage_data = JSON.parse(storage)
    if(storage && 'genres' in storage_data) {
        musicGenres = storage_data.genres
    }
}

export const MenteeFormStructure: FormField[] = [
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
        label: "username",
        visibility: true,
        display: displayType.InputValue,
        order: 2,
        props: {
            id: "username",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Choose a username"
        },
        validation: {
            required: true,
            minLength: 3,
            maxLength: 30,
            pattern: /^[a-zA-Z0-9_]+$/
        },
        errorMessage: "Username must be 3-30 characters and can only contain letters, numbers, and underscores",
        ariaLabel: "Username"
    },
    {
        label: "image",
        visibility: true,
        display: displayType.Image,
        order: 4,
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
        label: "genre",
        visibility: true,
        display: displayType.ChoiceList,
        order: 3,
        props: {
            id: "genre",
            required: true,
            fullWidth: true,
            variant: "outlined"
        },
        options: [...musicGenres],
        validation: {
            required: true
        },
        errorMessage: "Please select a genre",
        ariaLabel: "Music Genre"
    },
    {
        label: "bio",
        visibility: true,
        display: displayType.TextValue,
        order: 5,
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