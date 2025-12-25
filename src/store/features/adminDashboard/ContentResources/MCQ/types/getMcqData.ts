export interface MCQOption {
  option: string;
  optionText: string;
  explanation: string;
}

export interface MCQ {
  mcqId: string;
  difficulty: string;
  question: string;
  imageDescription: string;
  options: MCQOption[];
  correctOption: string;
}

export interface MCQData {
  _id: string;
  mcqs: MCQ[];
}

export interface GetSingleMcqData {
  success: boolean;
  message: string;
  data: MCQData;
  meta: null;
}
