// Option Type
interface Option {
  option: string;
  optionText: string;
  explanation: string;
}

// MCQ Set Type
interface MCQSet {
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  imageDescription: string | null;
  options: Option[];
  correctOption: string;
}

// MCQ Bank Data Type
export interface SingleMcqData {
  _id: string;
  mcqBankTitle: string;
  subjectName: string;
  uploadedBy: string;
  totalMcq: number;
  mcqSets: MCQSet[];
  createdAt: string;
  updatedAt: string;
}

// API Response Type
