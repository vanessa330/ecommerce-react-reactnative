import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../store/rootReducer";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const ChangePW = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const rootAPI = process.env.REACT_APP_API;

  // CSS
  const theme = useTheme();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
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
      const config = {headers: {Authorization: `Bearer ${token}`}};
      const res = await axios.post(
        `${rootAPI}user/changePassword`,
        formData,
        config
      );
      if (res.status === 200) {
        alert(res.data.message);
        dispatch(setLogout());
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <Box display="flex" alignItems="center" justifyContent="center" marginTop="2rem">
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
            <Typography variant="h3">Change Password</Typography>

            <TextField
              name="oldPassword"
              type="password"
              label="Old Password"
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

export default ChangePW;
