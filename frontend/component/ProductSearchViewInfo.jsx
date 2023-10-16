import { useFetch } from "../hooks/useFetch";
import { useContext,useEffect,useState } from "react";
import { AppContext } from "../src/App";
import { useNavigate } from "react-router-dom";
import { SearchSection } from "./HomeInfo";
export const ProductSearchViewInfo = (props) => {
    const { search, isActive } = props;
    const [searchData, searchDataLoading] = useFetch(import.meta.env.VITE_SEARCH_PRODUCT_API + search);
    const [searchBar, setSearch] = useState(null);
    const [searchDataInput, searchDataLoadingInput, error] = useFetch(import.meta.env.VITE_SEARCH_PRODUCT_API + searchBar);
    const { isValid, userId } = useContext(AppContext);
    const navigate = useNavigate();
    
    

    const viewProduct = (product) => {
        if (!isValid) {
            return navigate(`/productView/guest/${product.id}`, { state: product});
        }
        navigate(`/productView/${userId}/${product.id}`, { state: product});
    }

    const viewSearchProduct = () => {
        setSearch(null)
        if (!searchBar) {
            return console.log("NO ITEM");
        }
        
        if (!isValid) {
            return  navigate(`/productSearchViewGuest/guest/${searchBar}`);
        }
        
        navigate(`/productSearchViewUser/${userId}/${searchBar}`);
        navigate(0)
    };


    useEffect(() => {
        if (isActive) {
            setSearch(null)
        }
    }, [isActive ])

  
    if (error) {
        return <h1>{error}</h1>
    }

    if (searchDataLoading) {
        return <h1>Loading..</h1>
    }

    if (searchData == null) {
        return <h1>Loading....</h1>
    }
   

    return(
       <div className="container" onClick={() =>setSearch(null)}>
        <SearchSection search={searchBar} searchDataLoading= {searchDataLoadingInput} searchData={searchDataInput} setSearch={setSearch} viewProduct={viewProduct} viewSearchProduct={viewSearchProduct}/>
            <div className="product-container" >
                {!searchData.products.length > 0? "Items not Found":
                    
                    searchData.products.map((prod,index) => {

                        return(
                            <div className="product-box" onClick={() => viewProduct(prod)} key={index}>
                                        <div>
                                            <img src={prod.thumbnail} />
                                        </div>
                                        <div className="product-box-info">
                                            <h1 style={{ textAlign: "center", fontSize:"12px"}}>{prod.title}</h1>
                                            <p style={{ fontSize:"10px"}}>{prod.rating}</p>
                                        </div>
                                    </div>
                        )


                    })
                    
                }
            </div>
       </div>
    )
};