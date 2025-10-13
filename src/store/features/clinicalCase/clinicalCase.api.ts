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

    // end
  }),
});

export const { useGetAllClinicalCaseQuery, useGetSingleClinicalCaseQuery } =
  clinicalCaseAPI;
