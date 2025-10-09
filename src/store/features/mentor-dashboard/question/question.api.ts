import { baseAPI } from "@/store/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialQuestionPost: build.mutation({
      query: (data) => ({
        url: "/social-post/question/post",
        method: "POST",
        body: data,
      }),
    }),
    allQuestionGet: build.query({
      query: () => ({
        url: "/social-post/question/get-all",
        method: "GET",
      }),
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

export const { useSocialQuestionPostMutation, useAllQuestionGetQuery, useQuestionUpdateMutation } = userAPI;
