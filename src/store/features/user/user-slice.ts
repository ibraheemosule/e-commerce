import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserType,
  UserSlice,
  DeliveryDetailsType,
} from "../../../utils/ts-types/__store/typesUser";
import { OrderType } from "../../../utils/ts-types/__store/typesUser";

export const userDefaultState: UserSlice = {
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
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    city: "",
    state: "",
    phoneNo: "",
  },

  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: userDefaultState,

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
    updateOrders(state, { payload }: PayloadAction<OrderType>) {
      state.orders = [...state.orders, payload];
    },
    resetState(state, { payload }: PayloadAction<UserSlice>) {
      state.userInfo = payload.userInfo;
      state.deliveryDetails = payload.deliveryDetails;
    },
  },
});

export const {
  setSignin,
  updateUserInfo,
  changeDeliveryDetails,
  updateOrders,
  resetState,
} = userSlice.actions;
export default userSlice.reducer;
