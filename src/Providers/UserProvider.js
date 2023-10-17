import React,{useState} from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/users/User";


export const UserProvider = ({children}) =>{
    const  initialize_user = new User();


    return (
    
        <UserContext.Provider value={initialize_user} >
            {children}
        </UserContext.Provider>

    )
}
