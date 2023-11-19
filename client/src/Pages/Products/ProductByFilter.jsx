import React, { useEffect, useState } from "react";
import ProductWapper from "../../Components/UI/ProductWapper";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductByFilter = () => {
  const { filter } = useParams();
  const [filterProduct, setFilterProduct] = useState();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    const foundProduct = products.filter(
      (p) =>
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.categoryName.toLowerCase() === filter.toLowerCase() ||
        p.brandName.toLowerCase() === filter.toLowerCase()
    );
    setFilterProduct(foundProduct);
  }, [products, filter]);

  // CSS
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  if (!filterProduct) {
    return null;
  } else {
    return (
      <Box m={isDesktop ? "2rem auto" : "1rem auto"} maxWidth="1000px">
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="2rem"
          m={isDesktop ? "0 0.5rem" : "0.8rem"}
        >
          {filterProduct.map((p) => (
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
  }
};

export default ProductByFilter;
