import { baseAPI } from "@/store/api/baseApi";
import { CreateOsceContentResponse } from "./types/createOsce";
import { SingleOsceResponse } from "./types/singleOsce";

export const osceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createOsce: build.mutation<void, CreateOsceContentResponse>({
      query: (data) => ({
        url: `/osce/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OSCE"],
    }),
    singleOsce: build.query<SingleOsceResponse, string>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "GET",
      }),
      providesTags: ["OSCE"],
    }),
    deleteOsce: build.mutation<void, string>({
      query: (id) => ({
        url: `/osce/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OSCE"],
    }),
  }),
});

export const {
  useCreateOsceMutation,
  useSingleOsceQuery,
  useDeleteOsceMutation,
} = osceApi;
