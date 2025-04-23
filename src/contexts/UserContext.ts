import { createContext, useContext } from "react";
import { ArtistDataType, MenteeDataType, MentorDataType, UserDataType, httpDataObject } from "../types/DataTypes";


export interface userContextType{
    user: UserDataType | ArtistDataType | MentorDataType | MenteeDataType | null,
    mentors: MentorDataType[] | null  ,
    artists: ArtistDataType[] | null ,
    isLoggedin:boolean,
    updateUser:(user:UserDataType)=>void
    attemptLoginOrLogout: (login:boolean,data?:httpDataObject,) => Promise<boolean>,
    registerUser: (data:httpDataObject) => Promise<boolean>,
    accessToken?:string,
    loading?:boolean
    getUserRole: () => string

}
export const UserContext = createContext<userContextType>({
    isLoggedin: false,
    user:  null,
    mentors: null,
    artists: null,
    loading:true,
    updateUser: () => {},
    attemptLoginOrLogout: async (): Promise<boolean> => {
        return false;
    },
    registerUser: async (): Promise<boolean> => {
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


