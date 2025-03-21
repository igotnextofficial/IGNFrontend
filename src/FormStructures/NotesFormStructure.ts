import { displayType, FormField } from "../types/DataTypes"

export const NotesFormStructure: FormField[] = [
    {
        label: "subject",
        visibility: true,
        display: displayType.InputValue,
        order: 1,
        props: {
            id: "subject",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Enter subject"
        },
        validation: {
            required: true,
            minLength: 3,
            maxLength: 100
        },
        errorMessage: "Subject is required and must be between 3-100 characters",
        ariaLabel: "Note Subject"
    },
    {
        label: "message",
        visibility: true,
        display: displayType.TextValue,
        order: 2,
        props: {
            id: "note",
            required: true,
            fullWidth: true,
            variant: "filled",
            multiline: true,
            rows: 4,
            placeholder: "Enter your message"
        },
        validation: {
            required: true,
            minLength: 10,
            maxLength: 1000
        },
        errorMessage: "Message is required and must be between 10-1000 characters",
        ariaLabel: "Note Message"
    }
]