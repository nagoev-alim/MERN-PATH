// 🔳 Imports packages
import { createAsyncThunk } from '@reduxjs/toolkit';
import  AXIOS  from '@api/api.js';
// 🔳 Custom Imports:

/**
 * @description - User async function
 * @type {object}
 */
export const API_USER = {
  // 🟩 Register User
  REGISTER: createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.post('/users/register', payload);
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Login User
  LOGIN: createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.post('/users/login', payload);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Read User
  READ: createAsyncThunk('user/read', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.get('/users');
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Update User
  UPDATE: createAsyncThunk('user/update', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.put('/users', payload);
      return data.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Delete User
  DELETE: createAsyncThunk('user/delete', async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS.delete('/users');
      return data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
  // 🟩 Logout User
  LOGOUT: createAsyncThunk('user/logout', async (payload, { rejectWithValue }) => {
    try {
      await AXIOS.post('/users/logout');
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return rejectWithValue(message);
    }
  }),
};
