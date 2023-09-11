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

export const API_EXERCISES = {
  CREATE: createAsyncThunk('exercises/create', async (payload, { rejectWithValue }) => {
    try {
      console.log(payload);
      const { data } = await axiosInstance.post('/exercises', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  GET: createAsyncThunk('exercises/get', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/exercises');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  UPDATE: createAsyncThunk('exercises/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/exercises/${payload.id}`, payload.data);
      console.log(data);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  DELETE: createAsyncThunk('exercises/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/exercises/${payload}`);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};
