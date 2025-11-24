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

// OSCE
export interface LearningResource {
  resourceTitle: string;
  resourceUrl: string;
}

export interface Task {
  taskName: string;
  checklistItem: string[];
}

export interface OsceContent {
  learningResource: LearningResource;
  _id: string;
  name: string;
  description: string;
  scenario: string;
  timeLimit: string;
  candidateInstruction: string;
  patientInstruction: string;
  tasks: Task[];
  tutorial: string[];
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

export interface OsceTreeResponse {
  success: boolean;
  message: string;
  data: OsceContent[];
  meta: null;
}

// notes tree response

export interface NotesTreeResponse {
  success: boolean;
  message: string;
  data: NotesTreeItem[];
  meta: null;
}

export interface NotesTreeItem {
  _id: string;
  title: string;
  description: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  studentType: string;
  type: string;
  uploadedBy: string;
  notes: Note[];
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  fileId: string;
  fileType: string;
  fileUrl: string;
  fileName: string;
}
