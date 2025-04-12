import { createSlice } from '@reduxjs/toolkit';
import students from '../assets/students.json'; // Load initial student data

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: students.students,
  },
  reducers: {
    addStudent: (state, action) => {
      state.data.push(action.payload);
    },
    deleteStudent: (state, action) => {
      state.data = state.data.filter(s => s.id !== action.payload);
    },
  },
});

export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
