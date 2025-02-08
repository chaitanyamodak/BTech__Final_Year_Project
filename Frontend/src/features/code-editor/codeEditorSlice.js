import { createSlice } from "@reduxjs/toolkit";
import { CODE_SNIPPETS } from "../../views/student/code-editor/constants/codeSnippets";
import { LANGUAGE_VERSIONS } from "../../views/student/code-editor/constants/Languages";

const initialState = {
  language: "java",
  code: CODE_SNIPPETS["java"],
};

export const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const { setLanguage, setCode } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;
