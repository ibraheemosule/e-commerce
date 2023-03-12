import { createSlice } from "@reduxjs/toolkit";

interface ProductSlice {
  cartItems: [];
}

const initialState: ProductSlice = {
  cartItems: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},
});

//export const { setSignin } = productSlice.actions;
export default productSlice.reducer;
