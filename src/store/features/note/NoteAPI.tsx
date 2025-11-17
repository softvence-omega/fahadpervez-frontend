import { baseAPI } from "@/store/api/baseApi";

export const noteApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getSingleUserNotes: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }) => ({
        url: "/notes/all",
        method: "GET",
        params: {
          searchTerm,
          subject,
          system,
          topic,
          page,
          limit,
        },
      }),
      // Optional: Add providesTags for cache invalidation
      // providesTags: ["Notes"],
    }),

    incrementNoteDownloadCount: build.mutation({
      query: (noteId) => ({
        url: `/notes/download/${noteId}`,
        method: "PATCH",
      }),
      // Invalidate the notes cache to refetch updated data
      invalidatesTags: ["Notes"],
    }),

    // end
  }),
});

export const { useGetSingleUserNotesQuery, useIncrementNoteDownloadCountMutation } = noteApi;
