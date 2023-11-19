import React from "react";
import { useNavigate } from "react-router-dom";
import ProductWapper from "../../Components/UI/ProductWapper";
import {
  useTheme,
  Box,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";

const UserWishlist = () => {
  const navigate = useNavigate();

  const products = useSelector((state) => state.products);

  const token = useSelector((state) => state.token);

  const userWishlist = useSelector((state) => state.userDetails.wishlist);
  const wishlistString = userWishlist?.split(", ");
  const wishlistIds = wishlistString?.map((id) => parseInt(id.trim(), 10));
  const wishlist = products.filter((p) => wishlistIds?.includes(p.id));

  // CSS
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m={isDesktop ? "1rem auto" : "1rem auto"} maxWidth="1000px">
      <Box m="1rem auto">
        <Typography variant="h4" textAlign="center" padding="10px">
          My Wishlist
        </Typography>
        <Divider />
      </Box>

      {!token ? (
        <Typography
          onClick={() => navigate("/auth")}
          textAlign="center"
          sx={{
            "&:hover": {
              color: theme.palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          You should login first.
        </Typography>
      ) : (
        <>
          {!wishlist ? (
            <Typography textAlign="center">
              Your wishlist is empty...
            </Typography>
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
        </>
      )}
    </Box>
  );
};

export default UserWishlist;
