import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
/* =============================
📦 Custom Imports
============================= */
import { userReducer as user } from '@features/user/userSlice.js';
import { categoriesReducer as categories } from '@features/categories/categoriesSlice.js';
import { bookmarksReducer as bookmarks } from '@features/bookmarks/bookmarksSlice.js';
/* =============================
📦 Create store
============================= */
export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage,
      whitelist: [],
    },
    combineReducers({ categories, user, bookmarks }),
  ),
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

/* =============================
📦 Create persist store
============================= */
export const storePersist = persistStore(store);
