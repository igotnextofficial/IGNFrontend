import React,{useState,ReactNode} from "react";

import { UserContext } from "../Contexts/UserContext";

import User from "../Models/Users/User";

import { httpDataObject } from "../Types/DataTypes";

export const UserProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState(new User())
    const [isLoggedin,setIsLoggedin] = useState(false);
    
    const attemptLoginOrLogout  = async (login = false,data?:httpDataObject) => {
        const response = await (login && data ? user.login(data) : user.logout());
        if(response === null){return false}
            if( login ) {
                setUser(response.data)
                setIsLoggedin( true )
            }
            return true;
    }

    return (
    
        <UserContext.Provider value={{ user,isLoggedin,attemptLoginOrLogout }} >
            {children}
        </UserContext.Provider>

    )
}
