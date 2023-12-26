import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {rulesetsApi} from './ruleSetsSlice';
import {layoutsApi} from './layOutsSlice';

export const runSimulation = createAsyncThunk(
  'simulation/runSimulation',
  async ({ rulesetId, layoutId }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { data: ruleset, isSuccess: rulesetIsSuccess} = await dispatch(rulesetsApi.endpoints.getRuleSetById.initiate(rulesetId));
    if (!rulesetIsSuccess) {
      throw 'SCREAMS rulesets';
    }

    const { data: layout, isSuccess: layoutIsSuccess} = await dispatch(layoutsApi.endpoints.getLayoutByID.initiate(layoutId));
    if (!layoutIsSuccess) {
      throw 'SCREAMS layouts';
    }

    /*
      TODOs
      1. Update the layouts mock to have the correct data for get layout by ID
        - https://github.com/Access-Point-Program/cohort-3-factory-layout-admin
      2. Update the Java Code to return that real data 
      3. Build rules engine 
      4. Run rules engine
      5. return the results
     */

    return {
      ruleset,
      layout
    };
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
