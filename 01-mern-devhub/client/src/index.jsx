import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

/* =============================
📦 Custom Imports
============================= */
import { store } from './app/store.js';
import { API } from './api/api.js';
import { resetAuthState } from './features/auth/authSlice.js';
import App from './components/App.jsx';
import './index.css';

// Fetch user
if (localStorage.getItem('accessToken')) {
  store.dispatch(API.auth.getUser()).then(() => store.dispatch(resetAuthState()));
}

/* =============================
  📦 Section - Rendering:
  ============================= */
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
