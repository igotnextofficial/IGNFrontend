import {createContext, useContext,useEffect,useState} from "react";
import { AnnouncementType,AnnouncementStorageType } from "../types/DataTypes";
import useHttp from "../customhooks/useHttp";
import LocalStorage from "../storage/LocalStorage";

const test_data:AnnouncementType = {
    id: "1",
    title: "Welcome to the Announcement System",
    body: "This is a test announcement to demonstrate the functionality of the AnnouncementsProvider.",
    imageUrl: "/images/ads/amina_pankey.JPEG",
    audience: {
        roles: ["broadcast"],
        tags: []
    },
    variants: [
   
        {
            slot: "modal",
            title: "New Mentor Alert: Amina Pankey",
            body: "We are excited to announce Amina Buddafly as a mentor on I Got Next! Get 1:1 guidance on songwriting, vocals, and building your artist brand. Limited slots this week.",
            priority: 1,
            cta: { label: 'Book with amina' , url: 'https://igotnextmagazine.com/profile/mentor/5c5cf8dc-8813-4afa-97f6-7415f26054e1' }
        }
    ],
   
    expireAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week later
    publishAt: new Date(),
    created_by: "system",
    status: "active",
    dismissible: true
  

}
const defaultAnnouncements:AnnouncementStorageType = {announcements:[],seen:[]}
export const ANNOUNCEMENTS = "announcements.v1";

const localStorage = new LocalStorage();
export interface AnnouncementsContextType{
    isLoading: boolean;
    refresh: () => void;
    announcements: AnnouncementStorageType;
    error: Error | null;
    clearAnnouncements: () => void;
    getAnnouncementById: (id:string) => any | null;
    markAnnouncementAsRead: (id:string) => void;
    markAllAsRead: () => void;
}
const AnnouncementsContext = createContext({
    isLoading: true,
    refresh: () => {},
    announcements: defaultAnnouncements ,
    error: null,
    clearAnnouncements: () => {},
    getAnnouncementById: (id:string) => null,
    markAnnouncementAsRead: (id:string) => {},
    markAllAsRead: () => {}
} as AnnouncementsContextType);     
 



export const useAnnouncements = () => {
    const context = useContext(AnnouncementsContext)  ;
    if(!context){
        throw Error("Announcements context needs to be wrapped in a provider.")
    }
    return context
}
export {AnnouncementsContext};




export const AnnouncementsProvider = ({children}:{children:React.ReactNode}) => {
    const [announcements,setAnnouncements] =  useState<AnnouncementStorageType>(defaultAnnouncements);
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [error,setError] = useState<Error | null>(null);

    useEffect(() => {
        // Fetch announcements from an API or local storage
        // For now, we'll simulate with a timeout
        setIsLoading(true);
        setTimeout(() => {
            // Simulate fetching data
            saveAnnouncements(test_data)
            setIsLoading(false);
        }, 1000);
    }, []);

 

    const refresh = () => {}
    const clearAnnouncements = () => {}
    const getAnnouncementById = (id:string) => { return null }

    const markAnnouncementAsRead = (id:string) => { 
        const current_announcements =  getAnnouncements();
        const announcement = current_announcements.announcements.find((announcement:AnnouncementType) => announcement.id === id); // check for existence
        if (!announcement) {return}
        
      
        const viewed_announcements = Array.from(new Set([...current_announcements.seen, id]))
        const updatated_announcements = current_announcements.announcements.filter((ann:AnnouncementType) => ann.id !== id);
         current_announcements.announcements = updatated_announcements;
         current_announcements.seen = viewed_announcements;
         localStorage.save(ANNOUNCEMENTS,current_announcements)

    }

    const addAnnouncement = (announcement:AnnouncementType) =>{
        const current_announcements = localStorage.hasItem(ANNOUNCEMENTS) ? localStorage.load(ANNOUNCEMENTS) : [];

        const combine_data = [...current_announcements.announcements,announcement ] 
    }

    
    const getAnnouncements = () => {
        return localStorage.hasItem(ANNOUNCEMENTS) ? localStorage.load(ANNOUNCEMENTS) : {announcements:[],seen:[]}
    }

    const saveAnnouncements = (data:AnnouncementType,seen:string[] = []) => {
        if(!data){return }
        const current_announcements = getAnnouncements();
            console.log(`saving announcements`)
            console.log(current_announcements)
        if(!current_announcements){return }
        if(current_announcements.seen.includes(data.id)){return}
        const old_announcements = current_announcements.announcements.filter((ann:AnnouncementType) => { return ann.id !== data.id});
 
       const updated_announcements = [...old_announcements,data];
       const all_seen = Array.from(new Set([...current_announcements.seen,...seen]));
       const ann_data = {announcements:updated_announcements ,seen: all_seen};
       localStorage.save(ANNOUNCEMENTS,ann_data);
       setAnnouncements(ann_data)
    }

    

    const markAllAsRead = () => {
        const announcements = localStorage.load(ANNOUNCEMENTS);
        if(!Array.isArray(announcements)){return}
        announcements.forEach(announcement => {
            markAnnouncementAsRead(announcement.id)
        })
    }  
    return (
        <AnnouncementsContext.Provider value={{
            isLoading,
            refresh,
            error,
            clearAnnouncements,
            getAnnouncementById,
            markAnnouncementAsRead,
            markAllAsRead,
            announcements
            } }>
            {children}
        </AnnouncementsContext.Provider>
    )
}

