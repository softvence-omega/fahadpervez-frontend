export interface PreparingFor {
  examName: string;
  description: string;
}

export interface Profile {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  studentType: string;
  country: string;
  university: string;
  preparingFor: PreparingFor[];
  year_of_study: string;
  dailyStreak: number;
  point: number;
  completedQuiz: any[];
  completedFlashCard: any[];
  completedCase: any[];
  badges: any[];
  connectedMentor: any[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  isDeleted: boolean;
  accountStatus: string;
  role: string;
  isVerified: boolean;
  profile_type: string;
  authType: string;
  lastOTP: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  profile_id: Profile;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetStudentsResponse {
  success: boolean;
  message: string;
  data: User[];
  meta: Meta;
}

// API response type

export interface GetStudentsParams {
  search?: string;
  year_of_study?: string;
  preparingFor?: string;
  page?: number;
  limit?: number;
}
