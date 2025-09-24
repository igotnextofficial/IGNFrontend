import React, { useEffect,useState  } from 'react';
import { AnnouncementType, AdvertisementVariantType } from '../../types/DataTypes';
import LocalStorage from '../../storage/LocalStorage';
import SessionStorage from '../../storage/SessionStorage';
import { useUser } from '../../contexts/UserContext';
import dayjs from 'dayjs';
 
 
import {useAnnouncements,ANNOUNCEMENTS} from '../../providers/AnnouncementsProvider'
import ModalDisplay from './ModalDisplay';

    const localStorage = new LocalStorage();
    const sessionStorage = new SessionStorage();
const getElegibleAnnouncements = (announcements: AnnouncementType[], role:string) => {
    return announcements.filter(ann => {
        const allowedRoles = ['user', 'broadcast', 'mentor', 'mentee', 'writers', 'admin' ];
        const user_role = (role).toString();
        return allowedRoles.includes(user_role) && ann.audience.roles.includes(user_role as any);
    });
}
const BannerDisplay = ({announcement}: {announcement:AnnouncementType[]} ) => {
    const {user,loading} = useUser();
    const [role,setRole] = useState<string>('');
    const [dismissedBanners, setDismissedBanners] = useState<boolean>(false);
    useEffect(() => {
    setDismissedBanners(!!sessionStorage.load('banners.v1'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // persist when it changes
    useEffect(() => {
    if (dismissedBanners) sessionStorage.save('banners.v1', '1');
    else sessionStorage.remove('banners.v1'); // optional: clear when false
    }, [dismissedBanners]);

 
    useEffect(() => {
        if(!loading && !user){ setRole('broadcast')}

        if(!loading && user){
            setRole(user.role.type);
        }
    },[user])

    useEffect(() => {
    if(announcement.length === 0) return;
        const elegibleAnnouncements = getElegibleAnnouncements(announcement, role);
    },[role] );

    return <></>
}

 

const InlineDisplay =  ({announcement}: {announcement:AnnouncementType[]} ) => {
    return <></>
}

 interface validSlots {
    banner: AnnouncementType[];
    modal: AnnouncementType[];
    inline: AnnouncementType[];
}

const AnnouncementDisplay = () => {
    const { user,loading } = useUser();
    const [slots, setSlots] = useState<validSlots | null>(null);
    const {announcements : ctxAnnouncements, isLoading } = useAnnouncements();
    const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
    useEffect(() => {
        if(!isLoading && !ctxAnnouncements){return }
        console.log(`announcements`)
        console.log(ctxAnnouncements)
        const announcement_data:AnnouncementType[] = ctxAnnouncements.announcements;
     
        const active_announcements = announcement_data.filter(announcement => {
            const now = dayjs();
            const start = dayjs(announcement.publishAt);
            const expiration = dayjs(announcement.expireAt);
            return now.isAfter(start) && now.isBefore(expiration) && announcement.status === 'active';
        });

        setAnnouncements(active_announcements);
      
    }, [isLoading,ctxAnnouncements]);

    useEffect(() => {
        if(announcements.length === 0 || loading) return;
 
        const allslots:validSlots  = {
            banner: [] as AnnouncementType[], 
            modal: []  as AnnouncementType[], 
            inline: []  as AnnouncementType[]
        };  
        // Filter announcements based on user attributes
        announcements.forEach(announcement => {
        announcement.variants.forEach(variant => {
            const data = allslots[variant.slot as keyof validSlots];
            if (data) { data.push(announcement); }
        });
        });
        setSlots(allslots);
        
    },[announcements])
  return (

    <>

     <BannerDisplay announcement={slots?.banner as AnnouncementType[]  || []} />
        <ModalDisplay announcement={slots?.modal  as AnnouncementType[] || []} />
        <InlineDisplay announcement={slots?.inline  as AnnouncementType[] ||[] }/>
    </>
  )
}

export default AnnouncementDisplay;

 