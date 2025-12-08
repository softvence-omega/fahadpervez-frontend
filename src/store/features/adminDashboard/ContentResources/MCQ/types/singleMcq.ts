import { DifficultyLevel } from "@/types";

export interface McqOption {
  option: string;
  optionText: string;
  explanation: string;
}

export interface McqQuestion {
  difficulty: DifficultyLevel;
  question: string;
  options: McqOption[];
  correctOption: string;
}

export interface McqBankDetails {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  type: string;
  uploadedBy: string;
  mcqs: McqQuestion[];
  createdAt: string;
  updatedAt: string;
}

export interface SingleMcqData {
  success: boolean;
  message: string;
  data: McqBankDetails;
}

// single mcq updated

export type SingleMCQUpdatePayload = {
  difficulty: DifficultyLevel;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: "A" | "B" | "C" | "D";
  explanationA?: string;
  explanationB?: string;
  explanationC?: string;
  explanationD?: string;
};
