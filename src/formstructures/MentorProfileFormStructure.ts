import { displayType, FormField } from "../types/DataTypes"
import LocalStorage from "../storage/LocalStorage"

const local_storage = new LocalStorage();
const Specialties = local_storage.load("specialties") ?? []

export const MentorProfileFormStructure: FormField[] = [
    {
        label: "name",
        visibility: true,
        display: displayType.InputValue,
        order: 1,
        props: {
            id: "fullname",
            required: true,
            fullWidth: true,
            variant: "outlined"
        },
        validation: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        errorMessage: "Name is required and must be between 2-50 characters",
        ariaLabel: "Full Name"
    },
    {
        label: "image",
        visibility: false,
        display: displayType.Image,
        order: 2,
        props: {
            id: "image",
            accept: "image/*"
        },
        validation: {
            custom: (value) => {
                if (!value) return true; // Optional field
                return value instanceof File && value.type.startsWith('image/');
            }
        },
        errorMessage: "Please upload a valid image file"
    },
    {
        label: "specialties",
        visibility: true,
        display: displayType.MultiChoiceList,
        order: 3,
        props: {
            id: "specialties",
            required: true
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
            label: "bio",
            variant: "filled",
            multiline: true,
            rows: 4,
            fullWidth: true
        },
        validation: {
            maxLength: 500
        },
        errorMessage: "Bio must be less than 500 characters",
        ariaLabel: "Biography"
    }
]