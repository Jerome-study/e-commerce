import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useFetchProduct } from "../hooks/useGetProduct";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export const HomeInfo = (props) => {
    const navigate = useNavigate();
    const { isValid, userId, toggle, setToggle} = props;
    const [category, categoryLoading, categoryError] = useFetch(import.meta.env.VITE_CATEGORY_API);
    const [isActive, setIsActive] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [search, setSearch] = useState(null);
    const [searchData, searchDataLoading, searchDataError,refetch, setSearchData] = useFetch(import.meta.env.VITE_SEARCH_PRODUCT_API + search);
    const [data,loading, getData, allData,error] = useFetchProduct();
    

    const viewProduct = (product) => {
        
        if (!isValid) {
            return navigate(`/productView/guest/${product.id}`, { state: product});
        }
        navigate(`/productView/${userId}/${product.id}`, { state: product});
    }

    const viewSearchProduct = () => {
        setSearch(null)
        if (!search) {
            return console.log("NO ITEM");
        }
        if (!isValid) {
            return  navigate(`/productSearchViewGuest/guest/${search}`);
        }
        
        navigate(`/productSearchViewUser/${userId}/${search}`);
    };

    useEffect(() => {
        if (props.isActive) {
            setSearch(null);
            
        }
    }, [props.isActive])

    useEffect(() => {
        setSearch(null);
    }, [toggle])

    return(
        <div>
            <div className="container">
                <SearchSection search={search} searchDataLoading= {searchDataLoading} searchData={searchData} setSearch={setSearch} viewProduct={viewProduct} viewSearchProduct={viewSearchProduct} />
                <CategorySection category={category} allData={allData} getData={getData} categoryLoading={categoryLoading} isActive={isActive} firstLoad={firstLoad} setFirstLoad={setFirstLoad} setSearch={setSearch} categoryError= {categoryError}   />
                <CategoryDataSection loading={loading} data={data} viewProduct={viewProduct} setSearch={setSearch} />
            </div>
        </div>
    )
};

export function SearchSection (props) {
    const { search, searchDataLoading, searchData, setSearch, viewProduct, viewSearchProduct} = props
    return(
        <div className="search-section">
                    <div>
                        <input type="text" onChange={(e) => setSearch(e.target.value)} typeof="search"/>
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={viewSearchProduct} />
                    </div>
                    {!search? null: 
                        <div className="search-list-section">
                           { searchDataLoading? "Loading...": 
                           
                           !searchData.products.length > 0? "Not Found":

                           searchData.products.map((prod, key) => {
                             return (
                             
                             <div className="flex-list" key={key} onClick={() => viewProduct(prod)}>
                                        <img src={prod.thumbnail} />
                                        <div>
                                            <h1>{prod.title}</h1>
                                            <p style={{ fontSize: "12px"}}>{prod.rating}</p>
                                        </div>   
                             </div>
                             
                             )

                           })

    
                           
                           }
                        
                        </div>}
                </div>
    )
};


function CategorySection (props) {
    const { category, allData, getData, categoryLoading, isActive, firstLoad, setFirstLoad, setSearch, categoryError } = props;
    

    function changeActive(e) {

        if (firstLoad) {
            setFirstLoad(current => false);
        }
        
        isActive.push(e.target.classList);
        isActive[isActive.length - 1].add("hover");


        if (isActive.length > 1) {
            isActive[isActive.length - 2].remove("hover")
        }

        
       
    }       


    if (categoryError) {
        return <h1>{categoryError}</h1>
    }

    return( 
        <>
            {
                categoryLoading?"Loading...":
                <div className="category-section">
                    <button onClick={(e) => { changeActive(e); allData(e)} } className="category-btn" style={{backgroundColor: firstLoad? "#000": null, color: firstLoad? "#fff": null}}   >All</button>
                    {category.map(cat => {
                        return <button key={cat} value={cat} onClick={(e) =>{changeActive(e);getData(e.target.value); setSearch(null)} } className="category-btn">{cat}</button>
                    })}
                </div>
                }
        </>
    )
};

function CategoryDataSection (props) {
    const { loading, data, viewProduct, setSearch } = props
    return(
        <div className="product-container" onClick={() => setSearch(null)}>
                    {loading? "Loading...":  <>
                            {data?.results?.products?.map((prod,index) => {
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
                            })}
                    </>}
                </div>
    )
}