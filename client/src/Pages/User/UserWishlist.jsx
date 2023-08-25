import React, { useEffect } from "react";
import { useUser } from "../../Hooks/useUser";
import { useProducts } from "../../Hooks/useProducts";
import ProductWapper from "../../Components/UI/ProductWapper";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

const UserWishlist = () => {
  const user = useUser();
  const products = useProducts();

  const wishlistString = user?.wishlist?.split(", ");
  const wishlistIds = wishlistString?.map((id) => parseInt(id.trim(), 10));
  const wishlist = products.filter((p) => wishlistIds?.includes(p.id));

  // CSS
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {}, [user, products]);

  return (
    <Box m={isDesktop ? "1rem auto" : "1rem auto"} maxWidth="1000px">
      <Box m="1rem auto">
        <Typography variant="h4" textAlign="center" padding="10px">
          My Wishlist
        </Typography>
        <Divider />
      </Box>

      {!wishlist ? (
        <Typography textAlign="center">Your wishlist is empty...</Typography>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="2rem"
          m={isDesktop ? "0 0.5rem" : "0.8rem"}
        >
          {wishlist.map((p) => (
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
      )}
    </Box>
  );
};

export default UserWishlist;
