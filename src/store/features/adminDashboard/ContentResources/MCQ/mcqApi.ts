import { baseAPI } from "@/store/api/baseApi";
import {
  AllContentMCQList,
  ClinicalCaseTreeResponse,
} from "./types/allContent";
import { ManualMCQBank, UploadImageResponse } from "./types/manual";
import { GetAllMcqResponse, McqBankParams } from "./types/mcq";
import { SingleMcqData, SingleMCQUpdatePayload } from "./types/singleMcq";
import { SingleMCQResponse } from "./types/singleMcqBank";
import { CreateProfileTypePayload, ProfileTypeResponse } from "./types/student";
import { GetExamsResponse, PostExam, PostStudyModeTree } from "./types/tree";
import { GetStudyModeTree } from "./types/TreeResponse";

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

    // for mcq bank
    deleteMcqBankApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/mcq-bank/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mcq", "StudyModeTree", "SingleMcq", "Exams"],
    }),
    // for mcq bank
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
    uploadSingleImage: build.mutation<UploadImageResponse, FormData>({
      query: (data) => ({
        url: `/aws/upload-single-image`,
        method: "POST",
        body: data,
      }),
    }),

    // for single  mcq
    getSingleMcq: build.query<
      SingleMCQResponse,
      { id: string; page?: number; limit?: number }
    >({
      query: ({ id, page, limit }) => ({
        url: `/mcq-bank/${id}${
          page && limit ? `?page=${page}&limit=${limit}` : ""
        }`,
        method: "GET",
      }),
      providesTags: ["SingleMcq"],
    }),

    deleteSingleMcqApi: build.mutation<
      void,
      { mcqBankId: string; mcqId: string }
    >({
      query: ({ mcqBankId, mcqId }) => ({
        url: `/mcq-bank/single/${mcqBankId}/${mcqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SingleMcq", "Mcq", "StudyModeTree", "Exams"],
    }),
    updatedSingleMcqApi: build.mutation<
      void,
      { data: SingleMCQUpdatePayload; mcqBankId: string; mcqId: string }
    >({
      query: ({ data, mcqBankId, mcqId }) => ({
        url: `/mcq-bank/${mcqBankId}/question/${mcqId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SingleMcq", "Mcq", "StudyModeTree", "Exams"],
    }),

    //student type get and post

    getStudentTypeApi: build.query<ProfileTypeResponse, void>({
      query: () => ({
        url: "/profile_type_const/all",
        method: "GET",
      }),
      providesTags: ["studentType"],
    }),

    createStudentTypeApi: build.mutation<void, CreateProfileTypePayload>({
      query: (data) => ({
        url: "/profile_type_const/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["studentType"],
    }),
    updateStudentTypeApi: build.mutation<
      void,
      { _id: string; typeName: string }
    >({
      query: ({ _id, typeName }) => ({
        url: `/profile_type_const/update/${_id}`,
        method: "PATCH",
        body: { typeName },
      }),
      invalidatesTags: ["studentType"],
    }),

    deleteStudentTypeApi: build.mutation<void, string>({
      query: (id) => ({
        url: `/profile_type_const/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["studentType"],
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
      AllContentMCQList | ClinicalCaseTreeResponse,
      {
        key: string;
        subject: string;
        system?: string;
        topic?: string;
        subtopic?: string;
      }
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
      providesTags: [
        "StudyModeTree",
        "Exams",
        "SingleMcq",
        "Mcq",
        "FlashCard",
        "studentType",
        "ClinicalCase",
      ],
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
      invalidatesTags: [
        "StudyModeTree",
        "Exams",
        "SingleMcq",
        "Mcq",
        "studentType",
      ],
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

    getSingleUserReport: build.query({
      query: () => ({
        url: `/report/all-reporter`,
        method: "GET",
      }),
    }),
    //end
  }),
  overrideExisting: false,
});

export const {
  useGetMcqApiQuery,
  useGetSingleMcqApiQuery,
  useUploadBulkMcqApiMutation,
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
  useCreateStudentTypeApiMutation,
  useUpdateStudentTypeApiMutation,
  useDeleteStudentTypeApiMutation,
  useGetStudentTypeApiQuery,
  useUploadSingleImageMutation,
  useDeleteSingleMcqApiMutation,
  useGetSingleMcqQuery,
  useDeleteMcqBankApiMutation,
  useUpdatedSingleMcqApiMutation,
  useGetSingleUserReportQuery,
} = mcqApi;
