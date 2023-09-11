import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice.js';
import { profileReducer } from '../features/profile/profileSlice.js';
import { postsReducer } from '../features/posts/postsSlice.js';
/* =============================
📦 Create store
============================= */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});
