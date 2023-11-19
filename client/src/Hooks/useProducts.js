import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/rootReducer";

const rootAPI = process.env.REACT_APP_API;

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const res = await axios.get(`${rootAPI}product/get`);

    if (res.status === 200) {
      dispatch(setProducts(res.data));
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return products;
};
