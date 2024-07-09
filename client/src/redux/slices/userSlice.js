import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Initialize user as null to represent no user logged in initially
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set the logged-in user data when logging in
    },
    logout: (state) => {
      state.user = null; // Clear user data when logging out
    },
  },
});

export const { login, logout } = userSlice.actions;

// Selectors to access user and permissions
export const selectUser = (state) => state.user.user; // Selector for accessing the entire user object
export const selectPermissions = (state) => state.user.user?.permissions || []; // Selector for accessing permissions array from the user object

export default userSlice.reducer;
