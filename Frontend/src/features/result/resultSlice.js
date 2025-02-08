import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
  codeOutput: "",
};

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setCodeOutput: (state, action) => {
      state.codeOutput = action.payload;
    },
  },
});

export const { setCode, setCodeOutput } = resultSlice.actions;

export default resultSlice.reducer;
