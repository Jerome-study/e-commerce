import { useNavigate,Link } from "react-router-dom"
import { AppContext } from "../src/App";
import { useContext, useEffect, useState } from "react";
import { instance } from "../src/App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faL, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from "../hooks/useFetch";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export const Navbar = (props) => {
    const { setIsActive, isActive, isClick, setIsClick} = props;
    const navigate = useNavigate();
    const { isValid, userId, render, toggle, setToggle, navToggle } = useContext(AppContext);
    const [showNav, setShowNav] = useState(false);
    const [searchBar, setSearch] = useState(null);
    const [searchDataInput, searchDataLoadingInput, searchDataErrorInput] = useFetch(import.meta.env.VITE_SEARCH_PRODUCT_API + searchBar);
    const paths = ["register", "login"];
    const paths2 = ["profile", "inCart"]
    const inProfileCart = paths2.some(p => location.pathname.includes(p));
    const inLoginRegister = paths.some(p => location.pathname.includes(p));

    const doLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post("/authentication/logout");
            if(response.data.success) {
                render();
                window.location.href = "/home"
                navigate("/home");
                setShowNav(false);
                setIsActive(false);
                setIsClick(false);
            }
        } catch(error) {
            console.log(error.message);
        }
    }


    const viewProduct = (product) => {
        setSearch(null)
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
    };

    

    useEffect(() => {
        if (isClick) {
            setIsActive(false);
            setShowNav(false);
        }
    }, [isClick]);

   

    useEffect(() => {
        if (isActive) {
            setSearch(null)
        }
    }, [isActive]);

    useEffect(() => {
        setSearch(null);
    }, [toggle]);

    useEffect(() => {
        setSearch(null)
    }, [navToggle]);
   

    
    
    return(
        <div className={isActive? "nav-active ":null}>
            <div className="container nav-flex">
                <div>
                    <Link to="/home"><h1 onClick={() => {setIsActive(false); setShowNav(false);}}  style={{ fontSize: "24px"}}>E-Commerce</h1></Link>
                </div>
                {isActive?<div className="nav-list" style={{display: showNav? "block": "none"  }}>
                    <FontAwesomeIcon icon={faXmark} size="lg" onClick={() => {setIsActive(false); setShowNav(false);}}/>
                    <Link to="/home"  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Home</Link>
                    {isValid? null:<Link to="/login" style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Login</Link>}
                    {isValid? null:<Link to="/register"  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Register</Link>}
                    {!isValid?null:<Link to={`/profile`}  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Profile</Link>}
                    {isValid? <Link to={`/inCart/${userId}`}  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Cart</Link>: null}
                    {isValid? <button onClick={(e) => doLogout(e)}>Logout</button>: null}
                </div>: null}


                {!inLoginRegister?
                    <div className="nav-hide-desktop">
                    {!inProfileCart? <SearchSection search={searchBar} searchDataLoading= {searchDataLoadingInput} searchData={searchDataInput} setSearch={setSearch} viewProduct={viewProduct} viewSearchProduct={viewSearchProduct}/>: null}
                        {isValid? null:<Link to="/login" style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Login</Link>}
                        {isValid? null:<Link to="/register"  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Register</Link>}
                        {!isValid?null:<Link to={`/profile`}  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Profile</Link>}
                        {isValid? <Link to={`/inCart/${userId}`}  style={{color: "#000", textDecoration: "none"}} onClick={() => {setIsActive(false); setShowNav(false);}}>Cart</Link>: null}
                        {isValid? <button onClick={(e) => doLogout(e)}>Logout</button>: null}
                    </div>
                : null}

                

                {showNav? null: <div >
                    <FontAwesomeIcon className="nav-icon" icon={faBars} size="lg" onClick={() =>{setIsActive(true); setShowNav(true); setIsClick(false)}}/>
                </div>}
            </ div>
        </div>
       
     
        
        
    )
}


function SearchSection (props) {
    const { search, searchDataLoading, searchData, setSearch, viewProduct, viewSearchProduct} = props
    return(
        <div className="search-section nav-search-section-desktop">
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