import { ErrorContext } from "../Contexts/ErrorContext"
import { ReactNode,useState } from "react"
const ErrorProvider = ({children} : {children:ReactNode}) => {

    const [errorMessage,setErrorMessage] = useState("");

    const updateError = (error = "") => {
        setErrorMessage(error)
    }
    



    return(
    <ErrorContext.Provider value={{error:errorMessage,updateError:updateError}}>
       {children}
    </ErrorContext.Provider>
    )
}



export default ErrorProvider