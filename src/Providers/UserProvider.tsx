import React,{useContext, useEffect, useState} from "react";
import { UserContext } from "../Contexts/UserContext";
import User from "../Models/users/User";
import { httpDataObject } from "../types/DataTypes";
import { ReactNode } from "react";
import { ErrorContext } from "../Contexts/ErrorContext";


export const UserProvider = ({children}:{children:ReactNode}) =>{
    const {updateError} = useContext(ErrorContext)
    const [user,setUser] = useState(new User())
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [attemptLogin,setAttemptLogin] = useState(false);
    const [attemptLogout,setAttemptLogout] = useState(false);
    const [ignore,setIgnore] = useState(true);
    const [userData,setUserData] = useState<httpDataObject | null>(null)
    useEffect(() =>{
        updateError("ooops...")
    },[])
    useEffect(()=>{
        const attemptToLoginUser = async (data:httpDataObject) => {
            const response = await user.login(data);
            if(response){
                setIsLoggedin(true)
            }
        }

        if(!ignore){
            if(userData){
                attemptToLoginUser(userData)
            }
       
        }


        return (()=>{
            setIgnore(true)
        })
    },[attemptLogin])

    useEffect(() => {
        const attemptToLogoutUser = async () => {
            const response = await user.logout();
            if(response){
                setIsLoggedin(false)
            }
        }

        if(!ignore){
            attemptToLogoutUser()
        }


        return (()=>{
            setIgnore(true)
        })
    },[attemptLogout])
    
    const attemptLoginOrLogout  = (login = false,data?:httpDataObject) => {
        let response = false
        if(login){
            if(data){
                setUserData(data);
            }
            setAttemptLogin(true)
        }
        else{
            setAttemptLogout(true)
        }
       
        setIgnore(false)
    }

    return (
    
        <UserContext.Provider value={{ user,isLoggedin,attemptLoginOrLogout }} >
            {children}
        </UserContext.Provider>

    )
}
