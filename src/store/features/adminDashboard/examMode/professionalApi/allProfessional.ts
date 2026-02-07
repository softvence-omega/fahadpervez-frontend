// Single exam item
export interface Exam {
  _id: string;
  professionName: string;
  examName: string;
  totalQuestions: number;
  totalTime: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Pagination meta
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API response structure
export interface GetExamResponseForProfessional {
  success: boolean;
  message: string;
  data: {
    data: Exam[];
    meta: PaginationMeta;
  };
}

export interface ExamQueryParams {
  searchTerm?: string;
  subject?: string;
  professionName?: string;
  page?: number;
  limit?: number;
}

// single exam response

// MCQ option
export interface McqOption {
  option: "A" | "B" | "C" | "D";
  optionText: string;
  explanation: string;
}

// MCQ question
export interface Mcq {
  question: string;
  imageDescription: string | null;
  options: McqOption[];
  correctOption: "A" | "B" | "C" | "D";
}

// Exam entity
export interface ExamDetails {
  _id: string;
  professionName: string;
  examName: string;
  mcqs: Mcq[];
  totalQuestions: number;
  totalTime: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

// Pagination meta
export interface PaginationMeta {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
}

// API response
export interface GetExamDetailsResponse {
  success: boolean;
  message: string;
  data: {
    data: ExamDetails;
    meta: PaginationMeta;
  };
}
