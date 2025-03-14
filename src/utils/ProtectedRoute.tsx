import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useState } from "react";
import { Roles } from "../types/Roles";
import { X } from "@mui/icons-material";
import { useEffect,useContext, useLayoutEffect } from "react";
import { useUser } from "../contexts/UserContext";
 

const defaultAccess = Array.from(Object.values(Roles));
 
interface ProtectedRoutesProps {
   redirectPath?: string;
   isAuthenticated?: boolean;
   grantedAccess?: Roles[];
   children?: ReactNode;  
 }
 
 const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
   redirectPath = "/login",
   isAuthenticated = false,
   grantedAccess = [...defaultAccess],
   children
 }) => {
 
 
   if(!isAuthenticated){
      return <Navigate to={redirectPath} replace />
   }
 
   return children ? children : <Outlet/>
}

export default ProtectedRoutes;
