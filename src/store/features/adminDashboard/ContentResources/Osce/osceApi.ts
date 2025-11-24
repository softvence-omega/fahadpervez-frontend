/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";
import { CreateOsceContentResponse } from "./types/createOsce";
import { OsceListResponse } from "./types/getOsce";

export const osceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createOsce: build.mutation<void, CreateOsceContentResponse>({
      query: (data) => ({
        url: `/osce/create`,
        method: "POST",
        body: data,
      }),
    }),

    getAllOsce: build.query<OsceListResponse, any>({
      query: () => ({
        url: `/osce`,
        method: "GET",
      }),
    }),

    getSingleOsce: build.query<OsceListResponse, any>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOsceMutation,
  useGetAllOsceQuery,
  useGetSingleOsceQuery,
} = osceApi;
