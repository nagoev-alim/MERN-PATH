import { createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api.js';

/* =============================
📦 Initial State
============================= */
const initialState = {
  entry: null,
  entries: [],
  status: 'idle', // loading | success | failed
  error: false,
  message: '',
};

/* =============================
📦 Create Slice
============================= */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Reset state
    resetPostsState: (state) => {
      state.status = 'idle';
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Get all posts
      .addCase(API.posts.getAll.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.getAll.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = payload;
      })
      .addCase(API.posts.getAll.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Create post
      .addCase(API.posts.create.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.create.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries.push(payload);
      })
      .addCase(API.posts.create.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete post
      .addCase(API.posts.delete.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.delete.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entries = state.entries.filter((post) => post._id !== payload);
      })
      .addCase(API.posts.delete.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Like post
      .addCase(API.posts.like.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.like.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload.id);
        const newArray = [...state.entries];
        newArray[index].likes = payload.data;
        state.entries = newArray;
      })
      .addCase(API.posts.like.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Dislike post
      .addCase(API.posts.dislike.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.dislike.fulfilled, (state, { payload }) => {
        state.status = 'success';
        const index = state.entries.findIndex(entry => entry._id === payload.id);
        const newArray = [...state.entries];
        newArray[index].likes = payload.data;
        state.entries = newArray;
      })
      .addCase(API.posts.dislike.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Get post by id
      .addCase(API.posts.getById.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.getById.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry = payload;
      })
      .addCase(API.posts.getById.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Add Comment
      .addCase(API.posts.addComment.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.addComment.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.comments = payload.data;
      })
      .addCase(API.posts.addComment.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      })
      // Delete Comment
      .addCase(API.posts.deleteComment.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(API.posts.deleteComment.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.entry.comments = state.entry.comments.filter(comment => comment._id !== payload.commentId);
      })
      .addCase(API.posts.deleteComment.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = true;
        state.message = payload;
      });
  },
});

/* =============================
📦 Create Actions
============================= */
export const { resetPostsState } = postsSlice.actions;

/* =============================
📦 Create Reducer
============================= */
export const postsReducer = postsSlice.reducer;

/* =============================
📦 Create Selector
============================= */
export const postsSelector = { all: ({ posts }) => posts };


