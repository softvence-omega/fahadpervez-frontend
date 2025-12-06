import { baseAPI } from "@/store/api/baseApi";

export const goalAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
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

export const { useGetGoalQuery } = goalAPI;
