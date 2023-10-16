import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
import { ProductInfo } from "../component/ProductInfo";

export const ProductView = () => {
    const { isLoading, isValid, userId } = useContext(AppContext);
    const { state } = useLocation();
    
    

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (isValid) {
        return <Navigate to={`/productView/${userId}/${state.product.id}`}  />
    }

    return(
        < ProductInfo item={state}/>
    )
}