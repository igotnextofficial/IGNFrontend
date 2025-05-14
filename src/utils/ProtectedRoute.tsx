import { Navigate, Outlet } from "react-router-dom";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Roles } from "../types/Roles";
import { useUser } from "../contexts/UserContext";
import LoadingComponent from "../components/common/LoadingComponent";
import { ArticleContext } from "../contexts/ArticleContext";
 

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
  const {user, isLoggedin, loading: userLoading} = useUser();
  // const hasAccess = user?.role?.type && grantedAccess.includes(user.role.type as Roles);
  
  // Check if there's an ArticleContext available
  const articleContext = useContext(ArticleContext);
  
  // Show loading component only when userLoading is true
  if (userLoading) {
    return <LoadingComponent />;
  }
 
  if (!isLoggedin) {
    return <Navigate to={redirectPath} replace />;
  }
 
  // console.log(`User Role: ${user?.role.type}
  //   Who can access: ${grantedAccess}
  //   Can access: ${hasAccess}
  //   `)

  // if ( !hasAccess) {
  //   return <Navigate to="/" replace />;
  // }

  return children || <Outlet />;
};

export default ProtectedRoutes;
