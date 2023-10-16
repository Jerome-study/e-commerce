import './App.css'
import { Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { Home } from '../Pages/Home';
import { Login } from '../Pages/Login';
import { Register } from '../Pages/Register';
import { Profile } from '../Pages/Profile';
import { Protected } from '../Pages/Protected';
import { HomeUser } from "../Pages/HomeUser";
import { useAuthorize } from '../hooks/useAuthorize';
import { createContext, useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { ProfileRedirect } from '../Pages/ProfileRedirect';
import { ProductView } from '../Pages/ProductView';
import { ProductViewUser } from '../Pages/ProductViewUser';
import { ProductSearchView } from '../Pages/ProductSearchView';
import { ProductSearchViewUser } from '../Pages/ProductSearchViewUser';
import { ProfileInCart } from "../Pages/ProfileInCart";
import { NotFoundPage } from '../Pages/error';
import axios from "axios";
export const instance = axios.create({
  baseURL: import.meta.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: true
})
export const AppContext = createContext();



function App() {
  const [isValid, isLoading, setIsValid, userId, render, error] = useAuthorize("/isLoggedIn"); 
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [toggle, setToggle] = useState(true);
  const inPageNotFound = location.pathname.includes("/404");

  if (error) {
    return <h1>{error}</h1>
  }

  return (
    <>
          <AppContext.Provider value={{isValid, isLoading, setIsValid, userId, render, isActive, toggle, setToggle}}>
            
              {!inPageNotFound? <Navbar setIsActive={setIsActive} isActive ={isActive} isClick={isClick} setIsClick={setIsClick}  />: null}
              <div className={isActive? "nav-active body":"body"} onClick={() => isActive?setIsClick(true): null} >
                  <Routes>
                {/* Protected Routes */}
                <Route element={< Protected />}>
                  <Route path='/profile' element={ <ProfileRedirect />}></Route>  
                  <Route  path='/profile/:id' element={ <Profile  />}></Route>
                  <Route  path='/home/:id' element={ <HomeUser  />}></Route>
                  <Route path="/productView/:id/:product" element={ < ProductViewUser />}></Route>
                  <Route path="/productSearchViewUser/:id/:product" element={ < ProductSearchViewUser />}></Route>
                  <Route path="/inCart/:id"  element={ <ProfileInCart/> }/>
                </Route>
                {/* Public Routes */}
                <Route path='/home' element={ <Home />}></Route>
                <Route path='/login' element={ <Login />}></Route>
                <Route path='/register' element={ <Register />}></Route>
                <Route path="/productView/guest/:id" element={ < ProductView />}></Route>
                <Route path="/productSearchViewGuest/:guest/:product" element={ < ProductSearchView />}></Route>
                <Route path="/404" element={ <NotFoundPage /> }></Route>
                <Route path="*" element={<Navigate to="/404" />}></Route>
              </Routes> 
              </div>
              
            
          </AppContext.Provider>
    </>
  )
}

export default App
