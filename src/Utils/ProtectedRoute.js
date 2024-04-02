import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Authentication/Login";

const ProtectedRoutes = ({redirectPath="/login",isAuthenticated = false, children}) => {

   if(!isAuthenticated){
      return <Navigate to={redirectPath} replace />
   }
   return children ? children : <Outlet/>
}

export default ProtectedRoutes;