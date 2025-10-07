import { baseAPI } from "@/store/api/baseApi";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    socialPostForum: build.mutation({
      query: (data) => ({
        url: "/api/social-post/forum/post",
        method: "POST",
        body: data,
      }),
    }),
    allForumGet: build.query({   // <- note the void here
      query: () => ({
        url: "/api/social-post/forum/get-all",
        method: "GET",
      }),
    })

  }),
});

export const { useSocialPostForumMutation, useAllForumGetQuery } = userAPI;
