export interface FlashCard {
  flashCardId: string;
  frontText: string;
  backText: string;
  explanation: string;
  difficulty: string;
}

export interface FlashCardBank {
  _id: string;
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  studentType: string;
  type: string;
  uploadedBy: string;
  flashCards: FlashCard[];
  createdAt: string;
  updatedAt: string;
}

export interface FlashCardMeta {
  page: number;
  limit: number;
  skip: number;
  total: number;
  totalPages: number;
}

export interface SingleFlashCardApiResponse {
  success: boolean;
  message: string;
  data: FlashCardBank;
  meta: FlashCardMeta;
}

export type FlashCardInput = {
  frontText: string;
  backText: string;
  explanation: string;
  difficulty: string;
};
