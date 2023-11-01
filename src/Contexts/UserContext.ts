import { createContext } from "react";
import User from "../Models/users/User";


export interface userContextType{
    user: User,
    isLoggedin:boolean,
    attemptLoginOrLogout: () => void,

}
export const UserContext = createContext<userContextType>({
    isLoggedin:false,
    user: new User(),
    attemptLoginOrLogout: () => {},
});