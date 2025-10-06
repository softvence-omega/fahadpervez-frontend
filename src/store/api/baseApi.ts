import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders(headers) {
    // const token = (getState() as RootState).auth.token;
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      headers.set("authorization", `${accessToken}`);
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: [""],
  endpoints: () => ({}),
});
