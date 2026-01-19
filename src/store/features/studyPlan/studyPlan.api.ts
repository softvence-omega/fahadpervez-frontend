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
        url: "/study_planner/all",
        method: "GET",
      }),
      providesTags: ["StudyPlan"],
    }),

    getSingleStudyPlan: build.query({
      query: (id: string) => ({
        url: `/study_planner/${id}`,
        method: "GET",
      }),
      providesTags: ["StudyPlan"],
    }),

    saveStudyPlanProgress: build.mutation({
      query: (data) => ({
        url: "/study_planner/save-progress",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["StudyPlan"],
    }),

    //end
  }),
});

export const {
  useCreateStudyPlanMutation,
  useGetStudyPlanQuery,
  useGetSingleStudyPlanQuery,
  useSaveStudyPlanProgressMutation,
} = studyPlanAPI;
