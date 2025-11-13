interface MCQOption {
  option: string;
  optionText: string;
  explanation?: string;
}

interface MCQ {
  difficulty: string;
  question: string;
  imageDescription?: string;
  options: MCQOption[];
  correctOption: string;
}

export interface ManualMCQBank {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  type: string;
  studentType: string;
  mcqs: MCQ[];
}
