import { useNavigate,Link } from "react-router-dom"
import { AppContext } from "../src/App";
import { useContext, useEffect, useState } from "react";
import { instance } from "../src/App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faL, faXmark } from '@fortawesome/free-solid-svg-icons'
export const Navbar = (props) => {
    const { setIsActive, isActive, isClick, setIsClick } = props;
    const navigate = useNavigate();
    const { isValid, userId, render } = useContext(AppContext);
    const [showNav, setShowNav] = useState(false);
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

    useEffect(() => {
        if (isClick) {
            setIsActive(false);
            setShowNav(false);
        }

        

    }, [isClick])
   
    
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

                {showNav? null: <div >
                    <FontAwesomeIcon icon={faBars} size="lg" onClick={() =>{setIsActive(true); setShowNav(true); setIsClick(false)}}/>
                </div>}
            </ div>
        </div>
       
     
        
        
    )
}