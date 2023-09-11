import { createSlice } from '@reduxjs/toolkit';
import { API_MOVIES } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  entry: null,
  status: 'idle',
  error: false,
  message: '',
};

// Create Slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMoviesState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_MOVIES.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_MOVIES.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_MOVIES.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_MOVIES.GET_SINGLE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_MOVIES.GET_SINGLE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload;
      })
      .addCase(API_MOVIES.GET_SINGLE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_MOVIES.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_MOVIES.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_MOVIES.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_MOVIES.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_MOVIES.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index] = payload;
        // newArray[index].title = payload?.title;
        state.items = newArray;
      })
      .addCase(API_MOVIES.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_MOVIES.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_MOVIES.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_MOVIES.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

// Create Actions
export const { resetMoviesState } = moviesSlice.actions;

// Create Reducer
export const moviesReducer = moviesSlice.reducer;

// Create Selector
export const moviesSelector = ({ movies }) => movies;
