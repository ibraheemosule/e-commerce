import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], void>({
        query() {
          return `/`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
