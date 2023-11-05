import axios from "axios";
import { useState, useEffect } from "react";

const rootAPI = process.env.REACT_APP_API;

export const useProducts = () => {
  const [products, setProducts] = useState([]);

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
