import { createSlice } from '@reduxjs/toolkit';
import { API_EXERCISES } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
  edit: {
    isEdit: false,
    entry: null,
  },
};

// Create Slice
const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    resetExercisesState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    setEdit: (state, { payload }) => {
      state.edit = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_EXERCISES.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_EXERCISES.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_EXERCISES.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_EXERCISES.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_EXERCISES.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        // state.entries.push(payload);
        state.entries = payload
      })
      .addCase(API_EXERCISES.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_EXERCISES.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_EXERCISES.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        // const index = state.entries.findIndex(entry => entry._id === payload._id);
        // const newArray = [...state.entries];
        // newArray[index] = payload;
        state.entries = payload;
      })
      .addCase(API_EXERCISES.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_EXERCISES.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_EXERCISES.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        // state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
        state.entries = payload;
      })
      .addCase(API_EXERCISES.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});
// Create Actions
export const { resetExercisesState, setEdit } = exercisesSlice.actions;

// Create Reducer
export const exercisesReducer = exercisesSlice.reducer;

// Create Selector
export const exercisesSelector = ({ exercises }) => exercises;
