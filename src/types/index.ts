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
