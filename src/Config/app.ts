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
    PAYMENT: process.env.REACT_APP_PAYMENT_API || "",
    PAYMENT_BASE: process.env.REACT_APP_BASE_PAYMENT_API|| "",
    HOME: process.env.REACT_APP_HOME_URL || "",
   VIDEO_LINK: process.env.REACT_APP_GENERATE_MEETING_LINK_API || "",
   GOALS: process.env.REACT_APP_GOALS_API || "",
   SCHEDULE: process.env.REACT_APP_SCHEDULE_API || "",
   CATEGORIES: process.env.REACT_APP_CATEGORIES_API || "",
   TAGS: process.env.REACT_APP_TAGS_API || "",
   FEATURE_SUBMISSIONS: process.env.REACT_APP_FEATURE_SUBMISSIONS || "",
   
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
        VIDEO_LINK: `${Endpoints.VIDEO_LINK}/meeting`,
        GENERATE_ZOOM_LINK: `${Endpoints.SESSIONS}/generate-zoom-link/:session_id`,
        CATEGORIES: `${Endpoints.CATEGORIES}`,
        TAGS: `${Endpoints.TAGS}`,
        CATEGORY_TAGS: `${Endpoints.CATEGORIES}/tags`,
        CATEGORY_TAGS_BY_ID: `${Endpoints.TAGS}/category/:id`,
        FEATURE_SUBMISSIONS: Endpoints.FEATURE_SUBMISSIONS

    },

    USER: {
        BASE: Endpoints.USER,
      
        SINGLE: `${Endpoints.USER}`,
        MENTORS: `${Endpoints.USER}/role/mentor`,
        ADMIN: `${Endpoints.USER}/admin`,
        ALL: `${Endpoints.USER}/all`,
        BATCH: `${Endpoints.USER}/batch`,
        LOGIN:  Endpoints.LOGIN,
        LOGOUT:  Endpoints.LOGOUT,
        CHANGE_PASSWORD: `${Endpoints.USER}/password/update`,
        ARTIST: {
            BASE:`${Endpoints.USER}/role/artist`,
            FEATURED: `${Endpoints.USER}/role/artist/featured`,
        },
        MENTEE: {
            BASE:`${Endpoints.USER}/role/mentee`,
            FEATURED: `${Endpoints.USER}/role/mentee/featured`,
        },
        MENTOR: { 
            BASE:`${Endpoints.USER}/role/mentor`,
            FEATURED: `${Endpoints.USER}/role/mentor/featured`,
            ONBOARDING_COMPLETION:`${Endpoints.PAYMENT}/onboarding/success/:user_id`
          }
    },
   
    ARTICLES: {
        BASE: Endpoints.ARTICLES,
        CREATE: Endpoints.ARTICLES,
        UPDATE: `${Endpoints.ARTICLES}/:id`,
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
    GOALS:{
        BASE: Endpoints.GOALS,
        SINGLE: `${Endpoints.GOALS}`,
        MENTOR: `${Endpoints.GOALS}/mentor`,
        MENTEE: `${Endpoints.GOALS}/mentee`,
        MENTOR_GOALS: `${Endpoints.GOALS}/mentor`,
        MENTEE_GOALS: `${Endpoints.GOALS}/mentee`,
    },
    PRODUCTS: {
        BASE: Endpoints.PRODUCTS,
        ALL: `${Endpoints.PRODUCTS}/all`,
        SINGLE: `${Endpoints.PRODUCTS}`,
        USER: `${Endpoints.PRODUCTS}/user`,
        DRAFTS: `${Endpoints.PRODUCTS}/drafts`,
        FEATURED: `${Endpoints.PRODUCTS}/category/featured`,
        CATEGORY: `${Endpoints.PRODUCTS}/category`,
        STRIPE_ONBOARDING: `${Endpoints.PRODUCTS}/onboarding/:user_id`,
        STRIPE_ONBOARDING_SUCCESS: `${Endpoints.PRODUCTS}/onboarding/success/:user_id`,
        GENERATE_STRIPE_LINK: `${Endpoints.PRODUCTS}/stripe-account-link`,
        WITH_STRIPE_ACCOUNT: `${Endpoints.PRODUCTS}/user/:user_id`
    },
    PAYMENT: {
        BASE:Endpoints.PAYMENT,
        PAY:`${Endpoints.PAYMENT}`,
        CREATE_INTENT:`${Endpoints.PAYMENT}/create-payment-intent`,
        UPDATE_PRODUCT_PAYMENT_STATUS:`${Endpoints.PAYMENT_BASE}/product-payments/sessions/:id`,
        RETRIEVE_PRODUCT_PAYMENT:`${Endpoints.PAYMENT_BASE}/product-payments/sessions/in-progress/:userId`        
    },
    SCHEDULE: {
        BASE: Endpoints.SCHEDULE,
        CREATE: `${Endpoints.SCHEDULE}/schedule`,
    }

}
export const validEndpoints = [
  ...Object.values(APP_ENDPOINTS.USER),
]