import { ReactNode} from "react"
import { DataSubmitContext } from "../contexts/DataSubmitContext"

import { HttpMethods } from "../types/DataTypes"



interface dataProviderType{
    children:ReactNode,
    httpMethod:HttpMethods
}

const DataSubmissionProvider: React.FC<dataProviderType> = (
    {children,httpMethod=HttpMethods.GET})=>{



    return (
        <DataSubmitContext.Provider value={{  }}>
             {children}
         </DataSubmitContext.Provider>
    )
}

export default DataSubmissionProvider     