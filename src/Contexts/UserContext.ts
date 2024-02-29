import { createContext } from "react";
import User from "../Models/Users/User";
import { ArtistDataType, MentorDataType, UserDataType, httpDataObject } from "../Types/DataTypes";


export interface userContextType{
    user: UserDataType | ArtistDataType | MentorDataType | null,
    isLoggedin:boolean,
    attemptLoginOrLogout: (login:boolean,data?:httpDataObject,) => Promise<boolean>,

}
export const UserContext = createContext<userContextType>({
    isLoggedin: false,
    user:  null,
    attemptLoginOrLogout: async (): Promise<boolean> => {
        return false;
    },
});
