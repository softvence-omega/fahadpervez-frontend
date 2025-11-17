export interface SingleMcqBank {
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
  createdAt: string;
  updatedAt: string;
}

export interface AllContentMCQList {
  success: boolean;
  message: string;
  data: SingleMcqBank[];
  meta: null;
}
