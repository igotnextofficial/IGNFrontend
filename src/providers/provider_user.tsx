// import  { useState, ReactNode,  useEffect, useCallback } from "react";
// import { UserContext } from "../contexts/UserContext";
// import User from "../models/users/User";
// import useFetch from "../customhooks/useFetch";
// import { socket } from "../socket";
// import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";
// import LocalStorage from  "../storage/LocalStorage";
// import axios from "axios";
// import { APP_ENDPOINTS } from "../config/app";
// import useLogger from "../customhooks/UseLogger";
 

// import { Endpoints } from "../config/app";
// import { error } from "console";
 
 
 

//     /**
//      * 
//      * @param user_id - user id to be refreshed
//      * @returns - boolean representing whether the token was refreshed or not
//      */
//     const refreshToken = async (user_id: string,role:string): Promise<string> => {
 
//         try {
//             let url = Endpoints.REFRESH_TOKEN;
//             // console.log(`hitting endpoint url ${url} with user id ${user_id}`);
//             let response = await axios.post(url, { "data": { user_id,role }  });
    
//             if (response.status === 200) {
//                 let new_token = response.data['data']['access_token'];
//                 // console.log(`refreshed token ${new_token}`);
//                 // setAccessToken(new_token);
          
//                 return new_token;
//             }
//         } catch (e) {
                
//             // console.error("Failed to refresh token:", e);
//         }
//         return ""
//     };
 
// const UserObj = new User()
 
// export const UserProvider = ({ children }: { children: ReactNode }) => {
 
//     const [user, setUser] = useState<ArtistDataType | MentorDataType | UserDataType | MenteeDataType | null>(null);
//     const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
//     const [accessToken, setAccessToken] = useState<string>("");
//     const [mentors, setMentorData] = useState<MentorDataType[] | null>([]);
//     const [artists, setArtistData] = useState<ArtistDataType[] | null>([]);
//     const [loading,setLoading] = useState(true);
//     const {logError} = useLogger();
   
//     useEffect(() => { 
//       const attemptRefreshToken = async () => {
//         try {
//           const response = await axios.post(Endpoints.REFRESH_TOKEN,{},  {withCredentials: true});
//            if(!response || !response.data){
//              throw new Error("No Valid Refresh token response.")
//            }
//            return response.data;
//         }
//         catch(err){
//             return null;
//         }
//       }

//       const refreshTokenIfNeeded = async () =>{
//         if(!user || !accessToken){
//           try{
//             const data = await attemptRefreshToken();
//             if(!data){throw new Error("no data returned")};
//             setUser(data.user) 
//             setAccessToken(data.accessToken) 
//           }
//           catch(err){
//             // logging error
//           }
//         }
//       }

//       refreshTokenIfNeeded();
//     },[]);
 
//      const loginUser = async (data: httpDataObject) => {
//         if(!data){ return false}
//         let response = await UserObj.login(data);
//         if(!response){return false}

//         const user_data = {...response.data['data']};
//         const access_token =  response.data['access_token'];
//         document.cookie=`userId=${user_data['id']}; secure`
//         setAccessToken(access_token);
//         setUser(user_data as UserDataType);
//         setIsLoggedin(true);

//         return true;
        
//      }

//      const LogoutUser = async () => {
//         let response = await UserObj.logout(accessToken);
//         if(response){
//             localStorage.removeItem(User.INFO);
//             setUser(null);
//             setIsLoggedin(false);
//             setAccessToken("");
//             socket.disconnect()
//             return true;
//         }
//         return false;
//      }
//     /**
//      * 
//      * @param login - boolean representing whether to login or logout 
//      * @param data - data to be sent to the server for login
//      * @returns 
//      */
//     const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {

//         let response;
//         let successful = false;
//         if (login && data) {
//             response = await loginUser(data);
//             successful = response;
//         } else {
//             response = await LogoutUser();
//             successful = response; 
//         }

//         return successful;  
//     };
    
//     const getUserRole = () => {
//         return user?.role.type || "";
//     }
    
//     return (
//         <UserContext.Provider value={{ user,mentors,artists, isLoggedin, attemptLoginOrLogout, updateUser,getUserRole,accessToken,loading }}>
//             {children}
//         </UserContext.Provider>
//     );
// };


