import { baseAPI } from "@/store/api/baseApi";

export const clinicalCaseAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllClinicalCase: build.query({
      query: () => ({
        url: "/clinical-case",
        method: "GET",
      }),
    }),

    getSingleClinicalCase: build.query({
      query: (id: string) => ({
        url: `/clinical-case/${id}`,
        method: "GET",
      }),
    }),

    generateClinicalCase: build.mutation({
      query: (caseData: any) => ({
        url: "/ai_part/create_clinical_case",
        method: "POST",
        body: caseData,
      }),
    }),

    getAllGeneratedClinicalCases: build.query({
      query: () => ({
        url: "/my_content/clinical-case",
        method: "GET",
      }),
    }),

    getSingleGeneratedClinicalCase: build.query({
      query: (id: string) => ({
        url: `/my_content/clinical-case/${id}`,
        method: "GET",
      }),
    }),
    
    // end
  }),
});

export const {
  useGetAllClinicalCaseQuery,
  useGetSingleClinicalCaseQuery,
  useGenerateClinicalCaseMutation,
  useGetAllGeneratedClinicalCasesQuery,
  useGetSingleGeneratedClinicalCaseQuery,
} = clinicalCaseAPI;
