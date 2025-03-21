import { displayType, FormField } from "../types/DataTypes"
import { Roles } from "../types/Roles"

export const RegisterMentorFormStructure: FormField[] = [
    {
        label: "fullname",
        visibility: true,
        display: displayType.InputValue,
        props: {
            id: "fullname",
            required: true
        },
        order: 1
    },
    {
        label: "username",
        visibility: true,
        display: displayType.InputValue,
        props: {
            id: "username",
            required: true
        },
        order: 2
    },
    {
        label: "Email",
        visibility: true,
        display: displayType.InputValue,
        props: {
            id: "email",
            placeholder: "Email Address",
            required: true,
            type: "email"
        },
        order: 3
    },
    {
        label: "password",
        visibility: true,
        display: displayType.InputValue,
        props: {
            id: "password",
            label: "password",
            variant: "filled",
            type: "password",
            required: true,
            helperText: "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji"
        },
        order: 4
    },
    {
        label: "Price",
        visibility: true,
        display: displayType.InputValue,
        props: {
            id: "price",
            label: "price",
            variant: "filled",
            type: "number",
            min: 0,
            max: 3000,
            placeholder: "price for (6 sessions) $0.00",
            helperText: "Choose a price for your mentorship package",
            required: true
        },
        order: 5
    }
]