export interface FlashCardPost {
  _id: string;
  postedBy: string;
  cardCustomization: CardCustomization[];
  aiFlashCard: AiFlashCard[];
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CardCustomization {
  prompt: string;
  sectionName: string;
  maxFlash: number;
  category: string;
  level: "EASY" | "MEDIUM" | "HARD" | string; // flexible enum
  isPublic: boolean;
}

export interface AiFlashCard {
  category: string;
  topicName: string;
  level: "EASY" | "MEDIUM" | "HARD" | string;
}
export interface FlashCardResponse {
  success: boolean;
  message: string;
  data: FlashCardPost[];
  meta: null | Record<string, any>;
}
