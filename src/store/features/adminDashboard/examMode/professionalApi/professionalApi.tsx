import { baseAPI } from "@/store/api/baseApi";
import {
  ExamQueryParams,
  GetExamDetailsResponse,
  GetExamResponseForProfessional,
} from "./allProfessional";

export const professionalApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllExamForProfessional: build.query<
      GetExamResponseForProfessional,
      ExamQueryParams
    >({
      query: (params) => {
        return {
          url: `/exam/professional/get-all-exam`,
          method: "GET",
          params,
        };
      },
      providesTags: ["ProfessionalAllExam"],
    }),
    getSingleExamForProfessional: build.query<GetExamDetailsResponse, string>({
      query: (id) => {
        return {
          url: `/exam/professional/get-single-exam/${id}`,
          method: "GET",
        };
      },
      providesTags: ["ProfessionalAllExam"],
    }),
  }),
});

export const {
  useGetAllExamForProfessionalQuery,
  useGetSingleExamForProfessionalQuery,
} = professionalApi;
