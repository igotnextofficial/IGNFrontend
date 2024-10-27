
export const Endpoints = {
    ARTICLES: process.env.REACT_APP_ARTICLES_API || "",
    USER: process.env.REACT_APP_USER_API_URI || "",
    AUTH: process.env.REACT_APP_AUTH_API || "",
    MENTEES: process.env.REACT_APP_MENTEES_API || "",
    MENTOR: process.env.REACT_APP_MENTOR_API || "",
    NOTES: process.env.REACT_APP_NOTES_API || "",
    SESSIONS: process.env.REACT_APP_SESSIONS_API || "",
    LOGIN: process.env.REACT_APP_LOGIN_API || "",
    LOGOUT: process.env.REACT_APP_LOGOUT_API || "",
    MEDIA: process.env.REACT_APP_MEDIA_API || "",
    REFRESH_TOKEN: process.env.REACT_AUTH_REFRESH_API_URL || ""
}


export const APP_ENDPOINTS = {
    USER: {
        BASE: Endpoints.USER,
        SINGLE: `${Endpoints.USER}/`,
        MENTOR: `${Endpoints.USER}/mentor`,
        MENTEE: `${Endpoints.USER}/mentee`,
        ARTIST: `${Endpoints.USER}/artist`,
        ADMIN: `${Endpoints.USER}/admin`,
        ALL: `${Endpoints.USER}/all`,
        LOGIN: `${Endpoints.USER}/login`,
        LOGOUT: `${Endpoints.USER}/logout`,
    },
    ARTICLES: {
        BASE: Endpoints.ARTICLES,
        ALL: `${Endpoints.ARTICLES}/all`,
        SINGLE: `${Endpoints.ARTICLES}`,
        USER: `${Endpoints.ARTICLES}/user`,
        DRAFTS: `${Endpoints.ARTICLES}/drafts`,
        FEATURED: `${Endpoints.ARTICLES}/category/featured`,
        CATEGORY: `${Endpoints.ARTICLES}/category`
    },
    MEDIA: {
        BASE: Endpoints.MEDIA,
        IMAGE: `${Endpoints.MEDIA}/upload/images`,
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