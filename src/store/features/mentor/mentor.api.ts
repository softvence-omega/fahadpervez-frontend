import { baseAPI } from "@/store/api/baseApi";

export const mentorAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllMentor: builder.query({
      query: () => `/admin/mentors`,
    }),
    uploadMentorDocument: builder.mutation({
      query: (data) => ({
        url: `/mentor/upload-document`,
        method: "PUT",
        body: data,
      }),
    }),
    verifyMentorProfession: builder.mutation({
      query: (data) => ({
        url: `/mentor/verify-profession`,
        method: "PUT", // Assuming PUT as per context, or POST if creating. User said "Verify Profession ... api /mentor/verify-profession" without method. I will default to PUT as it's typically an update to profile.
        body: data,
      }),
    }),
    updateMentorPaymentInformation: builder.mutation({
      query: (data) => ({
        url: `/mentor/update-payment-information`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllMentorQuery,
  useUploadMentorDocumentMutation,
  useVerifyMentorProfessionMutation,
  useUpdateMentorPaymentInformationMutation,
} = mentorAPI;
