import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = ({redirectPath="/login",isAuthenticated = false, children}) => {

   if(!isAuthenticated){
      return <Navigate to={redirectPath} replace />
   }
   return children ? children : <Outlet/>
}

export default ProtectedRoutes;