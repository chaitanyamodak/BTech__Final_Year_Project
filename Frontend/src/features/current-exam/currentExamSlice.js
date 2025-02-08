import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examId: null,
};

export const currentExamSlice = createSlice({
  name: "currentExam",
  initialState,
  reducers: {
    setExamId: (state, action) => {
      state.examId = action.payload;
    },
  },
});

export const { setExamId } = currentExamSlice.actions;

export default currentExamSlice.reducer;
