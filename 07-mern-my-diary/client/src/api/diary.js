// 🔳 Imports packages
import { createAsyncThunk } from '@reduxjs/toolkit';
import  AXIOS  from '@api/api.js';
// 🔳 Custom Imports:

/**
 * @description - User async function
 * @type {object}
 */
export const API_DIARY = {
  // 🟩 Create Diary
  CREATE: createAsyncThunk('diary/create', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.post('/diary', payload);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Read All Diary
  READ_ALL: createAsyncThunk('diary/readAll', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get('/diary');
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Read Single Diary
  READ_SINGLE: createAsyncThunk('diary/readSingle', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get(`/diary/${payload}`);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Update Diary
  UPDATE: createAsyncThunk('diary/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.put(`/diary/${payload.id}`, payload.data);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Delete User
  DELETE: createAsyncThunk('diary/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.delete(`/diary/${payload}`);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};
