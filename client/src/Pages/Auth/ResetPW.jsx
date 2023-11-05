import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const rootAPI = process.env.REACT_APP_API;

const ResetPW = () => {
  const navigate = useNavigate();
  const { oneTimeToken } = useParams();

  // CSS
  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${rootAPI}user/resetPassword?token=${oneTimeToken}`,
        formData
      );
      if (res.status === 200) {
        alert(res.data.message);
        navigate("/");
      }
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
          <Typography variant="h3">Reset Password</Typography>

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

          <TextField
            name="newPassword"
            type="password"
            label="New Password"
            value={formData.newPassword}
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

export default ResetPW;
