import { createSlice } from "@reduxjs/toolkit";

interface UserSlice {
  signin: boolean;
  cartItems: [];
}

const initialState: UserSlice = {
  signin: false,
  cartItems: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setSignin(state) {
      state.signin = !state.signin;
    },
  },
});

export const { setSignin } = userSlice.actions;
export default userSlice.reducer;
