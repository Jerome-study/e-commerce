import { useEffect, useState } from "react";
import { instance } from "../src/App";

export const useFetchUsers = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message , setMessage] = useState(null);
    

    useEffect(() => {
        instance(`/home/${id}`).then(response => {
            if (response.data.user) {
                setUser(response.data.user);
                return setLoading(false);
             }
        }).catch((error) => {
            setMessage(error.response.data.message);
            setLoading(false);
        })
        
    }, []);

    return [user, loading, message]
}