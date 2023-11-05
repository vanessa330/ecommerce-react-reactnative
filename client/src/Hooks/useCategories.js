import axios from "axios";
import { useState, useEffect } from "react";

const rootAPI = process.env.REACT_APP_API;

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

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
