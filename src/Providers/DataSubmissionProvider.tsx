import { ReactNode} from "react"
import { DataSubmitContext } from "../Contexts/DataSubmitContext"

import { HttpMethods } from "../Types/DataTypes"



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