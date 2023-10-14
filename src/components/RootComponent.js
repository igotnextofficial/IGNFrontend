import React from "react";
import { UserProvider } from "../Providers/UserProvider";


const RootComponent = ({children}) => {
    return (
        <UserProvider>
           { children }
        </UserProvider>
    )
}

export default RootComponent;