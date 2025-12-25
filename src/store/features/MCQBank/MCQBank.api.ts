/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";

export const mcqBankAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    gllMCQBank: build.query({
      query: ({ searchTerm, subject, system, topic, page, limit }) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;

        return {
          url: "/mcq-bank",
          method: "GET",
          params,
        };
      },
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
      query: ({ subject, system, topic, subtopic, page = 1, limit = 10 }) => ({
        url: "/study_mode_tree/all-content",
        method: "GET",
        params: { subject, system, topic, subtopic, page, limit },
      }),
    }),

    generateMCQWithFile: build.mutation({
      query: (formData: FormData) => ({
        url: "/ai_part/mcq_generator_with_file",
        method: "POST",
        body: formData,
      }),
    }),

    getAllGeneratedMCQ: build.query({
      query: () => ({
        url: `/my_content/mcqs`,
        method: "GET",
      }),
    }),

    getGeneratedMCQ: build.query({
      query: (id: string) => ({
        url: `/my_content/mcqs/${id}`,
        method: "GET",
      }),
    }),

    generateMCQ: build.mutation({
      query: (data: any) => ({
        url: "ai_part/generate-mcq",
        method: "POST",
        body: data,
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
  useGenerateMCQWithFileMutation,
  useGetAllGeneratedMCQQuery,
  useGetGeneratedMCQQuery,
  useGenerateMCQMutation,
} = mcqBankAPI;
