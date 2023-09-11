import { createSlice } from '@reduxjs/toolkit';
import { API_BOOKMARKS } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
};

// Create Slice
const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    resetBookmarksState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_BOOKMARKS.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_BOOKMARKS.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_BOOKMARKS.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_BOOKMARKS.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_BOOKMARKS.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_BOOKMARKS.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_BOOKMARKS.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_BOOKMARKS.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index].title = payload?.title;
        newArray[index].url = payload?.url;
        newArray[index].category = payload?.category;
        newArray[index].categoryId = payload?.categoryId;
        state.entries = newArray;
      })
      .addCase(API_BOOKMARKS.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_BOOKMARKS.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_BOOKMARKS.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_BOOKMARKS.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});
// Create Actions
export const { resetBookmarksState } = bookmarksSlice.actions;

// Create Reducer
export const bookmarksReducer = bookmarksSlice.reducer;

// Create Selector
export const bookmarksSelector = ({ bookmarks }) => bookmarks;
