import { baseAPI } from "@/store/api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/verified-account",
        method: "POST",
        body: data,
      }),
    }),

    resendOTP: build.mutation({
      query: (data) => ({
        url: "/auth/new-verification-otp",
        method: "POST",
        body: data,
      }),
    }),

    updateInitialProfile: build.mutation({
      query: (data) => ({
        url: "/auth/update-initial-profile",
        method: "PATCH",
        body: data,
      }),
    }),

    // updatePassword: build.mutation({
    //   query: (payload) => ({
    //     url: "/user/update-password",
    //     method: "PUT",
    //     body: payload,
    //   }),
    // }),

    getMe: build.mutation({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // end
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
  useGetMeMutation,
  useResendOTPMutation,
  useUpdateInitialProfileMutation,
  // useVerifyOTPMutation,
  // useRegisterMutation,
  // useUpdatePasswordMutation,
} = userAPI;
