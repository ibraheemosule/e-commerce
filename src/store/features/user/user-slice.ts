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
  deliveryDetails: DeliveryDetailsType;
  user: UserType;
}

export type DeliveryDetailsType = {
  address: string;
  lastName: string;
  firstName: string;
  phoneNo: string;
  city: string;
  state: string;
};

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

  user: {
    firstName: "Ibrahim",
    lastName: "Sule",
    address: "22, Ibraheem Musa street, Opposite Chrisland College",
    email: "",
    city: "Idimu",
    state: "Lagos",
    phoneNo: "+2348067153177",
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
