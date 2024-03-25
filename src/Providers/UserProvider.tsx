import React, { useState, ReactNode, useLayoutEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/Users/User";
import { ArtistDataType, MentorDataType, UserDataType, httpDataObject } from "../Types/DataTypes";
import Artist from "../Models/Users/Artist";
import Mentor from "../Models/Users/Mentor";

const tempUser = [new Artist(),new Mentor()];
const currentTempId = 1
const UserObj = new User()
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ArtistDataType | MentorDataType | UserDataType | null>(null);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

    // useLayoutEffect( ()=>{
    //     setIsLoggedin(true)
    //     setUser(tempUser[currentTempId].get());
    // },[] )

    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {
        let response;
        
        if (login && data) {
            response = await UserObj.login(data);
            if (response) {
                setUser(tempUser[currentTempId].get()); // Assuming response.data is the user data
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
        <UserContext.Provider value={{ user, isLoggedin, attemptLoginOrLogout }}>
            {children}
        </UserContext.Provider>
    );
};
