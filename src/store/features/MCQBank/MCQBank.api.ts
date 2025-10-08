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
      query: (id: string) => ({
        url: `/mcq-bank/${id}`,
        method: "GET",
      }),
    }),

    // end
  }),
});

export const { useGllMCQBankQuery, useGetSingleMCQQuery } = mcqBankAPI;
