import { Navigate , Outlet} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
export const Protected = () => {

   const { isValid, isLoading } = useContext(AppContext);

   if (isLoading) {
    return <h1>Loading...</h1>
   }
   
   return (isValid? <Outlet />: <Navigate to="/login" />)
   

}