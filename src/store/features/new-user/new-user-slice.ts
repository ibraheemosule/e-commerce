import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType, OrderType } from "../../../utils/ts-types/__store/typesUser";

export const newUserSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Order"],
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
      signin: builder.mutation<UserType, { email: string; password: string }>({
        query(payload) {
          return {
            url: "/auth/signin",
            method: "POST",
            body: payload,
            headers: {
              "Content-Type": "application/json",
            },
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
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),

      updateInfo: builder.mutation<UserType, UserType>({
        query(payload) {
          return {
            url: "/auth/update-info",
            method: "PATCH",
            body: payload,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      getOrder: builder.query<{ data: OrderType[] }, { email: string }>({
        providesTags: ["Order"],
        query({ email }) {
          return {
            url: `/order/get-order?email=${email}`,
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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
            headers: {
              "Content-Type": "application/json",
            },
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
} = newUserSlice;
