import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Wrapper from "../../Components/UI/Wapper";
import UserAddress from "./UserAddress";
import UserOrder from "./UserOrder";
import UserWishlist from "./UserWishlist";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { setLogout, setUserDetailsToNull } from "../../store/rootReducer";
import { useDispatch } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPage, setShowPage] = useState("Order");

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      dispatch(setLogout());
      dispatch(setUserDetailsToNull());
      navigate(`/`);
    }
  };

  // CSS
  const isDesktop = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  return (
    <Box m={isDesktop ? "2rem auto" : "1rem auto"} maxWidth="1000px">
      <Box
        m={isDesktop ? "1.5rem" : "0.5rem"}
        display={isDesktop ? "flex" : "block"}
        justifyContent={isDesktop ? "space-between" : "undefined"}
      >
        <Box
          flexBasis={isDesktop ? "30%" : undefined}
          m={isDesktop ? "0 1rem" : "1rem 0"}
        >
          <Wrapper
            display={isDesktop ? "block" : "flex"}
            justifyContent={isDesktop ? "undefined" : "space-between"}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="500"
              padding="10px"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => setShowPage("Order")}
            >
              Order
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="500"
              padding="10px"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => setShowPage("Wishlist")}
            >
              Wishlist
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="500"
              padding="10px"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => setShowPage("Address")}
            >
              Address
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="500"
              padding="10px"
              sx={{
                "&:hover": {
                  color: theme.palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
          </Wrapper>
        </Box>

        <Wrapper
          flexBasis={isDesktop ? "70%" : undefined}
          m={isDesktop ? "0 1rem" : "1rem 0"}
        >
          {showPage === "Order" && <UserOrder />}
          {showPage === "Address" && <UserAddress />}
          {showPage === "Wishlist" && <UserWishlist />}
        </Wrapper>
      </Box>
    </Box>
  );
};

export default User;
