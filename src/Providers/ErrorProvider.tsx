import { ErrorContext } from "../contexts/ErrorContext"
import { ReactNode,useEffect,useState } from "react"
const ErrorProvider = ({children} : {children:ReactNode}) => {

    const [errorMessage,setErrorMessage] = useState("");

    const updateError = (error = "") => {
        console.log("error message updated to ",error)
        setErrorMessage(error)
    }





    return(
    <ErrorContext.Provider value={{error:errorMessage,updateError:updateError}}>
       {children}
    </ErrorContext.Provider>
    )
}



export default ErrorProvider