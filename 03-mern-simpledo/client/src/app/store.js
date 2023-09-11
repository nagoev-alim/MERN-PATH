import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
/* =============================
📦 Custom Imports
============================= */
import { userReducer as user } from '@features/user/userSlice.js';
import { todoReducer as todo } from '@features/todo/todoSlice.js';
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
    combineReducers({
      user, todo,
    }),
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
