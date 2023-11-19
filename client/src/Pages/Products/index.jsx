import React from "react";
import { useSelector } from "react-redux";
import ProductWapper from "../../Components/UI/ProductWapper";
import { Box, Typography, useMediaQuery } from "@mui/material";

const Products = () => {
  const products = useSelector((state) => state.products);

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
        {!products ? (
          <Typography textAlign="center">Product list is empty...</Typography>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Products;
