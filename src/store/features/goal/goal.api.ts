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
