import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostStudyModeTree } from "../ContentResources/MCQ/types/tree";

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
  treeId: string;
  updateStudyModeTreePayload: PostStudyModeTree | null;
}

const initialState: StudentState = {
  studentType: "",
  formData: null,
  contentType: "MCQ",
  treeId: "",
  updateStudyModeTreePayload: null,
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
    setTreeId: (state, action: PayloadAction<string>) => {
      state.treeId = action.payload;
    },
    setUpdateStudyModeTreePayload: (
      state,
      action: PayloadAction<PostStudyModeTree>
    ) => {
      state.updateStudyModeTreePayload = action.payload;
    },
  },
});

export const {
  setFormData,
  resetFormData,
  setStudentType,
  setContentType,
  setTreeId,
  setUpdateStudyModeTreePayload,
} = staticContentSlice.actions;

export default staticContentSlice.reducer;
