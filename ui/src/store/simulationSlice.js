

import { createSlice } from "@reduxjs/toolkit";

export const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    isRunning: false,
    results: null,
  },
  reducers: {
    startSimulation: (state) => {
      state.isRunning = true;
      state.results = null; 
    },
    stopSimulation: (state) => {
      state.isRunning = false;
    },
    setSimulationResults: (state, action) => {
      state.results = action.payload;
    },
  },
});

export const { startSimulation, stopSimulation, setSimulationResults } =
  simulationSlice.actions;
export default simulationSlice.reducer;
