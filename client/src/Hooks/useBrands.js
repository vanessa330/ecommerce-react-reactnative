import axios from "axios";
import { useState, useEffect } from "react";

export const useBrands = () => {
  const [brands, setBrands] = useState([]);

  const rootAPI = process.env.REACT_APP_API;

  const fetchBrands = async () => {
    const res = await axios.get(`${rootAPI}brand/get`);

    if (res.status === 200) setBrands(res.data);
  };

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line
  }, []);

  return brands;
};
