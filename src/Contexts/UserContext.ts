import { createContext, useContext } from "react";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../Types/DataTypes";


export interface userContextType{
    user: UserDataType | ArtistDataType | MentorDataType | MenteeDataType | null,
    isLoggedin:boolean,
    updateUser:(user:UserDataType)=>void
    attemptLoginOrLogout: (login:boolean,data?:httpDataObject,) => Promise<boolean>,
    accessToken?:string,
    getUserRole: () => string

}
export const UserContext = createContext<userContextType>({
    isLoggedin: false,
    user:  null,
    updateUser: () => {},
    attemptLoginOrLogout: async (): Promise<boolean> => {
        return false;
    },
    getUserRole: () => {
        return ""
    }
});

export const useUser = () => {
    const user = useContext(UserContext)
    if(!user){
        throw Error("user context needs to be wrapped in a provider.")
    }
    return user
}


