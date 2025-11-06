import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { Roles } from "../types/Roles";
import { useUser } from "../contexts/UserContext";
import LoadingComponent from "../components/common/LoadingComponent";
 

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
  const { isLoggedin, loading: authMutationLoading, loadingUser } = useUser();
  // const hasAccess = user?.role?.type && grantedAccess.includes(user.role.type as Roles);
  
  const isLoading = loadingUser || authMutationLoading;

  if (isLoading) {
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
