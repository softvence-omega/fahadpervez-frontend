import { baseAPI } from "@/store/api/baseApi";
import { CreateOsceContentResponse } from "./types/createOsce";

export const osceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createOsce: build.mutation<void, CreateOsceContentResponse>({
      query: (data) => ({
        url: `/osce/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateOsceMutation } = osceApi;
