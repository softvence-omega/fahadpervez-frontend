import { baseAPI } from "@/store/api/baseApi";
import { ClinicalCaseInput } from "./types/createClinicalCase";
import { SingleClinicalCaseResponse } from "./types/getClinicalCase";

export const clinicalCaseApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getClinicalCase: build.query<SingleClinicalCaseResponse, string>({
      query: (id) => ({
        url: `/clinical-case/${id}`,
        method: "GET",
      }),
      providesTags: ["ClinicalCase"],
    }),
    updateClinicalCase: build.mutation<void, string>({
      query: (id) => ({
        url: `/clinical-case/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["ClinicalCase"],
    }),
    deleteClinicalCase: build.mutation<void, string>({
      query: (id) => ({
        url: `/clinical-case/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClinicalCase"],
    }),
    createClinicalCase: build.mutation<void, ClinicalCaseInput>({
      query: (data) => ({
        url: "/clinical-case/create-new",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateClinicalCaseMutation,
  useGetClinicalCaseQuery,
  useDeleteClinicalCaseMutation,
  useUpdateClinicalCaseMutation,
} = clinicalCaseApi;
