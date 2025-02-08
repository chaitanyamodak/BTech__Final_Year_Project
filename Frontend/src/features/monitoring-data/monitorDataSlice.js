import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  monitor: {},
};

export const monitoringDataSlice = createSlice({
  name: "monitoringData",
  initialState,
  reducers: {
    setMonitoringData: (state, action) => {
      state.monitor = action.payload;
    },
  },
});

export const { setMonitoringData } = monitoringDataSlice.actions;

export default monitoringDataSlice.reducer;
