import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Navbar from "./Components/Navbar.jsx";
import LoginRegister from "../src/Pages/Auth";
import ChangePW from "./Pages/Auth/ChangePW.jsx";
import ForgotPW from "./Pages/Auth/ForgotPW.jsx";
import ResetPW from "./Pages/Auth/ResetPW.jsx";
import Home from "../src/Pages/Home";
import Products from "./Pages/Products";
import ProductByFilter from "./Pages/Products/ProductByFilter.jsx";
import ProductDetails from "./Pages/Products/ProductDetails.jsx";
import Cart from "./Pages/Cart/index.jsx";
import User from "./Pages/User/index.jsx";
import UserWishlist from "./Pages/User/UserWishlist.jsx";

function App() {
  const mode = useSelector((state) => state.mode); // default "light" mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path="/auth" element={<LoginRegister />} />{" "}

            {/* User related */}
            <Route path="/auth/change" element={<ChangePW />} />
            <Route path="/auth/forgot" element={<ForgotPW />} />
            <Route path="/auth/reset/:oneTimeToken" element={<ResetPW />} />
            <Route path="/user" element={<User />} />

            {/* Product related */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:filter"
              element={<ProductByFilter />}
            />{" "}
            {/* searching by name || category || brand */}
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<UserWishlist />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
