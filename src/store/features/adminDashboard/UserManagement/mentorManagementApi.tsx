import { baseAPI } from "@/store/api/baseApi";
import {
  GetStudentsParams,
  GetStudentsResponse,
  StudentItem,
} from "./type/student/Students";

export const mentorManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getProfessionalsData: build.query<GetStudentsResponse, GetStudentsParams>({
      query: (params) => ({
        url: `/admin/professionals`,
        method: "GET",
        params,
      }),
      providesTags: ["Professional"],
    }),

    getSingleProfessionals: build.query<StudentItem, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: StudentItem;
      }) => response.data,
      providesTags: ["Professional"],
    }),

    deleteSingleProfessional: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professional"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetProfessionalsDataQuery,
  useGetSingleProfessionalsQuery,
  useDeleteSingleProfessionalMutation,
} = mentorManagementApi;
