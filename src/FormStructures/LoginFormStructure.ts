import { displayType, FormField } from "../types/DataTypes"

export const LoginFormStructure: FormField[] = [
    {
        label: "Email",
        visibility: true,
        display: displayType.InputValue,
        order: 1,
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
        order: 2,
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