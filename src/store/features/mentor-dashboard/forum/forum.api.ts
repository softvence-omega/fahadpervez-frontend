import { baseAPI } from "@/store/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialPostForum: build.mutation({
      query: (data) => ({
        url: "/social-post/forum/post",
        method: "POST",
        body: data,
      }),
    }),
    allForumGet: build.query({
      query: () => ({
        url: "/social-post/forum/get-all",
        method: "GET",
      }),
    }),
    singleForumGet: build.query({
      query: (id) => ({
        url: `/social-post/forum/get-single/${id}`,
        method: "GET",
      }),
    }),
    forumComentUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: `/social-post/forum/comment/${id}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useSocialPostForumMutation, useAllForumGetQuery, useSingleForumGetQuery, useForumComentUpdateMutation } = userAPI;
