type ProfileVerificationStatus = "PENDING" | "APPROVED" | "REJECTED" | string;

interface ProfessionalData {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  currentRole: string;
  hospitalOrInstitute: string;
  specialty: string;
  professionalExperience: number;
  postgraduateDegree: string;
  country: string;
  isConditionAccepted: boolean;
  profileVerification: ProfileVerificationStatus;
  createdAt: string;
  updatedAt: string;
}

interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetMentorsResponse {
  success: boolean;
  message: string;
  data: ProfessionalData[];
  meta: Meta;
}

export interface GetMentorsParams {
  searchTerm?: string;
  status?: string;
  page?: number;
  limit?: number;
}
