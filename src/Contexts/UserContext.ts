import { createContext } from "react";
import User from "../Models/Users/User";


export interface userContextType{
    user: User,
    isLoggedin:boolean,
    attemptLoginOrLogout: () => void,
    test?: String

}
export const UserContext = createContext<userContextType>({
    isLoggedin:false,
    user: new User(),
    attemptLoginOrLogout: () => {},
});