export const Endpoints = {
    ARTICLES: process.env.REACT_APP_ARTICLES_API || "",
    USER: process.env.REACT_APP_USER_API_URI || "",
    AUTH: process.env.REACT_APP_AUTH_API || "",
    MENTEES: process.env.REACT_APP_MENTEES_API || "",
    MENTOR: process.env.REACT_APP_MENTOR_API || "",
    NOTES: process.env.REACT_APP_NOTES_API || "",
    SESSIONS: process.env.REACT_APP_SESSION_API || "",
    LOGIN: process.env.REACT_APP_LOGIN_API || "",
    LOGOUT: process.env.REACT_APP_LOGOUT_API || "",
    MEDIA: process.env.REACT_APP_MEDIA_API || "",
    REFRESH_TOKEN: process.env.REACT_APP_AUTH_REFRESH_API_URL || "",
    PRODUCTS: process.env.REACT_APP_PRODUCT_API || "",
    SPECIALTIES: process.env.REACT_APP_SPECIALTIES_API || "",
    GENRE: process.env.REACT_APP_GENRE_API || "",
}



export const HealthChecksEndpoints = {
    ARTICLES: process.env.REACT_APP_ARTICLES_API  ?? "",
    USER: process.env.REACT_APP_USER_API_URI ?? "",
    AUTH: process.env.REACT_APP_AUTH_API ?? "",
    MENTEES: process.env.REACT_APP_MENTEES_API ?? "",
    MENTOR: process.env.REACT_APP_MENTOR_API ?? "",
    NOTES: process.env.REACT_APP_NOTES_API ?? "",
    SESSIONS: process.env.REACT_APP_SESSION_API ?? "",
    MEDIA: ` ${Endpoints.MEDIA.slice(0,Endpoints.MEDIA.lastIndexOf('/'))}` ,
    PRODUCTS:  Endpoints.PRODUCTS.slice(0,Endpoints.PRODUCTS.lastIndexOf('/')),
    SPECIALTIES: process.env.REACT_APP_SPECIALTIES_API ?? "",
    GENRE: process.env.REACT_APP_GENRE_API ?? "",
}

export const APP_ENDPOINTS = {
    GENERIC:{
        SPECIALTIES: Endpoints.SPECIALTIES,
        GENRE: Endpoints.GENRE,
    },
    USER: {
        BASE: Endpoints.USER,
      
        SINGLE: `${Endpoints.USER}`,
        MENTORS: `${Endpoints.USER}/role/mentor`,
        MENTEE: `${Endpoints.USER}/mentee`,
        ADMIN: `${Endpoints.USER}/admin`,
        ALL: `${Endpoints.USER}/all`,
        BATCH: `${Endpoints.USER}/batch`,
        LOGIN: `${Endpoints.USER}/login`,
        LOGOUT: `${Endpoints.USER}/logout`,
        ARTIST: {
            BASE:`${Endpoints.USER}/role/artist}`,
            FEATURED: `${Endpoints.USER}/role/artist/featured`,
        },
        MENTOR: { 
            BASE:`${Endpoints.USER}/role/mentor}`,
            FEATURED: `${Endpoints.USER}/role/mentor/featured`,
          }
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
    },
    SESSIONS: {
        BASE: Endpoints.SESSIONS,
        MENTEE: `${Endpoints.SESSIONS}/mentee`,
        MENTOR: `${Endpoints.SESSIONS}/mentor`,
        MENTOR_SESSIONS: `${Endpoints.SESSIONS}/mentor/sessions`,
        MENTEE_SESSIONS: `${Endpoints.SESSIONS}/mentee/sessions`,
    },
    // /api/mentors/9e5a4e35-4491-408e-935c-558edf0af202/availability/open
    NOTES: {
        BASE: Endpoints.NOTES,
        CREATE: Endpoints.NOTES,
        NOTESFORUSER: `${Endpoints.NOTES}`, // /:recipient/:sender|:recipient
        MENTOR: `${Endpoints.NOTES}/mentor`,
        
    },
    PRODUCTS: {
        BASE: Endpoints.PRODUCTS,
        ALL: `${Endpoints.PRODUCTS}/all`,
        SINGLE: `${Endpoints.PRODUCTS}`,
        USER: `${Endpoints.PRODUCTS}/user`,
        DRAFTS: `${Endpoints.PRODUCTS}/drafts`,
        FEATURED: `${Endpoints.PRODUCTS}/category/featured`,
        CATEGORY: `${Endpoints.PRODUCTS}/category`
    }

}
export const validEndpoints = [
  ...Object.values(APP_ENDPOINTS.USER),
]