// 🔳 Imports:
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// 🔳 Custom Imports:
import './index.css';
import App from '@/App.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer as user } from '@features/user/userSlice.js';
import { modalReducer as modal } from '@features/modal/modalSlice.js';
import { diaryReducer as diary } from '@features/diary/diarySlice.js';

// 🟪 Rendering:
createRoot(document.getElementById('root')).render(
  <Provider store={configureStore({
    reducer: { user, diary },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
  })}>
    <App />
  </Provider>,
);
