import  { useState, ReactNode, useLayoutEffect, useEffect, useCallback } from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/Users/User";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../Types/DataTypes";



const UserObj = new User()
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ArtistDataType | MentorDataType | UserDataType | MenteeDataType | null>(null);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [refresh,] = useState(false)

    useLayoutEffect( ()=>{
        let found_user = localStorage.getItem('userInfo') // never
        if(found_user){
            setIsLoggedin(true)
            setUser(JSON.parse(found_user));
        }
 
 
    },[] )

    useEffect(() => {
        console.log(`updated`)
    },[refresh])

    const updateUser = useCallback((user: UserDataType | MentorDataType | ArtistDataType) => {
        console.log(`let us update`);
        setUser((currentUser) => ({
            ...currentUser,
            ...user
        }));
    }, []); // Assuming setUser doesn't need external dependencies
    
    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {

        let response;
        
        if (login && data) {
            response = await UserObj.login(data);
            if (response) {
                const user_data = {...response.data['data']}
                setUser(user_data as UserDataType); // Assuming response.data is the user data
                setIsLoggedin(true);
                return true;
            }
        } else {
            response = await UserObj.logout();
            if (response) {
                setUser(null); // Reset user state to default on logout
                setIsLoggedin(false);
                return true;
            }
        }

        return false; // Return false if login or logout fails
    };


    return (
        <UserContext.Provider value={{ user, isLoggedin, attemptLoginOrLogout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
