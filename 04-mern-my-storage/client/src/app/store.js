import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
/* =============================
📦 Custom Imports
============================= */
import { userReducer as user } from '@features/user/userSlice.js';
import { notesReducer as notes } from '@features/notes/notesSlice.js';
import { categoryReducer as category } from '@features/category/categorySlice.js';
import { booksReducer as books } from '@features/books/booksSlice.js';
import { moviesReducer as movies } from '@features/movies/moviesSlice.js';
/* =============================
📦 Create store
============================= */
export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['category'],
    },
    combineReducers({
      category,
      user,
      notes,
      books,
      movies,
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
