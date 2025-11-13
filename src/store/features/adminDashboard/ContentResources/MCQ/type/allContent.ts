// Individual MCQ option
export type MCQOption = {
  option: string; //
  optionText: string;
  explanation?: string;
};

// Individual MCQ
export type MCQ = {
  mcqId: string;
  difficulty: "Basics" | "Intermediate" | "Advance";
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: string;
};

// Pagination metadata
export type Meta = {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
};

// API response for fetching MCQs
export type AllContentMCQList = {
  success: boolean;
  message: string;
  data: MCQ[];
  meta: Meta;
};
