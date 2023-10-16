import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    
    const getData = async () => {
        try {
            const response = await axios.get(url);
            setData(response.data);
            setLoading(false);
        } catch(error) {
            setError(error.message);
            console.log(error);
            setLoading(false);
        }
    }

    const refetch = () => {
        getData();
    }

    useEffect(() => {
        let running = true
        setLoading(true);
        const getData = async () => {
            try {
                const response = await axios.get(url);
                if (running) {
                    setData(response.data);
                    setLoading(false);
                }
            } catch(error) {
                if (running) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        }
        getData();

        return () => {
            running = false;
        }
    }, [url]);

    return [data,loading,error, refetch, setData]
};