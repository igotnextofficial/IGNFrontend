import { displayType, FormField } from "../types/DataTypes"

export const FeatureSubmissionFormStructure: FormField[] = [
    {
        label: "Full Name",
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
        label: "Email",
        visibility: true,
        display: displayType.InputValue,
        order: 2,
        props: {
            id: "email",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Enter your email address",
            type: "email"
        },
        validation: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        errorMessage: "Please enter a valid email address",
        ariaLabel: "Email"
    },
    {
        label: "Bio",
        visibility: true,
        display: displayType.TextValue,
        order: 3,
        props: {
            id: "bio",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Tell us about yourself and your work"
        },
        validation: {
            required: true,
            minLength: 50,
            maxLength: 500
        },
        errorMessage: "Bio is required and must be between 50-500 characters",
        ariaLabel: "Bio"
    },
    {
        label: "Social Media Links",
        visibility: true,
        display: displayType.TextValue,
        order: 4,
        props: {
            id: "social_media",
            required: false,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Share your social media links (Instagram, Twitter, etc.)"
        },
        helperText: "Optional: Include your social media handles or links",
        ariaLabel: "Social Media Links"
    },
    {
        label: "Portfolio Links",
        visibility: true,
        display: displayType.TextValue,
        order: 5,
        props: {
            id: "portfolio_links",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Share links to your work (SoundCloud, Spotify, IMDB, portfolio website, etc.)"
        },
        validation: {
            required: true
        },
        errorMessage: "Please share at least one link to your work",
        helperText: "Include links to your music, acting reels, portfolio, or other relevant work",
        ariaLabel: "Portfolio Links"
    }
]; 