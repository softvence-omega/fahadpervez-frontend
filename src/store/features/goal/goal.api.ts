import { baseAPI } from "@/store/api/baseApi";
export interface ISelectedSubject {
  subjectName: string;
  systemNames: string[];
}

export interface ICreateGoalPayload {
  goalName: string;
  studyHoursPerDay: number;
  startDate: string;
  endDate: string;
  selectedSubjects: ISelectedSubject[];
}

export interface IGoal extends ICreateGoalPayload {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const goalAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation<IGoal, ICreateGoalPayload>({
      query: (data) => {
        return {
          url: "/goal",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Goal"],
    }),

    getGoal: build.query({
      query: () => {
        return {
          url: "/goal",
          method: "GET",
        };
      },
      providesTags: ["Goal"],
    }),

    updateGoal: build.mutation<IGoal, ICreateGoalPayload>({
      query: (data) => {
        return {
          url: "/goal",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Goal"],
    }),

    // end
  }),
});

export const { useCreateGoalMutation, useGetGoalQuery, useUpdateGoalMutation } = goalAPI;
