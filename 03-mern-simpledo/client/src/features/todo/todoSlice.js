import { createSlice } from '@reduxjs/toolkit';
import { API_TODO } from '@api/api.js';

// Create initial state
const initialState = {
  entries: [],
  status: 'idle',
  error: false,
  message: '',
  currentFilter: 'all',
};
// Create Slice
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    resetTodoState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    setCurrentFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_TODO.GET.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_TODO.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API_TODO.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_TODO.CREATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_TODO.CREATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API_TODO.CREATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_TODO.UPDATE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_TODO.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index].completed = payload?.completed;
        newArray[index].title = payload?.title;
        state.items = newArray;
      })
      .addCase(API_TODO.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_TODO.DELETE.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(API_TODO.DELETE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter(entry => entry._id !== payload.deletedDoc._id);
      })
      .addCase(API_TODO.DELETE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});
// Create Actions
export const { resetTodoState, setCurrentFilter } = todoSlice.actions;
// Create Reducer
export const todoReducer = todoSlice.reducer;
// Create Selector
export const todoSelector = ({ todo }) => todo;
