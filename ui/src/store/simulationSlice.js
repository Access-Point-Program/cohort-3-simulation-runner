import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const runSimulation = createAsyncThunk(
  'simulation/runSimulation',
  async ({ rulesetId, layoutId }) => {
    // Call Ruleset By ID api endpoint
    // Call Layout By ID api endpoint
    // Run the simulation -> call something the runs the simulation
    return null;
  }
)

export const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    loading: false,
    error: null,
    results: null,
  },
  extraReducers: (builder) => {
    builder.addCase(runSimulation.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.results = null;
    });

    builder.addCase(runSimulation.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
    });

    builder.addCase(runSimulation.rejected, (state, action) => {
      state.error = 'Ope!';
    });
  },
});

export default simulationSlice.reducer;
