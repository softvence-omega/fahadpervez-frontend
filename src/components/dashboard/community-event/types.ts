export interface Mentor {
  _id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email?: string;
  profile_photo: string;
  country: string;
  currentRole: string;
  hospitalOrInstitute: string;
  specialty: string;
  postgraduateDegree: string;
  professionalExperience: number;
  expertise?: string;
  languages: string[];
  skills: string[];
  availability: any[]; // Define more specifically if structure is known
  profileVerification: "PENDING" | "VERIFIED" | "REJECTED"; // Assuming possible values
  isConditionAccepted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
