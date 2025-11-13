import { baseAPI } from "@/store/api/baseApi";
import { AllContentMCQList } from "./type/allContent";
import { ManualMCQBank } from "./type/manual";
import { GetAllMcqResponse, GetStudyModeTree, McqBankParams } from "./type/mcq";
import { SingleMcqData } from "./type/singleMcq";
import { GetExamsResponse, PostExam, PostStudyModeTree } from "./type/tree";

export const mcqApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMcqApi: build.query<GetAllMcqResponse, McqBankParams>({
      query: (params) => ({
        url: "/mcq-bank",
        method: "GET",
        params,
      }),
      providesTags: ["Mcq"],
    }),

    deleteMcqApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/mcq-bank/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mcq"],
    }),

    getSingleMcqApi: build.query<SingleMcqData, string>({
      query: (id) => ({
        url: `/mcq-bank/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: SingleMcqData;
      }) => response.data,

      providesTags: ["Mcq"],
    }),
    UploadBulkMcqApi: build.mutation<void, FormData>({
      query: (formdata) => ({
        url: `/mcq-bank/upload-bulk`,
        method: "POST",
        body: formdata,
      }),
    }),
    UploadManualMcq: build.mutation<void, ManualMCQBank>({
      query: (data) => ({
        url: `/mcq-bank/upload-manual`,
        method: "POST",
        body: data,
      }),
    }),

    // study mode
    postStudyModeTree: build.mutation<void, PostStudyModeTree>({
      query: (data) => ({
        url: `/study_mode_tree/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudyModeTree"],
    }),
    getStudyModeTree: build.query<GetStudyModeTree, void>({
      query: () => ({
        url: `/study_mode_tree/all`,
        method: "GET",
      }),
      providesTags: ["StudyModeTree"],
    }),
    getStudyModeAllContent: build.query<
      AllContentMCQList,
      { subject?: string; system?: string; topic?: string; subtopic?: string }
    >({
      query: (params) => {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return {
          url: `study_mode_tree/all-content${
            queryString ? `?${queryString}` : ""
          }`,
          method: "GET",
        };
      },
      providesTags: ["StudyModeTree"],
    }),

    updateStudyModeTree: build.mutation<
      void,
      { data: PostStudyModeTree; treeId: string }
    >({
      query: ({ data, treeId }) => ({
        url: `/study_mode_tree/update/${treeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["StudyModeTree"],
    }),
    deleteStudyModeTree: build.mutation<void, string>({
      query: (treeId) => ({
        url: `/study_mode_tree/delete/${treeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudyModeTree"],
    }),

    //exam mode
    postExam: build.mutation<void, PostExam>({
      query: (data) => ({
        url: `/exam/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Exams"],
    }),
    getExam: build.query<GetExamsResponse, void>({
      query: () => ({
        url: `/exam/all`,
        method: "GET",
      }),
      providesTags: ["Exams"],
    }),
    updateExam: build.mutation<void, { data: PostExam; examId: string }>({
      query: ({ data, examId }) => ({
        url: `/exam/update/${examId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Exams"],
    }),
    deleteExam: build.mutation<void, string>({
      query: (examId) => ({
        url: `/exam/delete/${examId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exams"],
    }),

    ReportMcq: build.mutation({
      query: (data) => ({
        url: `/mcq-bank/save-report`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMcqApiQuery,
  useGetSingleMcqApiQuery,
  useUploadBulkMcqApiMutation,
  useDeleteMcqApiMutation,
  usePostStudyModeTreeMutation,
  useGetStudyModeTreeQuery,
  useUpdateStudyModeTreeMutation,
  useDeleteStudyModeTreeMutation,
  usePostExamMutation,
  useGetExamQuery,
  useUpdateExamMutation,
  useDeleteExamMutation,
  useReportMcqMutation,
  useUploadManualMcqMutation,
  useGetStudyModeAllContentQuery,
} = mcqApi;
