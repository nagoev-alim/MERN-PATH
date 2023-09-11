import { createSlice } from '@reduxjs/toolkit';

// Create Slice
const categorySlice = createSlice({
  name: 'category',
  initialState: 'notes',
  reducers: {
    setCategory: (state, { payload }) => payload,
  },
});

// Create Actions
export const { setCategory } = categorySlice.actions;

// Create Reducer
export const categoryReducer = categorySlice.reducer;

// Create Selector
export const categorySelector = ({ category }) => category;
