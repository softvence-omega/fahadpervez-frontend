import { baseAPI } from "@/store/api/baseApi";
import { FlashCardResponse } from "./types/FlashCardResponse";
export const flashCardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getFlashCards: build.query<FlashCardResponse, void>({
      query: () => ({
        url: "/flash-cards",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFlashCardsQuery } = flashCardApi;
