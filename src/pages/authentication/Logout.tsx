import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
const Logout = () => {

    const {attemptLoginOrLogout } =  useContext(UserContext)
    useEffect(() => {
        attemptLoginOrLogout(false)
    }, [])
    return (
        <></>
    );
}

export default Logout;