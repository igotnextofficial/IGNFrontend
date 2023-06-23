import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({key,path,component = null,isAuthenticated = false}) => {
    console.log("passing")
    console.log(path)
    console.log(isAuthenticated);
    return !isAuthenticated ?  <Redirect to="/login" /> : <Route key={key} path={path} component={component} exact/>;
}

export default ProtectedRoutes;