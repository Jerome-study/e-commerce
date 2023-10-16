import { useParams } from "react-router-dom"
import { useFetchUsers } from "../hooks/useFetchUser";
export const Profile= () => {
    const params = useParams();
    const [user, loading, message] = useFetchUsers(params.id);
   

    if(loading) {
        return <h1>loading...</h1>
    }

    if (!user) {
        return <h1>{message}</h1>
    }

    return(
        <>
            <h1>Profile Page of {user.username}</h1>
        </>
    )
}