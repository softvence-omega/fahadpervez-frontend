export interface MCQOption {
  option: string;
  optionText: string;
  explanation: string;
}

export interface OneMCQ {
  mcqId: string;
  difficulty: string;
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: string;
}

export interface MCQData {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  studentType: string;
  subtopic: string;
  slug: string;
  type: string;
  uploadedBy: string;
  mcqs: OneMCQ[];
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
}

export interface SingleMCQResponse {
  success: boolean;
  message: string;
  data: MCQData;
  meta: Meta;
}
