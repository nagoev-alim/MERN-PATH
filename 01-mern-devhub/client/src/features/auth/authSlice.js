import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api.js';

/* =============================
📦 Initial State
============================= */
const initialState = {
  user: null,
  status: 'idle',
  error: false,
  message: '',
  isAuth: false,
  token: localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null,
};

/* =============================
📦 Create Slice
============================= */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reset state
    resetAuthState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    // Logout user
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = false;
      state.message = '';
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: builder => {
    builder
      // Register user
      .addCase(API.auth.register.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.auth.register.fulfilled, (state, { payload }) => {
        state.status = 'success';
      })
      .addCase(API.auth.register.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Login user
      .addCase(API.auth.login.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.auth.login.fulfilled, (state, { payload }) => {
        localStorage.setItem('accessToken', JSON.stringify(payload.token));
        state.status = 'success';
        state.isAuth = true;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(API.auth.login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Get the current user
      .addCase(API.auth.getUser.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.auth.getUser.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
        state.isAuth = true;
      })
      .addCase(API.auth.getUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

/* =============================
📦 Create Actions
============================= */
export const { resetAuthState, logout } = authSlice.actions;

/* =============================
📦 Create Reducer
============================= */
export const authReducer = authSlice.reducer;

/* =============================
📦 Create Selector
============================= */
export const authSelector = { all: ({ auth }) => auth };
