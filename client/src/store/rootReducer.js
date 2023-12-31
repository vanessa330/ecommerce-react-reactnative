import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  token: null,
  userId: null, // customer id
  userName: "", // customer name
  userDetails: {}, // customer details
  cart: [],
  cartQty: 0,
  products: [], // products details
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.id;
      state.userName = action.payload.name;
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = 1;
      state.userName = "";
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserDetailsToNull: (state) => {
      state.userDetails = {};
    },
    setCart: (state, action) => {
      const {
        productId,
        productName,
        productColor,
        productPrice,
        productQuantity,
        totalPrice,
      } = action.payload;

      // eslint-disable-next-line
      const existingCartItem = state.cart.find((i) => i.productId == productId);

      if (existingCartItem) {
        existingCartItem.productQuantity += productQuantity;
        existingCartItem.totalPrice += totalPrice;
        if (existingCartItem.productQuantity <= 0)
          state.cart.pop(existingCartItem);
      } else {
        const cartItem = {
          productId,
          productName,
          productColor,
          productPrice: productPrice,
          productQuantity,
          totalPrice: totalPrice,
        };
        state.cart.push(cartItem);
      }

      const totalProductQty = state.cart.reduce(
        (total, item) => total + item.productQuantity,
        0
      );
      state.cartQty = totalProductQty;
    },
    setCartToNull: (state) => {
      state.cart = [];
      state.cartQty = 0;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setUserDetails,
  setUserDetailsToNull,
  setCart,
  setCartToNull,
  setProducts,
} = rootSlice.actions;
export default rootSlice.reducer;
