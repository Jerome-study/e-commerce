import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
import { HomeInfo } from "../component/HomeInfo";
import { useFetchProduct } from "../hooks/useGetProduct";
export const Home = () => {
    const { isLoading, isValid, userId, isActive } = useContext(AppContext);
    const [data,loading, getData, allData,error] = useFetchProduct();

    if (error) {
        return <h1>You broke the site</h1>
    }

    if (isLoading) {
        return <h1>Loading</h1>
    }
    if (isValid) {
        return <Navigate to={`/home/${userId}`} />
    }
    
    
    
    return(
        <>
            <HomeInfo userId={userId} isValid={isValid} isActive={isActive} />
        </>
    )
};