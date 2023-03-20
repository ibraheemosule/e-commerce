import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  phoneNo: string;
};

interface UserSlice {
  signin: boolean;
  deliveryAddress: string;
  user: UserType;
}

const initialState: UserSlice = {
  signin: false,
  deliveryAddress: "",
  user: {
    firstName: "",
    lastName: "",
    address: "22, Ibraheem Musa street, Opposite Chrisland College",
    email: "",
    city: "Idimu",
    state: "Lagos",
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
    changeDeliveryAddress(state, { payload }: PayloadAction<string>) {
      state.deliveryAddress = payload;
    },
  },
});

export const { setSignin, updateUserInfo, changeDeliveryAddress } =
  userSlice.actions;
export default userSlice.reducer;
