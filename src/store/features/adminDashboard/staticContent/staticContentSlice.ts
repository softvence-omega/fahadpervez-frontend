import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CreateContentDataType = {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic?: string;
  type: "exam" | "study";
  studentType: string;
};
export type ContentType =
  | "MCQ"
  | "Flashcard"
  | "ClinicalCase"
  | "OSCE"
  | "Notes";

interface StudentState {
  studentType: string;
  formData: CreateContentDataType | null;
  contentType: ContentType;
}

const initialState: StudentState = {
  studentType: "",
  formData: null,
  contentType: "MCQ",
};

const staticContentSlice = createSlice({
  name: "staticContent",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<CreateContentDataType>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = null;
    },
    setStudentType: (state, action: PayloadAction<string>) => {
      state.studentType = action.payload;
    },
    setContentType: (state, action: PayloadAction<ContentType>) => {
      state.contentType = action.payload;
    },
  },
});

export const { setFormData, resetFormData, setStudentType, setContentType } =
  staticContentSlice.actions;

export default staticContentSlice.reducer;
