import { useContext, useEffect, useState } from "react";
import { AppContext } from "../src/App";
import { instance } from "../src/App";
import { useFetch } from "../hooks/useFetch";
import { SearchSection } from "./HomeInfo";
import { useNavigate, Navigate } from "react-router-dom";
export const ProductInfo = (props) => {
    const navigate = useNavigate();
    const { isValid, userId, isActive } = useContext(AppContext);
    const { item } = props;
    const [inCart, setInCart]   = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchBar, setSearch] = useState(null);
    const [viewImage, setViewImage] = useState(false);
    const [image, setImage] = useState(null);
    const [searchDataInput, searchDataLoadingInput, searchDataErrorInput] = useFetch(import.meta.env.VITE_SEARCH_PRODUCT_API + searchBar);
    if (!item) {
        return <Navigate to={"/404"} />
    }

    const viewProduct = (product) => {
        if (!isValid) {
            navigate(`/productView/guest/${product.id}`, { state: product});
            return navigate(0);
            
        }
        navigate(`/productView/${userId}/${product.id}`, { state: product});
        navigate(0);
    };

    const viewSearchProduct = () => {
    
        if (!searchBar) {
            return console.log("NO ITEM");
        }
        
        if (!isValid) {
            return  navigate(`/productSearchViewGuest/guest/${searchBar}`);
        }
        
        navigate(`/productSearchViewUser/${userId}/${searchBar}`);
        navigate(0)
    };

    const refetch = () => {
        setLoading(true);
        let running = true;
         instance.post("/api/checkInCart", {item, userId}).then(response => {
            if (running) {
                setInCart(response.data.status);
                setLoading(false);
            }
         });
    }

    const addToCart = async () => {
        if (!isValid) {
            return alert("Please login first");
        }
        try {
            const response = await instance.post("/api/addToCart",  {item, userId});
            if (response.statusText == "OK") {
                return navigate(0);
            }
        } catch(error) {
            setError(error);
        }
    };

    const removeFromCart = async () => {
        if (!isValid) {
            return alert("Please login first");
        }
        try {
            const response = await instance.post("/api/removeFromCart",  {item, userId});
            if (response.statusText == "OK") {
                return navigate(0);
            }
        } catch(error) {
            setError(error);
        }
    };

    

    useEffect(() => {
        setLoading(true);
        let running = true;
         instance.post("/api/checkInCart", {item, userId}).then(response => {
            if (running) {
                setInCart(response.data.status);
                setLoading(false);
            }
         });

         return () => {
            running = false;
         }
    }, []);

    useEffect(() => {
        if (isActive) {
            setSearch(null)
        }
    }, [isActive])

    if (loading) {
        return <h1>Loading....</h1>
    }


    if (error) {
        return <h1>{error}</h1>
    }


    return(
        <>
            {viewImage? <div className="image-view" onClick={() => setViewImage(false)}>
                <img src= {image} style={{pointerEvents: viewImage? "none": null}} />
            </div>: null}
            <div className="container" style={{ position: "relative"}} onClick={() => setSearch(null)}>
            <SearchSection search={searchBar} searchDataLoading= {searchDataLoadingInput} searchData={searchDataInput} setSearch={setSearch} viewProduct={viewProduct} viewSearchProduct={viewSearchProduct}/>
            <div >
                <img src= {item?.thumbnail} />
                <div className="cart-buy-button">
                    <button className="green">Buy Now</button>
                    {inCart? <button className="blue" onClick={removeFromCart}>Remove in Cart</button>: <button className="blue" onClick={addToCart}>Add To Cart</button>}
                </div>
                
                <div>
                    <h1 className="product-stamp">Details</h1>
                    <div className="product-details">
                        <p>Product:</p>
                        <span>{item?.title}</span>
                    </div>
                    <div className="product-details">
                        <p>Description:</p>
                        <span >{item?.description}</span>
                    </div>
                    <div className="product-details">
                        <p>Stock:</p>
                        <span>{item?.stock}</span>
                    </div>
                    <div className="product-details">
                        <p>Price:</p>
                        <span>{item?.price}</span>
                    </div>
                </div>
                
                <div>
                    <h1 className="product-stamp">Gallery</h1>
                    <div className="product-images">
                    {item.images.map((image,index) => {
                        return <img onClick={() => {setImage(image),setViewImage(true)}} key={index} src= {image} />
                    })}
                </div>
                </div>

            </div>
        </div>
        </>
    )
}