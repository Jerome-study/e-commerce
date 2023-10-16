import { useParams, Navigate  } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
import { ProductSearchViewInfo } from "../component/ProductSearchViewInfo";

export const ProductSearchView = () => {
    const params = useParams();;
    const search = params.product;
    const { isActive } = useContext(AppContext);
    if (params.guest !== "guest") {
        return <Navigate to={`/productSearchViewGuest/guest/${search}`} />
    }


    return(
        <ProductSearchViewInfo search={search} isActive={isActive} />
    )
}