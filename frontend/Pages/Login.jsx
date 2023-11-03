import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { instance } from "../src/App";
import { AppContext } from "../src/App";
export const Login = () => { 
    const { isValid, isLoading, setIsValid, render } = useContext(AppContext);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const doLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post("/authentication/login", { username, password});
            if (response.data.message) {
                return setMessage(response.data.message);
            }
            if (response.data.success) {
                setIsValid(true);
                render();
                navigate(`/profile/${response.data.user}`);
            }
        } catch(error) {
            console.log(error.message);
        }
    }


    // const [loginStatus, isLoading ] = useAuthorize("/isLoggedIn");

    // useEffect(() => {
    //     if (!isLoading) {
    //         if (loginStatus) {
    //             navigate("/");
    //         }
    //     }
    // }, [loginStatus])

    // if (isLoading) {
    //     return <h1>Loading...</h1>
    // }


    if(isLoading) {
        return <h1>Loading...</h1>
    }

    if(isValid) {
        return <Navigate to="/" />
    }

    return(
        <>
            <div className="section fill-up">
                <div className="container centered">
                    <h1>Login</h1>
                    <form>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                         </div>
                        <button onClick={(e) => doLogin(e)}>Login</button>
                    </form>
                    {message? <p className="message-login">{message}</p>: null}
                </div>
            </div>
        </>
    )
}