import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // default role

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If already logged in, go to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  const handleLogin = () => {
    if (name.trim()) {
      dispatch(login({ name, role }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
