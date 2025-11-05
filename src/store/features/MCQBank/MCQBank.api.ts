import { baseAPI } from "@/store/api/baseApi";

export const mcqBankAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    gllMCQBank: build.query({
      query: () => ({
        url: "/mcq-bank",
        method: "GET",
      }),
    }),

    getSingleMCQ: build.query({
      query: ({
        id,
        page = 1,
        limit = 10,
      }: {
        id: string;
        page?: number;
        limit?: number;
      }) => ({
        url: `/mcq-bank/${id}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    // end
  }),
});

export const { useGllMCQBankQuery, useGetSingleMCQQuery } = mcqBankAPI;
