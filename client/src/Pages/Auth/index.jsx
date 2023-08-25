import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/rootReducer";
import { useNavigate } from "react-router-dom";
import { useTheme, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const LoginRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootAPI = process.env.REACT_APP_API;

  // CSS
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "", // register
    email: "",
    password: "",
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
      if (isLogin) {
        delete formData.name;
        const res = await axios.post(`${rootAPI}user/login`, formData);
        if (res.status === 200) {
          dispatch(setLogin(res.data));
          navigate("/");
        }
      } else {
        const res = await axios.post(`${rootAPI}user/signup`, formData);
        if (res.status === 200) setIsLogin(true);
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
          <Typography variant="h3">{isLogin ? "Login" : "Register"}</Typography>

          {!isLogin && (
            <TextField
              name="name"
              type="text"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              sx={{
                width: "80%",
              }}
            />
          )}

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
            name="password"
            type="password"
            label="Password"
            value={formData.password}
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
            {isLogin ? "LOGIN" : "REGISTER"}
          </Button>

          <Typography
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              textDecoration: "underline",
              color: theme.palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: theme.palette.primary.light,
              },
            }}
          >
            {isLogin
              ? "Don't have an account? Register here."
              : "Already have an account? Login here."}
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default LoginRegister;
