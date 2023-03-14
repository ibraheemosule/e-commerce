import { createSlice } from "@reduxjs/toolkit";

interface Products {
  name: string;
  [key: string]: unknown;
}
interface ProductSlice {
  cartItems: Products[];
  search: string;
}

const initialState: ProductSlice = {
  cartItems: [],
  search: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {},
});

//export const { setSignin } = productSlice.actions;
export default productSlice.reducer;
