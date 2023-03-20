import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  phoneNo: string;
}

const initialState: { signin: boolean; user: UserType } = {
  signin: false,
  user: {
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    state: "",
    phoneNo: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setSignin(state) {
      state.signin = !state.signin;
    },
    updateUserInfo(state, { payload }: PayloadAction<UserType>) {
      state.user = { ...state.user, ...payload };
    },
  },
});

export const { setSignin, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
