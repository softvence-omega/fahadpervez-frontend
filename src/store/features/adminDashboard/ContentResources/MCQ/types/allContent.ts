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

// Clinical Case

export interface ClinicalCaseTreeResponse {
  success: boolean;
  message: string;
  data: ContentTreeItem[];
  meta: null;
}

export interface ContentTreeItem {
  _id: string;
  caseTitle: string;
  patientPresentation: string;
  historyOfPresentIllness: string;
  physicalExamination: string;
  laboratoryResults: LaboratoryResult[];
  imaging: string;
  diagnosisQuestion: DiagnosisQuestion;
  correctOption: CorrectOption;
  difficultyLevel: string;
  mcqs: MCQItem[];
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  studentType: string;
  type: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface LaboratoryResult {
  name: string;
  value: string;
}

export interface DiagnosisQuestion {
  question: string;
  diagnosisOptions: DiagnosisOption[];
}

export interface DiagnosisOption {
  optionName: string;
  optionValue: string;
  supportingEvidence: string[];
  refutingEvidence: string[];
}

export interface CorrectOption {
  optionName: string;
  explanation: string;
}

export interface MCQItem {
  question: string;
  options: MCQOption[];
  correctOption: string;
}

export interface MCQOption {
  option: string;
  optionText: string;
  explanation: string;
}
