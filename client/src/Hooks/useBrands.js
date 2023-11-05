import axios from "axios";
import { useState, useEffect } from "react";

const rootAPI = process.env.REACT_APP_API;

export const useBrands = () => {
  const [brands, setBrands] = useState([]);

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
