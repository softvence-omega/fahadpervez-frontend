import { baseAPI } from "@/store/api/baseApi";

export const flashCardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    postNotes: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/notes/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostNotesMutation } = flashCardApi;
