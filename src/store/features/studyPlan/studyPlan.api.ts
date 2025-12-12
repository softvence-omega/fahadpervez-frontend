import { baseAPI } from "@/store/api/baseApi";

const studyPlanAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createStudyPlan: build.mutation({
      query: (data) => ({
        url: "/ai_part/create-study-plan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["StudyPlan"],
    }),

    getStudyPlan: build.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["StudyPlan"],
    }),

    //end
  }),
});

export const { useCreateStudyPlanMutation, useGetStudyPlanQuery } =
  studyPlanAPI;
