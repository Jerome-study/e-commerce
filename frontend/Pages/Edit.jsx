import { useForm } from "react-hook-form";
import { AppContext } from "../src/App";
import { useContext, useEffect, useState } from "react";
import { useFetchUsers } from "../hooks/useFetchUser";
import { useNavigate } from "react-router-dom";
import { instance } from "../src/App";


export const EditPage = () => {
    const { register, handleSubmit } = useForm();
    const { isLoading, userId } = useContext(AppContext);
    const [user, loading, message] = useFetchUsers(userId);
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const onSubmit = async (data, e) => {
        try {
            instance.put("/edit", data)
            .then(response => {
                if (response.data.exist) {
                    return setMsg(response.data.message);
                }

                if (response.data.success) {
                    setMsg(null)
                    return navigate(`/profile/${userId}`);
                }


            }).catch(error => {
                setError(error);
            });
        } catch(error) {
            setError(error);
        }
    };

    const onError = () => {

    };

    if (message) {
        return <h1>{message}</h1>
    }

    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (loading) {
        return <h1>Loading...</h1>
    }
    return(
        <>
            <div className="section">
                <div className="container"> 
                    <h1 className="cart-title">Edit</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>username</h1>
                            <input type="text" name="username" className="profile-info width-100"{...register("username", { value: user?.username})} />
                            {msg? msg: null}
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>street</h1>
                            <input type="text" name="street" className="profile-info width-100"   {...register("street", { value: user?.address.street})}/>
                            {user?.address.street? null:<p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p> }
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>district</h1>
                            <input type="text" name="district"  className="profile-info width-100"  {...register("district", { value: user?.address.district})}/>
                            {user?.address.district? null: <p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p>}
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>barangay</h1>
                            <input  type="text" name="barangay" className="profile-info width-100"  {...register("barangay", { value: user?.address.barangay})}/>
                            {user?.address.barangay? null: <p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p>}
                        </div>

                        <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>province</h1>
                            <input type="text" name="province" className="profile-info width-100" {...register("province", { value: user?.address.province})}/>
                            {user?.address.province? null: <p style={{color: "red", fontSize: "12px"}}> *Not yet filled </p>}
                        </div>

                        <button type="submit" className="edit-profile-button" style={{display: "block"}}>Save</button>
                        <button className="edit-profile-button" onClick={() => navigate("/profile")} >Cancel</button>
                    </form>

                    
                </div>
            </div>
        </>
    )
};