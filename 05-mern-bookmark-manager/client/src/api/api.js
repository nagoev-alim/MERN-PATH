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
  DELETE: createAsyncThunk('user/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete('/users');
      console.log(data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};

export const API_BOOKMARKS = {
  CREATE: createAsyncThunk('bookmarks/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/bookmarks', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('bookmarks/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/bookmarks');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('bookmarks/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/bookmarks/${payload.id}`, payload.data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('bookmarks/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/bookmarks/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};

export const API_CATEGORIES = {
  CREATE: createAsyncThunk('categories/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/categories', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('categories/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/categories');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET_SINGLE: createAsyncThunk('categories/getSingle', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/categories/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('categories/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/categories/${payload.id}`, payload.data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('categories/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/categories/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};
