import { baseAPI } from "@/store/api/baseApi";

export const flashCardAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createFlashCard: build.mutation({
      query: (data) => ({
        url: "/flash-card",
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
        url: `/flash-card/single/${id}`,
        method: "GET",
      }),
    }),

    updateFlashCard: build.mutation({
      query: (data) => ({
        url: "/flash-card",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteFlashCard: build.mutation({
      query: (id: string) => ({
        url: `/flash-card/${id}`,
        method: "DELETE",
      }),
    }),

    getFlashCardBank: build.query({
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }) => ({
        url: "/flash-card/all",
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
  useGetFlashCardBankQuery,
} = flashCardAPI;
