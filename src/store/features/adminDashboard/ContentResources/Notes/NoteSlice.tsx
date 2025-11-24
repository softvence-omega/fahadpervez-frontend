import { baseAPI } from "@/store/api/baseApi";
import { NotesResponse } from "./types/Notes";
import { UpdateNotesResponse } from "./types/updateNotes";

export const notesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getNotes: build.query<NotesResponse, string>({
      query: (id) => ({
        url: `/notes/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Notes"],
    }),
    updatedNotes: build.mutation<
      void,
      { id: string; data: UpdateNotesResponse }
    >({
      query: ({ id, data }) => ({
        url: `api/notes/download/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNotes: build.mutation<void, string>({
      query: (id) => ({
        url: `/api/notes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
    postNotes: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/notes/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  usePostNotesMutation,
  useGetNotesQuery,
  useDeleteNotesMutation,
  useUpdatedNotesMutation,
} = notesApi;
