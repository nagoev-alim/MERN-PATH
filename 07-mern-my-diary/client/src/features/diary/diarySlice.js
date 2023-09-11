// 🔳 Imports:
import { createSlice } from '@reduxjs/toolkit';
import { API_USER } from '@api/user.js';
import { API_DIARY } from '@api/diary.js';

/**
 * @description - 🟨 Create initial state
 * @type {object}
 */
const initialState = {
  entries: [],
  entry: null,
  status: 'idle',
  error: false,
  message: '',
};

/**
 * @description - 🟨 Create Slice
 * @type {object}
 */
const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    resetDiaryState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟥 CREATE DIARY
      .addCase(API_DIARY.CREATE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_DIARY.CREATE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.entries.push(payload);
      })
      .addCase(API_DIARY.CREATE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 READ ALL DIARY
      .addCase(API_DIARY.READ_ALL.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_DIARY.READ_ALL.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.entries = payload;
      })
      .addCase(API_DIARY.READ_ALL.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 READ SINGLE DIARY
      .addCase(API_DIARY.READ_SINGLE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_DIARY.READ_SINGLE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.entry = payload;
      })
      .addCase(API_DIARY.READ_SINGLE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 UPDATE DIARY
      .addCase(API_DIARY.UPDATE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_DIARY.UPDATE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        const index = state.entries.findIndex(entry => entry._id === payload._id);
        const newArray = [...state.entries];
        newArray[index] = payload;
      })
      .addCase(API_DIARY.UPDATE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 DELETE DIARY
      .addCase(API_DIARY.DELETE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_DIARY.DELETE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.entries = state.entries.filter(entry => entry._id !== payload._id);
      })
      .addCase(API_DIARY.DELETE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
  },
});

const similarActions = {
  pending: (state) => {
    state.status = 'loading';
  },
  fulfilled: (state) => {
    state.status = 'success';
  },
  rejected: (state, payload) => {
    state.status = 'failed';
    state.error = true;
    state.message = payload;
  },
};

// 🟪 Create Actions
export const { resetDiaryState } = diarySlice.actions;

// 🟪 Create Reducer
export const diaryReducer = diarySlice.reducer;

// 🟪 Create Selector
export const diarySelector = ({ diary }) => diary;

