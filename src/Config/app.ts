import App from "../App"
import CategoriesComponent from "../Components/Article/CategoriesComponent"


export const Endpoints = {
    ARTICLES: process.env.REACT_APP_ARTICLES_API || "",
    AUTH: process.env.REACT_APP_AUTH_API || "",
    MENTEES: process.env.REACT_APP_MENTEES_API || "",
    MENTOR: process.env.REACT_APP_MENTOR_API || "",
    NOTES: process.env.REACT_APP_NOTES_API || "",
    SESSIONS: process.env.REACT_APP_SESSIONS_API || "",
    LOGIN: process.env.REACT_APP_LOGIN_API || "",
    LOGOUT: process.env.REACT_APP_LOGOUT_API || "",
    REFRESH_TOKEN: process.env.REACT_AUTH_REFRESH_API_URL || "https://shield.igotnext.local/api/token-refresh"
}


export const APP_ENDPOINTS = {
    ARTICLES: {
        BASE: Endpoints.ARTICLES,
        ALL: `${Endpoints.ARTICLES}/all`,
        SINGLE: `${Endpoints.ARTICLES}`,
        USER: `${Endpoints.ARTICLES}/user`,
        DRAFTS: `${Endpoints.ARTICLES}/drafts`,
        FEATURED: `${Endpoints.ARTICLES}/category/featured`,
        CATEGORY: `${Endpoints.ARTICLES}/category`
    }
}
export const validEndpoints = [
    Endpoints.ARTICLES,
    Endpoints.AUTH,
    Endpoints.MENTEES,
    Endpoints.MENTOR,
    Endpoints.NOTES,
    Endpoints.SESSIONS,
    Endpoints.REFRESH_TOKEN
]