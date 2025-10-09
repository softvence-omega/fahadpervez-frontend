import { baseAPI } from "@/store/api/baseApi";
import { IQuestion } from "./question.type";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialQuestionPost: build.mutation({
      query: (data) => ({
        url: "/social-post/question/post",
        method: "POST",
        body: data,
      }),
    }),
    allQuestionGet: build.query<IQuestion[], void>({
      query: () => ({
        url: "/social-post/question/get-all",
        method: "GET",
      }),
      transformResponse: (response: { success: boolean; data: IQuestion[] }) => response.data,
    }),
    questionUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: `/social-post/question/post-answer/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useSocialQuestionPostMutation,
  useAllQuestionGetQuery,
  useQuestionUpdateMutation,
} = userAPI;
