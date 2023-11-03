import { useParams, useNavigate } from "react-router-dom"
import { useFetchUsers } from "../hooks/useFetchUser";
export const Profile= () => {
    const params = useParams();
    const navigate = useNavigate();
    const [user, loading, message] = useFetchUsers(params.id);
   

    if(loading) {
        return <h1>loading...</h1>
    }

    if (!user) {
        return <h1>{message}</h1>
    }

    const goToEditPage = () => {
        navigate("/edit");
    }

    return(
        <>
            <div className="section">
                <div className="container"> 
                <h1 className="cart-title">My Profile</h1>
                    <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>username</h1>
                            <p className="profile-info">{user?.username}</p>
                    </div>

                    <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>street</h1>
                            <p className={user.address.street? "profile-info": "profile-no-info"}>{user?.address.street}</p>
                            {user?.address.street? null:<p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p> }
                    </div>

                    <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>district</h1>
                            <p className={user.address.street? "profile-info": "profile-no-info"}>{user?.address.district}</p>
                            {user?.address.district? null: <p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p>}
                    </div>

                    <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>barangay</h1>
                            <p className={user.address.barangay? "profile-info": "profile-no-info"}>{user?.address.barangay}</p>
                            {user?.address.barangay? null: <p style={{color: "red", fontSize: "12px"}}>*Not yet filled </p>}
                    </div>

                    <div className="margin-bottom ">
                            <h1 style={{fontWeight: "bold"}}>province</h1>
                            <p className={user.address.street? "profile-info": "profile-no-info"}>{user?.address.province}</p>
                            {user?.address.province? null: <p style={{color: "red", fontSize: "12px"}}> *Not yet filled </p>}
                    </div>
                    

                    <button className="edit-profile-button" onClick={() => goToEditPage()}>Edit Profile</button>
                </div>
            </div>
        </>
    )
}