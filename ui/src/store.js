import { configureStore } from '@reduxjs/toolkit'
import settingsReducer from './store/settingsSlice';
import {rulesetsApi} from './store/ruleSetsSlice';

export const store = configureStore({
  reducer: {
    // Redux Slice
    settings: settingsReducer,
    // API Slice
    [rulesetsApi.reducerPath]: rulesetsApi.reducer,
  },
  // Middleware is needed for using API Slices
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rulesetsApi.middleware),
})