import React,{useState,ReactNode} from "react";

import { UserContext } from "../Contexts/UserContext";

import User from "../Models/users/User";

import { httpDataObject } from "../types/DataTypes";

export const UserProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState(new User())
    const [isLoggedin,setIsLoggedin] = useState(false);
    
    const attemptLoginOrLogout  = async (login = false,data?:httpDataObject) => {
        const response = await (login && data ? user.login(data) : user.logout());

        if(response){
            if(login)(setIsLoggedin(true))
            return true;
        }
        else{
         
            return false
        }

    }

    return (
    
        <UserContext.Provider value={{ user,isLoggedin,attemptLoginOrLogout }} >
            {children}
        </UserContext.Provider>

    )
}
