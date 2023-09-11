import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
/* =============================
📦 Axios Config
============================= */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

const getNewAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axiosInstance.post(`/users/refresh`, { refreshToken });
    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (error) {
    console.error(error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  }
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await getNewAccessToken();
        const accessToken = localStorage.getItem('accessToken');
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

/* =============================
📦 API
============================= */
export const API_USER = {
  REGISTER: createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/users/register', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  LOGIN: createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/users/login', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('user/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/users');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('user/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put('/users', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};

export const API_NOTES = {
  CREATE: createAsyncThunk('notes/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/notes', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('notes/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/notes');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('notes/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/${payload.id}`, payload.data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('notes/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/notes/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};

export const API_BOOKS = {
  CREATE: createAsyncThunk('books/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/books', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('books/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/books');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET_SINGLE: createAsyncThunk('books/getSingle', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/books/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('books/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/books/${payload.id}`, payload.data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('books/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/books/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};

export const API_MOVIES = {
  CREATE: createAsyncThunk('movies/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/movies', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),

  GET: createAsyncThunk('movies/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/movies', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),

  GET_SINGLE: createAsyncThunk('movies/getSingle', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/movies/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('movies/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/movies/${payload.id}`, payload.data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('movies/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/movies/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};
