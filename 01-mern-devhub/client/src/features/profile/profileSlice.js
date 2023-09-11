import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api.js';

/* =============================
📦 Initial State
============================= */
const initialState = {
  entry: null,
  entries: [],
  repos: [],
  status: 'idle', // loading | success | failed
  error: false,
  message: '',
};

/* =============================
📦 Create Slice
============================= */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Reset state
    resetProfileState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Get profile
      .addCase(API.profile.me.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.me.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload.profile;
      })
      .addCase(API.profile.me.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Create user profile
      .addCase(API.profile.create.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.create.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload.profile;
      })
      .addCase(API.profile.create.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete user profile
      .addCase(API.profile.deleteAccount.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.deleteAccount.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = null;
      })
      .addCase(API.profile.deleteAccount.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Get profile by id
      .addCase(API.profile.getByUserId.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.getByUserId.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload;
      })
      .addCase(API.profile.getByUserId.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Add experience
      .addCase(API.profile.addExperience.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.addExperience.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.experience.push(payload);
      })
      .addCase(API.profile.addExperience.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete experience
      .addCase(API.profile.deleteExperience.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.deleteExperience.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.experience.push(payload);
        state.entry.experience = state.entry.experience.filter(exp => exp._id !== payload);
      })
      .addCase(API.profile.deleteExperience.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Add Education
      .addCase(API.profile.addEducation.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.addEducation.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.education.push(payload);
      })
      .addCase(API.profile.addEducation.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete Education
      .addCase(API.profile.deleteEducation.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.deleteEducation.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.education = state.entry.education.filter(exp => exp._id !== payload);
      })
      .addCase(API.profile.deleteEducation.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Get All Profiles
      .addCase(API.profile.getAll.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.getAll.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API.profile.getAll.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Get Repos
      .addCase(API.profile.getRepos.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.profile.getRepos.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.repos = payload;
      })
      .addCase(API.profile.getRepos.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

/* =============================
📦 Create Actions
============================= */
export const { resetProfileState } = profileSlice.actions;

/* =============================
📦 Create Reducer
============================= */
export const profileReducer = profileSlice.reducer;

/* =============================
📦 Create Selector
============================= */
export const profileSelector = { all: ({ profile }) => profile };

