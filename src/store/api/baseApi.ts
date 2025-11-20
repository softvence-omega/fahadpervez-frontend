import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders(headers) {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      headers.set("authorization", `${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQueryAPI(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    // Error toast
    if (result?.error) {
      const message =
        (result.error.data as { message?: string })?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: [
    "Student",
    "Professional",
    "Mentor",
    "Forum",
    "Questions",
    "SocialPost",
    "Mcq",
    "SingleMcq",
    "StudyModeTree",
    "Exams",
    "studentType",
    "FlashCard",
    "Notes",
  ],
  endpoints: () => ({}),
});
