import { baseAPI } from "@/store/api/baseApi";

export const eventAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllEvents: build.query({
      query: () => ({
        url: "/events",
        method: "GET",
      }),
    }),

    //end
  }),
});

export const { useGetAllEventsQuery } = eventAPI;
