import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  token: null,
  name: "", // customer name
  cart: [],
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
      state.name = action.payload.name;
    },
    setLogout: (state) => {
      state.token = null;
      state.name = ''; 
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
    },
  },
});

export const { setMode, setLogin, setLogout, setCart } = rootSlice.actions;
export default rootSlice.reducer;
