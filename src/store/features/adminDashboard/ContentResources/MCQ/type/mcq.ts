// Query parameter type
export type McqBankParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

// get all MCQ bank
export interface McqBank {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  type: string;
  uploadedBy: string;
  totalMcq: number;
  createdAt: string;
}

export interface McqMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllMcqResponse {
  success: boolean;
  message: string;
  data: McqBank[];
  meta: McqMeta;
}

// get all tree for study mode
export type GetStudyModeTree = {
  success: boolean;
  message: string;
  data: SubjectData[];
  meta: null;
};

export type SubjectData = {
  _id: string;
  subjectName: string;
  systems: System[];
  createdAt: string;
  updatedAt: string;
};

export type System = {
  name: string;
  topics: Topic[];
};

export type Topic = {
  topicName: string;
  subTopics: (SubTopic | string)[];
};

export type SubTopic = {
  subtopicName: string;
};
