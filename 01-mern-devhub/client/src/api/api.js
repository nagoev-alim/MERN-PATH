import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

/* =============================
📦 Axios Config
============================= */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* =============================
📦 API Config
============================= */
export const API = {
  // 📦 Auth services
  auth: {
    register: createAsyncThunk(
      'auth/register',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.post('/users/register', payload);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    login: createAsyncThunk(
      'auth/login',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.post('/users/login', payload);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    getUser: createAsyncThunk(
      'auth/getUser',
      async (_, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.get('/users', headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
  },

  // 📦 Profile services
  profile: {
    me: createAsyncThunk(
      'profile/me',
      async (_, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.get('/profile/me', headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    create: createAsyncThunk(
      'profile/create',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.post('/profile', payload, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    deleteAccount: createAsyncThunk(
      'profile/deleteAccount',
      async (_, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.delete('/profile', headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    getAll: createAsyncThunk(
      'profile/getAll',
      async (_, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.get('/profile');
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    getByUserId: createAsyncThunk(
      'profile/getByUserId',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.get(`/profile/user/${payload}`);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    addExperience: createAsyncThunk(
      'profile/addExperience',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.put(`/profile/experience`, payload, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    deleteExperience: createAsyncThunk(
      'profile/deleteExperience',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          await axiosInstance.delete(`/profile/experience/${payload}`, headers(token));
          return payload;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    addEducation: createAsyncThunk(
      'profile/addEducation',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.put(`/profile/education`, payload, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    deleteEducation: createAsyncThunk(
      'profile/deleteEducation',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          await axiosInstance.delete(`/profile/education/${payload}`, headers(token));
          return payload;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    getRepos: createAsyncThunk(
      'profile/getRepos',
      async (payload, { rejectWithValue }) => {
        try {
          const { data } = await axiosInstance.get(`/profile/github/${payload}`);
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
  },

  // 📦 Posts services
  posts: {
    getAll: createAsyncThunk(
      'posts/getAll',
      async (_, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.get('/posts', headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    create: createAsyncThunk(
      'posts/create',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.post('/posts', payload, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    delete: createAsyncThunk(
      'posts/delete',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          await axiosInstance.delete(`/posts/${payload}`, headers(token));
          return payload;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    like: createAsyncThunk(
      'posts/like',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.put(`/posts/like/${payload}`, '', headers(token));
          return { id: payload, data };
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    dislike: createAsyncThunk(
      'posts/dislike',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.put(`/posts/dislike/${payload}`, '', headers(token));
          return { id: payload, data };
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    getById: createAsyncThunk(
      'posts/getById',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.get(`/posts/${payload}`, headers(token));
          return data;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    addComment: createAsyncThunk(
      'posts/addComment',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          const { data } = await axiosInstance.put(`/posts/comment/${payload.id}`, {text: payload.text}, headers(token));
          return { id: payload.id, data };
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
    deleteComment: createAsyncThunk(
      'posts/deleteComment',
      async (payload, { getState, rejectWithValue }) => {
        try {
          const token = getState().auth.token;
          await axiosInstance.delete(`/posts/comment/${payload.postId}/${payload.commentId}`, headers(token));
          return payload;
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          return rejectWithValue(message);
        }
      },
    ),
  },
};
