import { baseAPI } from "@/store/api/baseApi";

export const noteApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSingleUserNotes: build.query({
      query: () => ({
        url: "/notes/all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleUserNotesQuery } = noteApi;
