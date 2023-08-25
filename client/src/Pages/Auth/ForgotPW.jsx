import React, { useState } from "react";
import { useTheme, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const ForgotPW = () => {
  const rootAPI = process.env.REACT_APP_API;

  // CSS
  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${rootAPI}user/forgotPassword`, formData);
      if (res.status === 200) alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="2rem"
    >
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor={theme.palette.background.alt}
          padding="2rem 1rem"
          borderRadius="8px"
          gap="30px"
          minWidth="400px"
          width="100%"
          boxShadow={theme.shadows[2]}
        >
          <Typography variant="h3">Forgot Password</Typography>

          <Box width="80%">
            <Typography variant="h5" textAlign="center">
              Enter your email and we'll send you a link to reset your password.
            </Typography>
          </Box>

          <TextField
            name="email"
            type="text"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            sx={{
              width: "80%",
            }}
          />

          <Button
            type="submit"
            sx={{
              m: "1rem",
              p: "1rem",
              width: "80%",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Confirm
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPW;
