import { baseAPI } from "@/store/api/baseApi";
import { GetMcqResponse, McqBankParams } from "./type/mcq";
import { SingleMcqData } from "./type/singleMcq";

export const mcqApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMcqApi: build.query<GetMcqResponse, McqBankParams>({
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    UploadBulkMcqApi: build.mutation<any, FormData>({
      query: (formdata) => ({
        url: `/mcq-bank/upload-bulk`,
        method: "POST",
        body: formdata,
      }),
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
  useReportMcqMutation,
} = mcqApi;
