// Preference info inside profile
export interface Preference {
  subject: string;
  systemPreference: string;
  topic: string;
  subTopic: string;
  createdAt: string;
  updatedAt: string;
}

// Profile object
export interface Profile {
  _id: string;
  accountId: string;
  firstName: string;
  lastName?: string;
  studentType?: string;
  country?: string;
  university?: string;
  preparingFor?: string;
  bio?: string;
  year_of_study?: string;
  dailyStreak: number;
  point: number;
  profile_photo?: string;
  completedQuiz: any[];
  completedFlashCard: any[];
  completedCase: any[];
  badges: any[];
  connectedMentor: any[];
  preference?: Preference;
  createdAt: string;
  updatedAt: string;
}

// Student item
export interface StudentItem {
  _id: string;
  email: string;
  accountStatus: string;
  role?: string;
  isDeleted?: boolean;
  isVerified?: boolean;
  profile_type?: string;
  authType?: string;
  lastOTP?: string;
  isSubscribed?: boolean;
  createdAt: string;
  updatedAt: string;
  profile_id: Profile;
}

// Meta for pagination
export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API response type
export interface GetStudentsResponse {
  success: boolean;
  message: string;
  data: StudentItem[];
  meta: Meta;
}

export interface GetStudentsParams {
  search?: string;
  year_of_study?: string;
  preparingFor?: string;
  page?: number;
  limit?: number;
}
