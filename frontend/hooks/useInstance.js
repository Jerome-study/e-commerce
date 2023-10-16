import { useEffect, useState } from "react";
import { instance } from "../src/App";

export const useInstance = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

   
    useEffect(() => {
        let running = true;

        
        const getData = async () => {
            setLoading(true);
            try {
                const response = await instance.get(url);
                if (running) {
                    setData(response.data);
                    setLoading(false);
                }
               
            } catch(error) {
                if (running) {
                    setError(error.message);
                    console.log(error.message);
                    setLoading(false);
                }
              
            }
            
        }
        getData();


        return () => {
            running = false;
        }
    }, [url]);

    return [data,error,loading]
};