import { baseAPI } from "@/store/api/baseApi";
import {
  GetStudentsParams,
  GetStudentsResponse,
} from "./type/student/Students";

export const professionalUserApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfessionalData: build.query<GetStudentsResponse, GetStudentsParams>({
      query: (params) => ({
        url: `/admin/professionals`,
        method: "GET",
        params,
      }),
      providesTags: ["professionalsProfile"],
    }),

    getSingleProfessional: build.query<any, string>({
      query: (id) => ({
        url: `/admin/professional/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: any;
      }) => response.data,
      providesTags: ["professionalsProfile"],
    }),

    deleteProfessional: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/professional/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["professionalsProfile"],
    }),
  }),

  overrideExisting: false,
});

// Export hooks
export const {
  useGetProfessionalDataQuery,
  useGetSingleProfessionalQuery,
  useDeleteProfessionalMutation,
} = professionalUserApi;
