import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './reducers/jobSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
