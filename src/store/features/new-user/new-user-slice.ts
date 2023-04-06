import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../../../utils/ts-types/__store/typesUser";

export const newUserSlice = createApi({
  reducerPath: "api",
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
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
    };
  },
});

export const { useSignupMutation, useSignoutMutation } = newUserSlice;
