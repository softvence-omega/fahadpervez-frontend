export interface ProfileType {
  _id: string;
  typeName: string;
  totalContent: number;
  totalStudent: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileTypeResponse {
  success: boolean;
  message: string;
  data: ProfileType[];
  meta: null;
}

export interface CreateProfileTypePayload {
  typeName: string;
}
