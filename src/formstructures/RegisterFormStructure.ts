import { displayType, FormField } from "../types/DataTypes"
import { Roles } from "../types/Roles"

export const RegisterFormStructure: FormField[] = [
    {
        label: "fullname",
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
            variant: "outlined"
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
        label: "Email",
        visibility: true,
        display: displayType.InputValue,
        order: 3,
        props: {
            id: "email",
            required: true,
            fullWidth: true,
            variant: "outlined",
            type: "email",
            placeholder: "Email Address"
        },
        validation: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        errorMessage: "Please enter a valid email address",
        ariaLabel: "Email Address"
    },
    {
        label: "password",
        visibility: true,
        display: displayType.InputValue,
        order: 4,
        props: {
            id: "password",
            required: true,
            fullWidth: true,
            variant: "filled",
            type: "password",
            helperText: "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji"
        },
        validation: {
            required: true,
            minLength: 8,
            maxLength: 20,
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
        },
        errorMessage: "Password must be 8-20 characters and contain both letters and numbers",
        ariaLabel: "Password"
    }
]


/**
 *     {
        label: "role",
        visibility: true,
        display: displayType.DropDown,
        order: 5,
        props: {
            id: "role",
            required: true,
            fullWidth: true,
            variant: "filled",
            helperText: "Choose a role"
        },
        options: [Roles.MENTEE],
        validation: {
            required: true
        },
        errorMessage: "Please select a role",
        ariaLabel: "Role Selection"
    }
 */