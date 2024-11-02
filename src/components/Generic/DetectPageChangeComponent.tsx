import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ErrorContext } from "../../contexts/ErrorContext";

const toSeconds = (time:number) => time * 1000
const DetectChange = () => {
    let location = useLocation()
    let { updateError} = useContext(ErrorContext);
    useEffect(()=>{
      const timeout = setTimeout(()=>{
        updateError("")
      },toSeconds(10))
      console.log("location changed to: ",location.pathname)
      

      return () => clearTimeout(timeout)
    },[location,updateError])
  
    return (
        <></>
    )
}



  export default DetectChange