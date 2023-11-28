import React, { useState, ReactNode, useLayoutEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/Users/User";
import { httpDataObject } from "../Types/DataTypes";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(new User());
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

    useLayoutEffect( ()=>{
        setIsLoggedin(user.isLoggedin())
    } )
    const attemptLoginOrLogout = async (login: boolean, data?: httpDataObject): Promise<boolean> => {
        let response;

        if (login && data) {
            response = await user.login(data);
            if (response) {
                new User()
                setUser(new User()); // Assuming response.data is the user data
                setIsLoggedin(true);
                return true;
            }
        } else {
            response = await user.logout();
            if (response) {
                setUser(new User()); // Reset user state to default on logout
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
