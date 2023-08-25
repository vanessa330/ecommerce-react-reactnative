import axios from "axios";
import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  const rootAPI = process.env.REACT_APP_API;

  const fetchProducts = async () => {
    const res = await axios.get(`${rootAPI}product/get`);
    
    if (res.status === 200) setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return products;
};
