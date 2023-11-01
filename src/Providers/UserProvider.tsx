import React,{useContext, useEffect, useState} from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/users/User";
import { httpDataObject } from "../types/DataTypes";
import { ReactNode } from "react";
import { ErrorContext } from "../Contexts/ErrorContext";


export const UserProvider = ({children}:{children:ReactNode}) =>{
    const [user,setUser] = useState(new User())
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [attemptLogin,setAttemptLogin] = useState(false);
    const [attemptLogout,setAttemptLogout] = useState(false);
    const [ignore,setIgnore] = useState(true);
    const [userData,setUserData] = useState<httpDataObject | null>(null)

    
    
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
