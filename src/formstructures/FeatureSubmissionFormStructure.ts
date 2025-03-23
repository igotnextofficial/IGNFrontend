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
        label: "Artist Name",
        visibility: true,
        display: displayType.InputValue,
        order: 3,
        props: {
            id: "artist_name",
            required: true,
            fullWidth: true,
            variant: "outlined",
            placeholder: "Enter your artist name or stage name"
        },
        validation: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        errorMessage: "Artist name is required and must be between 2-50 characters",
        ariaLabel: "Artist Name"
    },
    {
        label: "Artist Type",
        visibility: true,
        display: displayType.DropDown,
        order: 4,
        props: {
            id: "artist_type",
            required: true,
            fullWidth: true,
            variant: "outlined"
        },
        options: [
            "Musician",
            "Actor",
            "Dancer",
            "Visual Artist",
            "Writer",
            "Other"
        ],
        validation: {
            required: true
        },
        errorMessage: "Please select your artist type",
        ariaLabel: "Artist Type"
    },
    {
        label: "Genre",
        visibility: true,
        display: displayType.DropDown,
        order: 5,
        props: {
            id: "genre",
            required: true,
            fullWidth: true,
            variant: "outlined"
        },
        options: [
            "Hip Hop",
            "R&B",
            "Pop",
            "Rock",
            "Electronic",
            "Jazz",
            "Classical",
            "Theater",
            "Film",
            "Television",
            "Contemporary",
            "Ballet",
            "Visual Arts",
            "Literature",
            "Other"
        ],
        validation: {
            required: true
        },
        errorMessage: "Please select your genre",
        ariaLabel: "Genre"
    },
    {
        label: "Bio",
        visibility: true,
        display: displayType.TextValue,
        order: 6,
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
        order: 7,
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
        order: 8,
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