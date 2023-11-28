import { createContext } from "react";
import User from "../Models/Users/User";
import { httpDataObject } from "../Types/DataTypes";


export interface userContextType{
    user: User,
    isLoggedin:boolean,
    attemptLoginOrLogout: (login:boolean,data?:httpDataObject,) => Promise<boolean>,

}
export const UserContext = createContext<userContextType>({
    isLoggedin: false,
    user: new User(),
    attemptLoginOrLogout: async (): Promise<boolean> => {
        return false;
    },
});
