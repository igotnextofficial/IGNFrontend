import  { useState, ReactNode,  useEffect, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import User from "../models/users/User";
import useFetch from "../customhooks/useFetch";
import { socket } from "../socket";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";
import LocalStorage from  "../storage/LocalStorage";
import axios from "axios";
import { APP_ENDPOINTS } from "../config/app";
 
import { Roles } from "../types/Roles";
import { Endpoints } from "../config/app";
import { Collections } from "@mui/icons-material";
 



// interface ApiErrorResponse extends Error {
//     response?: {
//         status: number;
//         data: {
//             message: string;
//         };
//     };
// }



     

// const isUserLoggedIn = async (user_id:string) => { 
//     try{
        
//         if(!accessToken){
//             throw new Error("No access token found");
//         }
         
//         const verification_url = process.env.REACT_AUTH_API_URL || "";
//          let response = await axios.get(verification_url,{
//                 headers:{
//                     'Authorization': `Bearer ${accessToken}`
//                 }
//          })
//             console.log(`the user is loggedin ${response.status} with data ${response.data} and access token ${accessToken} The url was ${verification_url}  ` )
//             return response.status === 200 ? true : false
//      }
//      catch(e ){

//             let refreshed = await refreshToken(user_id)
//             console.log(`refreshed token ${refreshed}`)
//             let valid = refreshed ? true : false
//             return valid


        
//      }

    
// }

// if(user && user.id){
    
//     isUserLoggedIn(user.id).then((response) =>{
//         setIsLoggedin(response)
//         if(!response){
//             if(accessToken){
//                 attemptLoginOrLogout(false)
//             }
//             else{
//                 new LocalStorage().remove(User.INFO)
//                 setIsLoggedin(false)
//                 setUser(null)
//             }
//         }

//     }).catch(() => {return false});

    /**
     * 
     * 
     * @returns - boolean representing whether the token was refreshed or not
     */

    const refreshToken = async (): Promise<Record<string,any> | null> => {
        try {
            const response = await axios.get(Endpoints.REFRESH_TOKEN, {withCredentials: true});
            if (response.status === 200) {
                return response.data['data'];
            }
        } catch (e) {
            console.error("Failed to refresh token:", e);
        }
        return null;
    };
 
const UserObj = new User()
 
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ArtistDataType | MentorDataType | UserDataType | MenteeDataType | null>(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const {fetchData} = useFetch();
    const [mentors, setMentorData] = useState<MentorDataType[] | null>([]);
    const [artists, setArtistData] = useState<ArtistDataType[] | null>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(isLoggedin && user && accessToken) {
            setLoading(false);
        }
    }, [isLoggedin, accessToken, user]);

    useEffect(() => {
        const loadInitialData = async () => {
            const mentorResponse = await getUsersData("mentors", APP_ENDPOINTS.USER.MENTOR.FEATURED);
            if(mentorResponse) {
                const data = mentorResponse.map((mentor: MentorDataType) => ({
                    ...mentor,
                    specialties: mentor.specialties.map((item: any) => item.name)
                }));
                setMentorData(data);
            }

            const artistResponse = await getUsersData("artists", APP_ENDPOINTS.USER.ARTIST.FEATURED);
            if(artistResponse) {
                setArtistData(artistResponse);
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        const verifySession = async () => {
            if(!accessToken && user) {
                const tokenData = await refreshToken();
                if(tokenData) {
                    setAccessToken(tokenData['access_token']);
                    setIsLoggedin(true);
                } else {
                    setIsLoggedin(false);
                    sessionStorage.removeItem('user');
                    setUser(null);
                }
            }
        };

        verifySession();
    }, [accessToken, user]);

    useEffect(() => {
        const loadUserSpecificData = async () => {
            if (!user || !isLoggedin || !accessToken) return;

            try {
                if (user.role.type === Roles.ARTIST) {
                    const response = await axios.get(
                        `${APP_ENDPOINTS.SESSIONS.BASE}/mentee/${user.id}`,
                        {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        }
                    );
                    updateUser({
                        ...user,
                        mentorSession: response?.data || []
                    });
                }

                if (user.role.type === Roles.MENTOR) {
                    const [availabilityResponse, sessionsResponse] = await Promise.all([
                        axios.get(`${APP_ENDPOINTS.SESSIONS.BASE}/${user.id}/availability`, {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        }),
                        axios.get(`${APP_ENDPOINTS.SESSIONS.MENTOR}/${user.id}`, {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        })
                    ]);

                    const mentees = user.mentees.map((mentee: UserDataType) => {
                        const session = sessionsResponse?.data?.find((s: any) => s.mentee_id === mentee.id);
                        if (session) {
                            return {
                                ...mentee,
                                id: session.id,
                                session_date: session.session_date,
                                mentorSession: session
                            };
                        }
                        return mentee;
                    });

                    updateUser({
                        ...user,
                        availability: availabilityResponse?.data?.availability || false,
                        specialties: user.specialties.map((specialty: Record<string,string>) => specialty.name),
                        mentees
                    });
                }
            } catch (error) {
                console.error('Error loading user specific data:', error);
            }
        };

        loadUserSpecificData();
    }, [isLoggedin, user, accessToken]);

    async function getUsersData(data_to_load: string, endpoint: string) {
        const local_storage = new LocalStorage();
        if(local_storage.hasItem(data_to_load)) {
            return local_storage.load(data_to_load);
        }

        const response = await fetchData(endpoint);
        return response?.data || null;
    }

    const loginUser = async (data: httpDataObject) => {
        try {
            if(!data) return false;
            const response = await axios.post(Endpoints.LOGIN, data, {withCredentials: true});
            if(!response) return false;

            const userData = response.data['data'];
            const accessToken = response.data['access_token'];
            
            setAccessToken(accessToken);
            setUser(userData as UserDataType);
            sessionStorage.setItem('user', JSON.stringify(userData));
            setIsLoggedin(true);

            return true;
        } catch(err) {
            return false;
        }
    };

    const LogoutUser = async () => {
        try {
            await UserObj.logout(accessToken);
            setIsLoggedin(false);
            setUser(null);
            setAccessToken("");
            sessionStorage.removeItem('user');
            socket.disconnect();
            return true;
        } catch(err) {
            return false;
        }
    };

    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {
        return login ? await loginUser(data!) : await LogoutUser();
    };

    const updateUser = useCallback((userData: UserDataType | MentorDataType | ArtistDataType) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const getUserRole = () => user?.role?.type || "";


    // const login = () => {
    //     updateUrl(Endpoints.LOGIN)
    // }

    // const logout = () => {
    //     updateUrl(Endpoints.LOGOUT)
    // }

    // const register = () => {}
    

    return (
        <UserContext.Provider value={{ user,mentors,artists, isLoggedin, attemptLoginOrLogout, updateUser,getUserRole,accessToken,loading }}>
            {children}
        </UserContext.Provider>
    );
};


 