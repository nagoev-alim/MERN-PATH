import { createSlice } from '@reduxjs/toolkit';
import { API_TEMPORARY } from '@api/api.js';
import produce from 'immer';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
};
// Create Slice
const temporarySlice = createSlice({
  name: 'temporary',
  initialState,
  reducers: {
    resetTemporaryState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_TEMPORARY.CREATE.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_TEMPORARY.CREATE.fulfilled, (state, { payload }) => {
        const array = state.entries;
        array.push(payload);
        const uniqueEntries = [...new Map(array.map((item) => [item.originalUrl, item])).values()];

        state.status = 'success';
        state.entries = uniqueEntries;
      })
      .addCase(API_TEMPORARY.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_TEMPORARY.DELETE.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_TEMPORARY.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_TEMPORARY.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});
// Create Actions
export const { resetTemporaryState } = temporarySlice.actions;
// Create Reducer
export const temporaryReducer = temporarySlice.reducer;
// Create Selector
export const temporarySelector = ({ temporary }) => temporary;
