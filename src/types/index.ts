// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

export type TMCQBank = {
  _id: string;
  title: string;
  type: "exam" | "quiz" | "practice"; // you can adjust or extend this union
  slug: string;

  subject: string;
  topic: string;
  subtopic: string;
  system: string;

  totalMcq: number;
  uploadedBy: string;

  createdAt: string;
};

type McqOption = {
  option: string; // e.g., "A", "B", "C", "D"
  optionText: string; // text shown to the user
  explanation: string; // explanation for this option
};

export type McqQuestion = {
  mcqId: string;
  question: string; // the question text
  options: McqOption[]; // list of options
  correctOption: string; // e.g., "C"
  difficulty: "Easy" | "Medium" | "Advance"; // restrict to known levels
};
