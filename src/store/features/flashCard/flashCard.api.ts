import { baseAPI } from "@/store/api/baseApi";

export const flashCardAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createFlashCard: build.mutation({
      query: (data) => ({
        url: "/api/flash-card",
        method: "POST",
        body: data,
      }),
    }),

    getAllFlashCard: build.query({
      query: () => ({
        url: "/flash-card",
        method: "GET",
      }),
    }),

    getSingleFlashCard: build.query({
      query: (id: string) => ({
        url: `/api/flash-card/${id}`,
        method: "GET",
      }),
    }),

    updateFlashCard: build.mutation({
      query: (data) => ({
        url: "/api/flash-card",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFlashCard: build.mutation({
      query: (id: string) => ({
        url: `/api/flash-card/${id}`,
        method: "DELETE",
      }),
    }),

    // end
  }),
});

export const {
  useCreateFlashCardMutation,
  useGetAllFlashCardQuery,
  useGetSingleFlashCardQuery,
  useUpdateFlashCardMutation,
  useDeleteFlashCardMutation,
} = flashCardAPI;
