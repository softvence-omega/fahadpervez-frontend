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

    getMCQBankTree: build.query({
      query: () => ({
        url: `/study_mode_tree/all`,
        method: "GET",
      }),
    }),

    getMcqBySubtopic: build.query({
      query: (params) => ({
        url: "/study_mode_tree/all-content",
        method: "GET",
        params, // { subject, system, topic, subtopic }
      }),
    }),

    // end
  }),
});

export const {
  useGllMCQBankQuery,
  useGetSingleMCQQuery,
  useGetMCQBankTreeQuery,
  useGetMcqBySubtopicQuery,
} = mcqBankAPI;
