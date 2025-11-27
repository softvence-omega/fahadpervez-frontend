import { baseAPI } from "@/store/api/baseApi";
import { CreatePlanPayload, PricePlanResponse } from "./types/plan";

export const pricePlanApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllPricePlan: build.query<PricePlanResponse, void>({
      query: () => ({
        url: `/pricing_plan`,
        method: "GET",
      }),
      providesTags: ["PricePlan"],
    }),
    postPricePlan: build.mutation<void, CreatePlanPayload>({
      query: (data) => ({
        url: `/pricing_plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PricePlan"],
    }),
    updatePricePlan: build.mutation<
      void,
      { id: string; data: CreatePlanPayload }
    >({
      query: ({ id, data }) => ({
        url: `/pricing_plan/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PricePlan"],
    }),
    deletePricePlan: build.mutation<void, string>({
      query: (id) => ({
        url: `/pricing_plan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PricePlan"],
    }),
  }),
});

export const {
  useGetAllPricePlanQuery,
  usePostPricePlanMutation,
  useUpdatePricePlanMutation,
  useDeletePricePlanMutation,
} = pricePlanApi;
