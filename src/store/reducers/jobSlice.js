import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
      addJob: (state, action) => {
        // const newJobs = action.payload.filter(newJob => !state.jobs.some(existingJob => existingJob.id === newJob.id));
        state.jobs.push(...action.payload);
      },
      clearJobs: (state) => {
        state.jobs = [];
      },
    },
  });
  

export const { addJob, removeJob, clearJobs } = jobSlice.actions;
export default jobSlice.reducer;
