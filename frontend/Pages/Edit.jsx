import { useForm } from "react-hook-form";
import { AppContext } from "../src/App";
import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";



export const EditPage = () => {
    const { register, handleSubmit } = useForm();
    const { isLoading, userId } = useContext(AppContext);
    const { data, error } = useFetch();
    const onSubmit = () => {

    };

    const onError = () => {

    };


    if (isLoading) {
        return <h1>Loading....</h1>
    }
    return(
        <>
            <div className="section">
                <div className="container"> 
                    <h1 className="cart-title">Edit</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>username</h1>
                            <input className="profile-info width-100" />
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>street</h1>
                            <input className="profile-info width-100" />
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>district</h1>
                            <input className="profile-info width-100" />
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>Barangay</h1>
                            <input className="profile-info width-100" />
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>Province</h1>
                            <input className="profile-info width-100" />
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    )
};