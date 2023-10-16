import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../src/App";
import { HomeInfo } from "../component/HomeInfo";
export const HomeUser = () => {
    const { isLoading, isValid, userId, isActive } = useContext(AppContext);
    const params = useParams();
    
    
    if (params.id !== userId) {
        return <h1>Who the hell are you, Go back!</h1>
    }
   

    return(
        <>
            <HomeInfo isValid={isValid} userId={userId} isActive={isActive}/>
        </>
    )
};