import React, { useEffect } from "react";
import Products from "../Products";
import { useProducts } from "../../Hooks/useProducts";
import { useUser } from "../../Hooks/useUser";
import { useSelector } from "react-redux";

export const useUserConditional = (token) => {
  const userDetails = useUser();

  useEffect(() => {
    if (token) {
      // Call any additional logic related to the user here
    }
  }, [token]);

  return userDetails;
};

const Home = () => {
  const token = useSelector((state) => state.token);
  useProducts();
  useUserConditional(token);

  return (
    <>
      <Products />
    </>
  );
};

export default Home;
