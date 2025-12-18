export interface Mentor {
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
  profileVerification: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetMentorsResponse {
  success: boolean;
  message: string;
  data: {
    meta: Meta;
    data: Mentor[];
  };
  meta: null;
}
