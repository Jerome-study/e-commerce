import { useParams, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
import { ProductSearchViewInfo } from "../component/ProductSearchViewInfo";
export const ProductSearchViewUser = () => {
    const params = useParams();
    const search = params.product
    const { userId, isActive } = useContext(AppContext);
    if (params.id !== userId) {
        return <Navigate to={`/productSearchViewUser/${userId}/${search}`} />
    }

    
    return(
        <ProductSearchViewInfo search={search} isActive={isActive}/>
        
    )
}