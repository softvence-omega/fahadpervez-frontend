// Types
export interface Subject {
  name: string;
  systems: string[];
}

export interface SelectedSubject {
  subjectName: string;
  systemNames: string[];
  fullSubject: boolean;
}

export interface FormData {
  goalName: string;
  studyHoursPerDay: number;
  startDate: string;
  endDate: string;
}

export interface Goal extends FormData {
  selectedSubjects: SelectedSubject[];
  accuracy: number;
  completed: number;
  daysRemaining: number;
  totalHours: number;
}

export interface StepIndicatorProps {
  currentStep: number;
}

export interface EmptyStateProps {
  onSetGoal: () => void;
}

export interface DashboardProps {
  goal: Goal;
  onChangeGoal: () => void;
}

export interface ModalProps {
  showModal: boolean;
  currentStep: number;
  onClose: () => void;
  children: React.ReactNode;
}

export interface Step1Props {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onNext: () => void;
  onCancel: () => void;
}

export interface Step2Props {
  availableSubjects: Subject[];
  selectedSubjects: SelectedSubject[];
  onSubjectToggle: (subjectName: string) => void;
  onFullSubjectToggle: (subjectName: string) => void;
  onSystemToggle: (subjectName: string, systemName: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export interface Step3Props {
  formData: FormData;
  selectedSubjects: SelectedSubject[];
  availableSubjects: Subject[];
  calculateDuration: () => number;
  calculateTotalStudyHours: () => number;
  calculateHoursPerSystem: () => string;
  onPrevious: () => void;
  onCreate: () => void;
}
