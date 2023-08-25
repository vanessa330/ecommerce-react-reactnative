import axios from "axios";
import { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const rootAPI = process.env.REACT_APP_API;

  const fetchCategories = async () => {
    const res = await axios.get(`${rootAPI}category/get`);
    
    if (res.status === 200) setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return categories;
};
