import { createSlice } from '@reduxjs/toolkit';
import { API_USER } from '@api/api.js';

// Create initial state
const initialState = {
  user: null,
  status: 'idle',
  error: false,
  message: '',
  isLoggedIn: false,
};

// Create Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = false;
      state.message = '';
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(API_USER.REGISTER.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_USER.REGISTER.fulfilled, (state, { payload }) => {
        state.status = 'success';
      })
      .addCase(API_USER.REGISTER.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_USER.LOGIN.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_USER.LOGIN.fulfilled, (state, { payload }) => {
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);

        state.status = 'success';
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(API_USER.LOGIN.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_USER.GET.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_USER.GET.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(API_USER.GET.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })

      .addCase(API_USER.UPDATE.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API_USER.UPDATE.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(API_USER.UPDATE.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
  },
});

// Create Actions
export const { resetUserState, logout } = userSlice.actions;
// Create Reducer
export const userReducer = userSlice.reducer;
// Create Selector
export const userSelector = ({ user }) => user;
