import {ReactNode } from "react"
const ContentContainer = (
    {children} : 
    {children:ReactNode}
    ) => {
        return(
            <div className="mainContainer" style={{padding:"2rem"}}>
                {children}
            </div>
        )
       
    }

    export default ContentContainer;
