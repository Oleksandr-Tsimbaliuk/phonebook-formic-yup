import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, refreshUser, register } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        // state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(register.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logIn.pending, state => {
        // state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(logOut.pending, state => {
        // state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.error = null;
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.pending, state => {
        // state.isRefreshing = true;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        // state.isRefreshing = false;
        state.error = action.payload;
        state.isRefreshing = false;
      });
  },
  reducer: {},
});

// export default authSlice.reducer;
export const authReducer = authSlice.reducer;
