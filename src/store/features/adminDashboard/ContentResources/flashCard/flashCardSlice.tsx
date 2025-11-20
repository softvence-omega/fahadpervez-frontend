import { baseAPI } from "@/store/api/baseApi";
import {
  FlashCardParams,
  FlashcardResponse,
  ManualFlashCardUpload,
} from "./types/FlashCardResponse";
import {
  FlashCardInput,
  SingleFlashCardApiResponse,
} from "./types/SingleFlashCard";
export const flashCardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllFlashCards: build.query<FlashcardResponse, FlashCardParams>({
      query: (params) => ({
        url: "/flash-card/all",
        method: "GET",
        params,
      }),
      providesTags: ["FlashCard"],
    }),
    getSingleFlashCards: build.query<
      SingleFlashCardApiResponse,
      { id: string; page?: number; limit?: number }
    >({
      query: ({ id, page, limit }) => ({
        url: `/flash-card/single/${id}${
          page && limit ? `?page=${page}&limit=${limit}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["FlashCard"],
    }),
    deleteFlashCardBank: build.mutation<void, string>({
      query: (id) => ({
        url: `/flash-card/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashCard"],
    }),

    updateSingleFlashCard: build.mutation<
      void,
      { flashBankId: string; flashCardId: string; data: FlashCardInput }
    >({
      query: ({ flashBankId, flashCardId, data }) => ({
        url: `/flash-card/update/${flashBankId}/${flashCardId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),

    deleteSingleFlashCard: build.mutation<
      void,
      { flashBankId: string; flashCardId: string }
    >({
      query: ({ flashBankId, flashCardId }) => ({
        url: `/flash-card/delete-single/${flashBankId}/${flashCardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashCard"],
    }),

    manualUploadFlashCard: build.mutation<void, ManualFlashCardUpload>({
      query: (data) => ({
        url: "/flash-card/manual-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),
    bulkUploadFlashCard: build.mutation<void, FormData>({
      query: (data) => ({
        url: "/flash-card/bulk-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FlashCard"],
    }),
  }),
});

export const {
  useGetAllFlashCardsQuery,
  useBulkUploadFlashCardMutation,
  useManualUploadFlashCardMutation,
  useGetSingleFlashCardsQuery,
  useDeleteFlashCardBankMutation,
  useUpdateSingleFlashCardMutation,
  useDeleteSingleFlashCardMutation,
} = flashCardApi;
