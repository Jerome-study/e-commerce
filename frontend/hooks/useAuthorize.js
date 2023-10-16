import { useState, useEffect } from "react";
import { instance } from "../src/App";
export const useAuthorize = (url) => {
    const [isValid, setIsValid] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const getStatus = async () => {
      try {
        const response = await instance.get(url)
        setIsValid(response.data.status);
        setUserId(response.data.user);  
        setLoading(false)
      } catch (error) {
        console.log(error.message);
        setLoading(false)
      }
    }
    
    const render = () => {
      setCount(prev => prev + 1);
    }

    useEffect(() => {
      getStatus();
    },[count]);
  
    return [isValid, loading, setIsValid, userId, render, error]
  }