import React from "react";

const Loader = ({loadMessage = "loading...",display = false}) => {
    return display ?( 
    <>
        <div className="loading">Loading&#8230;</div>
        <p>{loadMessage}</p>
    </>

    ) : null
}

export default Loader;