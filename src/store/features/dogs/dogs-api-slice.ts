const apiKey = "cbfb51a2-8466-4025-a3e2-ed8616edf311";

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
    prepareHeaders(headers) {
      headers.set("x-api-key", apiKey);
      return headers;
    },
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
