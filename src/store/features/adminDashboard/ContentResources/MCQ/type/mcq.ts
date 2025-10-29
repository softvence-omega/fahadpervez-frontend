// Query parameter type
export type McqBankParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

// Single MCQ bank item
export interface McqBankItem {
  _id: string;
  mcqBankTitle: string;
  subjectName: string;
  uploadedBy: string;
  totalMcq: number;
  createdAt: string;
  updatedAt: string;
}

// Pagination metadata
export interface MetaData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Main API response
export interface GetMcqResponse {
  success: boolean;
  message: string;
  data: McqBankItem[];
  meta: MetaData;
}
