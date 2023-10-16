import { useFetch } from "./useFetch";
import { useEffect, useState } from "react";
import { useInstance } from "./useInstance";


export const useFetchProduct = () => {
    const [categoryProduct, setCategoryProduct] = useState(null);
    const [data, error, loading] = useInstance(`/api/category/${categoryProduct}`)

    const getData =  (value) => {
        setCategoryProduct(value);
    }
    
    
    const allData = () => {
        setCategoryProduct("null");
    }

    return[data,loading, getData, allData, error];
    
};