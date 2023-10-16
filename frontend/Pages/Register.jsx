import { useForm } from "react-hook-form";
import { instance } from "../src/App";
import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AppContext } from "../src/App";
export const Register = () => {
    const { isValid, isLoading } = useContext(AppContext);
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const onSubmit = async (data,e) => {
        try {
            e.preventDefault();
            const response = await instance.post("/authentication/register", data);
            if (response.data.message) {
                 return setMessage(response.data.message);
            }
            if (response.data.success) {
                navigate("/login");
            }
        } catch(error) {
            console.log(error.message);
        }
    };
    const onerror = (errors,e) => {
        return(<h1>There is some errors, please try again later!</h1>);
    };


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

    if (isLoading) {
        return <h1>Loading</h1>
    }

    if (isValid) {
        return <Navigate to="/" />
    }

    return(
        <>
            <div className="section">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit, onerror)}>
                        <div className="credentials">
                            <h1>Credentials</h1>
                            <p>Required</p>
                            {message? message: null}
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" {...register("username")}/>
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" {...register("password")}/>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="confirmPassword" name="confirmPassword" {...register("confirmPassword")}/>
                            </div>
                        </div>
                        <div className="address">
                            <h1>Address</h1>
                            <p>Can be done later</p>
                            <div>
                                <label htmlFor="street">Street</label>
                                <input type="text" name="street" {...register("street")}/>
                            </div>
                            <div>
                                <label htmlFor="district">District</label>
                                <input type="text" name="district" {...register("district")}/>
                            </div>
                            <div>
                                <label htmlFor="barangay">Barangay</label>
                                <input type="text" name="barangay" {...register("barangay")}/>
                            </div>
                            <div>
                                <label htmlFor="province">Province</label>
                                <input type="text" name="province" {...register("province")}/>
                            </div>
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}