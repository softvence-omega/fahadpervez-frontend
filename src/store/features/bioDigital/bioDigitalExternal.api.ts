import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ==========================================
// 🔑 ADD YOUR BIODIGITAL API KEY HERE
// ==========================================
const BIODIGITAL_API_KEY = import.meta.env.VITE_BIODIGITAL_API_KEY; 
// const BIODIGITAL_BASE_URL = "https://services.biodigital.com/api/v2"; // Example URL, verified against standard endpoint usually
const BIODIGITAL_BASE_URL = "https://apis.biodigital.com/oauth2/v2"; // Example URL, verified against standard endpoint usually

// Interface for what we expect from BioDigital (simplified)
export interface BioDigitalContentItem {
  content_id: string; // or id
  title: string;
  description: string;
  thumbnail_url: string;
  url: string; // The viewer URL
  // Add other fields as per actual API response
  topics?: string[];
}

export const bioDigitalExternalAPI = createApi({
  reducerPath: "bioDigitalExternalAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: BIODIGITAL_BASE_URL,
    prepareHeaders: (headers) => {
      // Authentication method varies. 
      // Sometimes it's a query param (?key=...), sometimes a header.
      // We'll assume header for now, or append to query in endpoints.
      headers.set("Authorization", `Bearer ${BIODIGITAL_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    // Fetch dashboard content
    getAllModels: build.query<any, { search?: string }>({
      query: (params) => ({
        url: "/content", // Adjust endpoint based on specific BioDigital API Service
        method: "GET",
        params: {
          key: BIODIGITAL_API_KEY, // Often passed as query param
          search: params.search,
          ...params
        },
      }),
      transformResponse: (response: any) => {
        // We might need to map their response structure to our simplified model
        // This is a guess at the structure, user might need to adjust
        return response?.collection || response?.data || [];
      }
    }),

    // Get single model details if needed, though usually standard content API returns enough
    getModelDetails: build.query<any, string>({
      query: (id) => ({
        url: `/content/${id}`,
        method: "GET",
        params: {
          key: BIODIGITAL_API_KEY,
        }
      }),
    }),
  }),
});

export const { useGetAllModelsQuery, useGetModelDetailsQuery } = bioDigitalExternalAPI;
