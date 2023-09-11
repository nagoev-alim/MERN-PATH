// 🔳 Imports:
import { createSlice } from '@reduxjs/toolkit';

/**
 * @description - 🟨 Create initial state
 * @type {object}
 */
const initialState = {
  isOpen: false,
};

/**
 * @description - 🟨 Create Slice
 * @type {object}
 */
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen =!state.isOpen;
    },
  },
  extraReducers: (builder) => {
  },
});

// 🟪 Create Actions
export const { toggleModal } = modalSlice.actions;

// 🟪 Create Reducer
export const modalReducer = modalSlice.reducer;

// 🟪 Create Selector
export const modalSelector = ({ modal }) => modal;

