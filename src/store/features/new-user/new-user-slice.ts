import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UserType,
  OrderType,
  IRecaptchaPayload,
} from "../../../utils/ts-types/__store/typesUser";

export const newUserSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Order"],
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints(builder) {
    return {
      emailOtp: builder.mutation<{ success: boolean }, { email: string }>({
        query(payload) {
          return {
            url: "/auth/email-otp",
            method: "POST",
            body: payload,
          };
        },
      }),
      verifyOtp: builder.mutation<
        { success: boolean },
        { email: string; otp: string }
      >({
        query(payload) {
          return {
            url: "/auth/verify-otp",
            method: "POST",
            body: payload,
          };
        },
      }),
      recaptcha: builder.mutation<{ success: boolean }, IRecaptchaPayload>({
        query(payload) {
          return {
            url: "/auth/recaptcha",
            method: "POST",
            body: payload,
          };
        },
      }),
      signin: builder.mutation<UserType, { email: string; password: string }>({
        query(payload) {
          return {
            url: "/auth/signin",
            method: "POST",
            body: payload,
          };
        },
      }),
      signout: builder.mutation<void, void>({
        query() {
          return {
            url: `/auth/signout`,
            method: "POST",
            body: "",
          };
        },
      }),
      signup: builder.mutation<UserType, UserType & { password: string }>({
        query(payload) {
          return {
            url: "/auth/signup",
            method: "POST",
            body: payload,
          };
        },
      }),
      resetPassword: builder.mutation<{ message: string }, { email: string }>({
        query(payload) {
          return {
            url: "/auth/reset-password",
            method: "POST",
            body: payload,
          };
        },
      }),

      updateInfo: builder.mutation<UserType, UserType>({
        query(payload) {
          return {
            url: "/auth/update-info",
            method: "PATCH",
            body: payload,
          };
        },
      }),
      getOrder: builder.query<{ data: OrderType[] }, { email: string }>({
        providesTags: ["Order"],
        query({ email }) {
          return {
            url: `/order/get-order?email=${email}`,
            method: "GET",
          };
        },
      }),
      postOrder: builder.mutation<OrderType, OrderType>({
        invalidatesTags: ["Order"],
        query(payload) {
          return {
            url: "/order/post-order",
            method: "POST",
            body: payload,
          };
        },
      }),
    };
  },
});

export const {
  useSignupMutation,
  useSignoutMutation,
  useSigninMutation,
  useUpdateInfoMutation,
  useGetOrderQuery,
  usePostOrderMutation,
  useResetPasswordMutation,
  useRecaptchaMutation,
  useEmailOtpMutation,
  useVerifyOtpMutation,
} = newUserSlice;
