// features/drugApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drugApi = createApi({
  reducerPath: "drugApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Drug"],
  endpoints: (builder) => ({
    searchDrug: builder.query<any, string>({
      query: (name) => ({
        url: `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(
          name
        )}`,
        method: "GET",
      }),
      providesTags: ["Drug"],
    }),
    getDrugDetails: builder.query<any, string>({
      query: (rxcui) =>
        `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`,
    }),
    searchOpenFda: builder.query<any, { name: string; rxcui: string }>({
      query: ({ name }) =>
        `https://api.fda.gov/drug/label.json?search=brand_name:${encodeURIComponent(
          name
        )} OR generic_name:${encodeURIComponent(name)}&limit=1`,
    }),
  }),
});

export const {
  useSearchDrugQuery,
  useGetDrugDetailsQuery,
  useLazyGetDrugDetailsQuery,
  useSearchOpenFdaQuery,
} = drugApi;
