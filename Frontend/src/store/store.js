import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import codeEditorReducer from "../features/code-editor/codeEditorSlice";
import currentExamReducer from "../features/current-exam/currentExamSlice";
import monitoringDataReducer from "../features/monitoring-data/monitorDataSlice";
import resultReducer from "../features/result/resultSlice";

export const store = configureStore({
  reducer: {
    authData: authReducer,
    codeEditorData: codeEditorReducer,
    currentExamData: currentExamReducer,
    monitoringData: monitoringDataReducer,
    resultData: resultReducer,
  },
});
