import { useContext } from "react";
import { AppContext } from "../src/App";
import { ProductInfo } from "../component/ProductInfo";
import { useParams, useLocation, Navigate } from "react-router-dom";
export const ProductViewUser = () => {
    const params = useParams();
    const { state } = useLocation();
    const { isLoading, isValid, userId } = useContext(AppContext);
   
    if (params.id !== userId) {
        <Navigate to ={"/404"} />
    }

    
    return(
        <>
            < ProductInfo item={state}/>
        </>
        
    )
}