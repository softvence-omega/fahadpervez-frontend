import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CreateContentDataType = {
  title: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  type: "exam" | "study";
  studentType: string;
};
interface StudentState {
  studentType: string;
  formData: CreateContentDataType | null;
}

const initialState: StudentState = {
  studentType: "",
  formData: null,
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
  },
});

export const { setFormData, resetFormData, setStudentType } =
  staticContentSlice.actions;

export default staticContentSlice.reducer;
