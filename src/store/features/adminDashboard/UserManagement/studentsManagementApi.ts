/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseAPI } from "@/store/api/baseApi";
import {
  GetStudentsParams,
  GetStudentsResponse,
  StudentItem,
} from "./type/student/Students";

export const studentsManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query<any, void>({
      query: () => ({
        url: "/admin/overview",
        method: "GET",
      }),
    }),

    getStudentsData: build.query<GetStudentsResponse, GetStudentsParams>({
      query: (params) => ({
        url: `/admin/students`,
        method: "GET",
        params,
      }),
      providesTags: ["Student"],
    }),

    getSingleStudents: build.query<StudentItem, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: StudentItem;
      }) => response.data,
      providesTags: ["Student"],
    }),

    deleteSingleStudent: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),

  overrideExisting: false,
});

// Export hooks
export const {
  useGetDashboardDataQuery,
  useGetStudentsDataQuery,
  useGetSingleStudentsQuery,
  useDeleteSingleStudentMutation,
} = studentsManagementApi;
