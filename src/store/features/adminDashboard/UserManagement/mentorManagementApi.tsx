import { baseAPI } from "@/store/api/baseApi";
import { GetMentorsResponse } from "./type/mentor/mentor";
import { GetStudentsParams } from "./type/student/Students";

export const mentorManagementApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getMentorsData: build.query<GetMentorsResponse, GetStudentsParams>({
      query: (params) => ({
        url: `/admin/mentors`,
        method: "GET",
        params,
      }),
      providesTags: ["mentorsProfile"],
    }),

    getSingleMentor: build.query<any, string>({
      query: (id) => ({
        url: `/admin/mentor/${id}`,
        method: "GET",
      }),
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: any;
      }) => response.data,
      providesTags: ["mentorsProfile"],
    }),

    deleteSingleMentor: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/mentor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Professional"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetMentorsDataQuery,
  useGetSingleMentorQuery,
  useDeleteSingleMentorMutation,
} = mentorManagementApi;
