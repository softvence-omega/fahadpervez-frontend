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
interface CounterState {
  contentCard: boolean;
  studentDashboard: boolean;
  addContent: boolean;
  addMCQ: boolean;
  formData: CreateContentDataType | null;
}

const initialState: CounterState = {
  contentCard: true,
  studentDashboard: false,
  addContent: false,
  addMCQ: false,
  formData: null,
};

const staticContentSlice = createSlice({
  name: "staticContent",
  initialState,
  reducers: {
    showContentCard: (state) => {
      state.contentCard = true;
      state.studentDashboard = false;
      state.addContent = false;
      state.addMCQ = false;
    },
    showStudentDashboard: (state) => {
      state.contentCard = false;
      state.studentDashboard = true;
      state.addContent = false;
      state.addMCQ = false;
    },
    showAddContent: (state) => {
      state.contentCard = false;
      state.studentDashboard = false;
      state.addContent = true;
      state.addMCQ = false;
    },
    showAddMCQ: (state) => {
      state.contentCard = false;
      state.studentDashboard = false;
      state.addContent = false;
      state.addMCQ = true;
    },

    setFormData: (state, action: PayloadAction<CreateContentDataType>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = null;
    },
  },
});

export const {
  showContentCard,
  showStudentDashboard,
  showAddContent,
  showAddMCQ,
  setFormData,
  resetFormData,
} = staticContentSlice.actions;

export default staticContentSlice.reducer;
