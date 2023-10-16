import { Navigate , Outlet} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
export const ProfileRedirect = () => {

   const { isValid, isLoading, userId } = useContext(AppContext);

   if (isLoading) {
    return <h1>Loading...</h1>
   }
   
   if (isValid) {
    return < Navigate to={`/profile/${userId}`} />
   }
   

}