/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";

export const mcqBankAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    gllMCQBank: build.query({
      query: ({ searchTerm, subject, system, topic, type, page, limit }) => {
        const params: any = { page, limit };

        if (searchTerm) params.searchTerm = searchTerm;
        if (subject) params.subject = subject;
        if (system) params.system = system;
        if (topic) params.topic = topic;
        if (type) params.type = type;

        return {
          url: "/mcq-bank",
          method: "GET",
          params,
        };
      },
      providesTags: ["Mcq"],
    }),

    getSingleMCQ: build.query({
      query: ({
        id,
        page = 1,
        limit = 10,
        skip,
      }: {
        id: string;
        page?: number;
        limit?: number;
        skip?: number;
      }) => {
        const params: any = { page, limit };
        if (skip !== undefined) params.skip = skip;
        return {
          url: `/mcq-bank/${id}`,
          method: "GET",
          params,
        };
      },
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
      query: ({
        searchTerm,
        subject,
        system,
        topic,
        page = 1,
        limit = 10,
      }: any) => ({
        url: `/my_content/mcqs`,
        method: "GET",
        params: { searchTerm, subject, system, topic, page, limit },
      }),
      providesTags: ["GeneratedMCQ"],
    }),

    getGeneratedMCQ: build.query({
      query: (id: string) => ({
        url: `/my_content/mcqs/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "GeneratedMCQ", id }],
    }),

    generateMCQ: build.mutation({
      query: (data: any) => ({
        url: "ai_part/generate-mcq",
        method: "POST",
        body: data,
      }),
    }),

    updateQuizTracking: build.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/my_content/update-tracking/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ({ id }) => [
        { type: "GeneratedMCQ", id },
        "GeneratedMCQ",
      ],
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
  useUpdateQuizTrackingMutation,
} = mcqBankAPI;
