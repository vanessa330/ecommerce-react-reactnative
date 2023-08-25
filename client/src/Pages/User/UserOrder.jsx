import React, { useEffect } from "react";
import { useUser } from "../../Hooks/useUser";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

const UserOrder = () => {
  const user = useUser();

  // CSS
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {}, [user]);

  return (
    <>
      <Typography variant="h5" textAlign="center" padding="10px">
        My Order
      </Typography>
      <Divider />
    </>
  );
};

export default UserOrder;
