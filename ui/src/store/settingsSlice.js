import { createSlice } from '@reduxjs/toolkit'

// https://redux-toolkit.js.org/tutorials/quick-start
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    layoutId: null,
    rulesetId: null,
    maxIterations: 100
  },
  reducers: {
    updateLayout: (state, action) => {
        state.layoutId = action.payload;
    },
    updateRuleset: (state, action) => {
        state.rulesetId = action.payload;
    },
    updateMaxIterations: (state, action) => {
        state.maxIterations = Number(action.payload, 10);
    }
  },
})

export const { updateLayout, updateRuleset, updateMaxIterations } = settingsSlice.actions

export default settingsSlice.reducer