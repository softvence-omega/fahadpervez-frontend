export interface Recommendations {
  articles: string[];
  flashcards: string[];
  clinicalCases: string[];
}

export interface SessionDetails {
  completed: number;
  total: number;
  correct: number;
  incorrect: number;
  recommendations: Recommendations;
  rawTimeSpent?: number;
}

export interface Session {
  id: number;
  name: string;
  source: string;
  result: string;
  progress: number;
  details?: SessionDetails;
}

export interface Stats {
  completed: string;
  correct: string;
  timePerQuestion?: string;
  totalTime: string;
  incorrect?: string;
  wrong?: string;
}
