import { baseAPI } from "@/store/api/baseApi";

export interface IMessage {
  type: "HumanMessage" | "AIMessage";
  content: string;
}

export interface IHistoryItem {
  checkpoint_id: string | null;
  created_at: string;
  messages: IMessage[];
}

export interface ISendQuestionPayload {
  question: string;
}

export interface ISendQuestionResponse {
  thread_id: string;
  response: string;
}

export const aiTutorAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    sendQuestion: build.mutation<ISendQuestionResponse, ISendQuestionPayload>({
      query: (data) => ({
        url: "/ai_part/ai-tutor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AITutor"],
    }),

    getHistory: build.query<IHistoryItem[], void>({
      query: () => ({
        url: "/ai_part/ai-tutor/history",
        method: "GET",
      }),
      transformResponse: (response: { data: IHistoryItem[] }) => response.data,
      providesTags: ["AITutor"],
    }),
  }),
});

export const { useSendQuestionMutation, useGetHistoryQuery } = aiTutorAPI;
