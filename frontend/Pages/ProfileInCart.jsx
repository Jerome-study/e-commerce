import { useContext } from "react";
import { AppContext } from "../src/App";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useInstance } from "../hooks/useInstance";
export const ProfileInCart = () => {
    const  params  = useParams();
    const { isValid, userId } = useContext(AppContext);
    const [ data, error, loading ] = useInstance("/api/inCart");
    const navigate = useNavigate();


    const viewProduct = (product) => {
        
        if (!isValid) {
            return navigate(`/productView/guest/${product.id}`, { state: product});
        }
        navigate(`/productView/${userId}/${product.id}`, { state: product});
    }

    
    if (params.id !== userId) {
        return <Navigate to={`/inCart/${userId}`} />
    };

    if (loading) {
        return <h1>Loading...</h1>
    };

    const cart = data.result;

    if (!cart.length > 0) {
        return <div className="container">
            <h1 className="cart-title">My Cart</h1>
            <h1>No item In Cart</h1>
        </div>
    }
    
    return(
        <div className="container">
            <div>
                <h1 className="cart-title">My Cart</h1>
                {cart.map( (item, index) => {
                    return (
                        <div key={index} className="cart-item" onClick={() => viewProduct(item)}> 
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};