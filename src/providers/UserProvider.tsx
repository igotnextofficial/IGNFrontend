import  { useState, ReactNode, useRef, useEffect, useCallback } from "react";
import { UserContext } from "../contexts/UserContext";
import User from "../models/users/User";
import { socket } from "../socket";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";
import LocalStorage from  "../storage/LocalStorage";
import axios from "axios";
// import { useHttpRequest } from "../Contexts/HttpRequestContext";

import { Endpoints } from "../config/app";


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
     * @param user_id - user id to be refreshed
     * @returns - boolean representing whether the token was refreshed or not
     */
    const refreshToken = async (user_id: string,role:string): Promise<string> => {
        let controller = new AbortController()
        let signal = controller.signal
        try {
            let url = Endpoints.REFRESH_TOKEN;
            console.log(`hitting endpoint url ${url} with user id ${user_id}`);
            let response = await axios.post(url, { "data": { user_id,role } , signal});
    
            if (response.status === 200) {
                let new_token = response.data['data']['access_token'];
                console.log(`refreshed token ${new_token}`);
                // setAccessToken(new_token);
          
                return new_token;
            }
        } catch (e) {
            console.error("Failed to refresh token:", e);
        }
        return ""
    };

const UserObj = new User()
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const intialLoad = useRef(true);
    const [user, setUser] = useState<ArtistDataType | MentorDataType | UserDataType | MenteeDataType | null>(null);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    // const {updateUrl} = useHttpRequest("")
   
    
    useEffect(() => { 
        
        const attemptRefreshToken = ( async ( user_information:Record<string,string>) => {
            return await refreshToken(user_information.id,user_information.role)
        })


        if(!accessToken && !user){
            if(new LocalStorage().hasItem(User.INFO)){
                let found_user = JSON.parse(new LocalStorage().load(User.INFO));
                setUser(found_user)
                setIsLoggedin(true)
                
                if(intialLoad.current !== false){
                    const user_information = {
                        id: found_user.id,
                        role: found_user.role
                    }
                    attemptRefreshToken(user_information).then((response) => {
                    
                        if(!response){
                        //    console.log(`this is when user should be logged out page load intial ${intialLoad.current}`);  
                            setUser(null);
                            setIsLoggedin(false);
                            setAccessToken("");
                            new LocalStorage().remove(User.INFO);
    
    
                        }
                        else{
                            setAccessToken(response)
                            console.log(`this is when user should be logged in page load intial ${intialLoad.current}`);
                        }
                    }).catch((e) => {
                        console.error(`error -  failed refreshing token ${e}`)
                    }).finally(() => {
                        intialLoad.current = false
                    })
                    
     
                }
                } 
        } 

        return () => {

        }
     } ,[accessToken, user ])


        
    /**
     * 
     * @param login - boolean representing whether to login or logout 
     * @param data - data to be sent to the server for login
     * @returns 
     */
    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {

        let response;
        console.log(`attempting login or logout ${login} with data ${data}`);
        if (login && data) {
            response = await UserObj.login(data); // state set in local storage
            console.log(`response from login ${response}`);
            if (response) {
                const user_data = {...response.data['data']}
      
                const access_token =  response.data['access_token']
                console.log(`the access token is ${access_token}`)
                setAccessToken(access_token);
                setUser(user_data as UserDataType); // Assuming response.data is the user data
                setIsLoggedin(true);
          
                return true;
            }
        } else {
            response = await UserObj.logout(accessToken); // state removed from local storage
            if (response) {
                setUser(null); // Reset user state to default on logout
                setIsLoggedin(false);
                setAccessToken("");
                socket.disconnect()
                return true;
            }
        }

        return false; // Return false if login or logout fails
    };
    
    /**  
     ========================================================================
        Before the component mounts, check if the user is logged in
        If the user is logged in, check if the token is still valid
        If the token is not valid, logout the user
        If the token is valid, refresh the token
        new access token set within refreshToken function
     ========================================================================
    */

     /**
     useEffect(() => {
        const found_user = new LocalStorage().load(User.INFO);
        let user_data = found_user ? JSON.parse(found_user) : null;
        console.log(`do we have access token ${accessToken}`);
        (async () => {
            if (user_data && user_data.id) {
                let response = await refreshToken(user_data.id);
                if (!response) {

                    console.log(`no user log out dp we have access token ${accessToken}`);
                    // logout the user if the token is not refreshed
                    setAccessToken("");
                    setUser(null);
                    new LocalStorage().remove(User.INFO);
                    setIsLoggedin(false);
                } else {
                    setUser(user_data);
                    setIsLoggedin(true);
                }
            }
        })();
    }, []); // Moved from useLayoutEffect to useEffect
    
 */
    /**
     * 
     * ========================================================================
     * If the user is logged in, check if the token is still valid
     * If the token is not valid, logout the user
     * If the token is valid, refresh the token
     * new access token set within refreshToken function
     * ========================================================================
     */

    /*
    useEffect(() => {
        let isMounted = true;
        let persistent_user_data_exists = new LocalStorage().hasItem(User.INFO);
    
        const checkForRefreshToken = async () => {
            let found_user = JSON.parse(new LocalStorage().load(User.INFO));
            let successful_token_refresh = await refreshToken(found_user.id);
    
            if (!isMounted) {
                return;
            }
            if (successful_token_refresh) {
                setUser(found_user);
                setIsLoggedin(true);
            } else {
                console.log(`no user log out has access token ${accessToken}`);
                setAccessToken("");
                setUser(null);
                new LocalStorage().remove(User.INFO);
                setIsLoggedin(false);
            }
            
        };
    
        if (persistent_user_data_exists && !user && !accessToken) {
            checkForRefreshToken();
        }
    
        return () => {
            isMounted = false;
        };
    }, []); 
    
    */
    /**
       ========================================================================
       If the user is logged in, refresh the token every 15 minutes 
       ========================================================================
     */

    //    useEffect(() => {
    //     let refreshEveryFifteenMinutes: NodeJS.Timeout;
        
    //     if (isLoggedin && user?.id) {
    //         refreshEveryFifteenMinutes = setInterval(async () => {
    //             let response = await refreshToken(user.id);
    //             console.log(`called refresh token on user ${user.id} with response ${response}`);
    
    //             if (!response) {
    //                 attemptLoginOrLogout(false); // logout the user if the token is not refreshed
    //             }
    //         }, 1000 * 60 * 15);
    //     }
    
    //     return () => clearInterval(refreshEveryFifteenMinutes);
    // }, [isLoggedin, user?.id]);
    
    


    /**
     * 
     * @param user - user data to be updated
     */ 
    const updateUser = useCallback((user: UserDataType | MentorDataType | ArtistDataType) => {
        const local_storage = new LocalStorage()
        local_storage.save(User.INFO,user)
        setUser((currentUser) => ({
            ...currentUser,
            ...user
        }));
    }, []); // Assuming setUser doesn't need external dependencies
    


    

 

    const getUserRole = () => {
        if (user) {
            return user.role.type;
        }
        return "";
    }


    // const login = () => {
    //     updateUrl(Endpoints.LOGIN)
    // }

    // const logout = () => {
    //     updateUrl(Endpoints.LOGOUT)
    // }

    // const register = () => {}
    

    return (
        <UserContext.Provider value={{ user, isLoggedin, attemptLoginOrLogout, updateUser,getUserRole,accessToken }}>
            {children}
        </UserContext.Provider>
    );
};