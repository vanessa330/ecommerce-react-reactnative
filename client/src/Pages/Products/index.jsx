import React from "react";
import { useProducts } from "../../Hooks/useProducts";
import ProductWapper from "../../Components/UI/ProductWapper";
import { Box, useMediaQuery } from "@mui/material";

const Products = () => {
  const products = useProducts();

  // CSS
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m={isDesktop ? "2rem auto" : "1rem auto"} maxWidth="1000px">
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="2rem"
        m={isDesktop ? "0 0.5rem" : "0.8rem"}
      >
        {products.map((p) => (
          <ProductWapper
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            quantity={p.quantity}
            color={p.color}
            images={p.images}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Products;
