import { baseAPI } from "@/store/api/baseApi";

export const goalAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation({
      query: (data: FormData) => {
        return {
          url: "/goal",
          method: "POST",
          body: data,
        };
      },
    }),

    getGoal: build.query({
      query: () => {
        return {
          url: "/goal",
          method: "GET",
        };
      },
    }),

    // end
  }),
});

export const { useCreateGoalMutation, useGetGoalQuery } = goalAPI;
