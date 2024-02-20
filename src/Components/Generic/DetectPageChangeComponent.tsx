import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ErrorContext } from "../../Contexts/ErrorContext";

const DetectChange = () => {
    let location = useLocation()
    let {error,updateError} = useContext(ErrorContext);
    useEffect(()=>{
      updateError('')
    },[location])
  
    return (
        <></>
    )
}



  export default DetectChange