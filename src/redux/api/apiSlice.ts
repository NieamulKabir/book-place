import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookplace-server.vercel.app",
  }),
  tagTypes: ["postBook", "deleteBook", "updateBook"],
  endpoints: () => ({}),
});
