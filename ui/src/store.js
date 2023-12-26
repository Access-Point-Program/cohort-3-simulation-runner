import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './store/settingsSlice';
import simulationReducer from './store/simulationSlice';
import {rulesetsApi} from './store/ruleSetsSlice';
import {layoutsApi} from './store/layOutsSlice';

export const store = configureStore({
  reducer: {
    // Redux Slice
    settings: settingsReducer,
    simulation: simulationReducer,
    // API Slice
    [rulesetsApi.reducerPath]: rulesetsApi.reducer,
    [layoutsApi.reducerPath]: layoutsApi.reducer,
  },
  // Middleware is needed for using API Slices
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rulesetsApi.middleware, layoutsApi.middleware),
})