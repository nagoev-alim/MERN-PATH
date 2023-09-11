import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
};
// Create Slice
const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    resetUrlState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_URL.GET_ALL.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_URL.GET_ALL.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_URL.GET_ALL.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_URL.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_URL.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_URL.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_URL.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_URL.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_URL.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});
// Create Actions
export const { resetUrlState } = urlSlice.actions;
// Create Reducer
export const urlReducer = urlSlice.reducer;
// Create Selector
export const urlSelector = ({ url }) => url;
