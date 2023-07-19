import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoutes = ({key,path,component = null,isAuthenticated = false}) => {
    console.log("passing")
    console.log(path)
    console.log(isAuthenticated);
    return !isAuthenticated ?  <Route key={key} path="/login"component={component} exact/>: <Route key={key} path={path} component={component} exact/>;
}

export default ProtectedRoutes;