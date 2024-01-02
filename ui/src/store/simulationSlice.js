import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { rulesetsApi } from "./ruleSetsSlice";
import { layoutsApi } from "./layOutsSlice";
import RulesEngine from "../services/RulesEngine";

export const runSimulation = createAsyncThunk(
  "simulation/runSimulation",
  async ({ rulesetId, layoutId, maxIterations }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { data: ruleset } = await dispatch(
      rulesetsApi.endpoints.getRuleSetById.initiate(rulesetId)
    );
    const { data: layout } = await dispatch(
      layoutsApi.endpoints.getLayoutByID.initiate(layoutId)
    );
    const rulesEngine = new RulesEngine(ruleset, layout, maxIterations);

    rulesEngine.buildEngine();
    await rulesEngine.runSimulation();

    console.log('moves', rulesEngine.moves())

    return {
      grid: layout.cells,
      succeeded: rulesEngine.succeeded(),
      moves: rulesEngine.moves(),
    };
  }
);

export const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    loading: false,
    error: null,
    grid: null,
    moves: [],
    succeeded: null,
    rulesets: [],
  },
  extraReducers: (builder) => {
    builder.addCase(runSimulation.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.grid = null;
      state.moves = [];
      state.succeeded = null;
    });

    builder.addCase(runSimulation.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
      state.grid = action.payload.grid;
      state.moves = action.payload.moves;
      state.succeeded = action.payload.succeeded;
      state.rulesets = action.payload.rulesets;
    });

    builder.addCase(runSimulation.rejected, (state, action) => {
      state.error = "Ope!";
    });
  },
});

export default simulationSlice.reducer;
