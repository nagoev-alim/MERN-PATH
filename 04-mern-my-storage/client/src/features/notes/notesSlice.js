import { createSlice } from '@reduxjs/toolkit';
import { API_NOTES } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
};

// Create Slice
const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNotesState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Get all notes
      .addCase(API_NOTES.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_NOTES.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_NOTES.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Create new note
      .addCase(API_NOTES.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_NOTES.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_NOTES.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Update notes
      .addCase(API_NOTES.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_NOTES.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index].title = payload?.title;
        newArray[index].body = payload?.body;
        state.items = newArray;
      })
      .addCase(API_NOTES.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete Notes
      .addCase(API_NOTES.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_NOTES.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_NOTES.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

// Create Actions
export const { resetNotesState } = notesSlice.actions;

// Create Reducer
export const notesReducer = notesSlice.reducer;

// Create Selector
export const notesSelector = ({ notes }) => notes;
