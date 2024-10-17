import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ErrorContext } from "../../contexts/ErrorContext";

const DetectChange = () => {
    let location = useLocation()
    let { updateError} = useContext(ErrorContext);
    useEffect(()=>{
      updateError('')
    },[location,updateError])
  
    return (
        <></>
    )
}



  export default DetectChange