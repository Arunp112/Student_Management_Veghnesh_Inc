import { createSlice } from '@reduxjs/toolkit';

// 🔁 Load user from localStorage (if exists)
const savedUser = localStorage.getItem('user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // ✅ Remove from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
