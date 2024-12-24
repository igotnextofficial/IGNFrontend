import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
const Logout = () => {
    const navigate = useNavigate()
    const {attemptLoginOrLogout } =  useContext(UserContext)
    useEffect(() => {
        attemptLoginOrLogout(false).then(()=>{ 
            navigate("/");
        }).catch((e)=>{});
    }, [])
    return (
        <></>
    );
}

export default Logout;