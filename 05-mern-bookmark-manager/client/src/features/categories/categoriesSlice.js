import { createSlice } from '@reduxjs/toolkit';
import { API_CATEGORIES } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  entry: null,
  status: 'idle',
  error: false,
  message: '',
};

// Create Slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategoriesState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_CATEGORIES.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_CATEGORIES.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_CATEGORIES.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      .addCase(API_CATEGORIES.GET_SINGLE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_CATEGORIES.GET_SINGLE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload;
      })
      .addCase(API_CATEGORIES.GET_SINGLE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_CATEGORIES.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_CATEGORIES.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_CATEGORIES.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_CATEGORIES.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_CATEGORIES.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index] = payload;
        state.entries = newArray;
      })
      .addCase(API_CATEGORIES.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_CATEGORIES.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_CATEGORIES.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_CATEGORIES.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });

  },
});

// Create Actions
export const { resetCategoriesState } = categoriesSlice.actions;

// Create Reducer
export const categoriesReducer = categoriesSlice.reducer;

// Create Selector
export const categoriesSelector = ({ categories }) => categories;
