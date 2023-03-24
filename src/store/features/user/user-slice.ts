import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserType,
  UserSlice,
  DeliveryDetailsType,
} from "../../../utils/ts-types/data-types";

const initialState: UserSlice = {
  signin: true,
  deliveryDetails: {
    address: "",
    lastName: "",
    firstName: "",
    phoneNo: "",
    city: "",
    state: "",
  },

  userInfo: {
    firstName: "john",
    lastName: "doe",
    address: "22, abebi college, gatte off offward crasetnidjf",
    email: "johndoe@gmail.com",
    city: "idimu",
    state: "lagos",
    phoneNo: "+2347654343434",
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
      state.userInfo = { ...state.userInfo, ...payload };
    },

    changeDeliveryDetails(
      state,
      { payload }: PayloadAction<DeliveryDetailsType>
    ) {
      state.deliveryDetails = payload;
    },
  },
});

export const { setSignin, updateUserInfo, changeDeliveryDetails } =
  userSlice.actions;
export default userSlice.reducer;
