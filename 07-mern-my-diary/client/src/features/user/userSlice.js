import { createSlice } from '@reduxjs/toolkit';
import { API_USER } from '@api/user.js';

/**
 * @description - Create initial state
 * @type {object}
 */
const initialState = {
  user: null,
  status: 'idle',
  error: false,
  message: '',
  isLoggedIn: false,
};

/**
 * @description - User Slice
 * @type {object}
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
    logout: () => initialState
  },
  extraReducers: builder => {
    builder
      // 🟥 REGISTER USER
      .addCase(API_USER.REGISTER.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_USER.REGISTER.fulfilled, (state) => {
        similarActions.fulfilled(state);
      })
      .addCase(API_USER.REGISTER.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 LOGIN USER
      .addCase(API_USER.LOGIN.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_USER.LOGIN.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(API_USER.LOGIN.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 READ USER
      .addCase(API_USER.READ.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_USER.READ.fulfilled, (state, { payload }) => {
        console.log(payload);
        similarActions.fulfilled(state);
        state.user = payload;
        state.isLoggedIn = true;
      })
      .addCase(API_USER.READ.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 UPDATE USER
      .addCase(API_USER.UPDATE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_USER.UPDATE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
        state.user = payload;
      })
      .addCase(API_USER.UPDATE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      })
      // 🟥 DELETE USER
      .addCase(API_USER.DELETE.pending, (state) => {
        similarActions.pending(state);
      })
      .addCase(API_USER.DELETE.fulfilled, (state, { payload }) => {
        similarActions.fulfilled(state);
      })
      .addCase(API_USER.DELETE.rejected, (state, { payload }) => {
        similarActions.rejected(state, payload);
      });
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


// 🟥 Create Actions
export const { resetUserState, logout } = userSlice.actions;

// 🟥 Create Reducer
export const userReducer = userSlice.reducer;

// 🟥 Create Selector
export const userSelector = ({ user }) => user;


