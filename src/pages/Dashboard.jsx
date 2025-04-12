import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import StudentTable from '../components/StudentTable';
import ChartView from '../components/ChartView';
import StudentCharts from '../components/StudentCharts'
// import 



const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden sm:block">
        <span><img src="../assets/logo.png" alt="" /></span>
        <h2 className="text-xl font-bold mb-6">Student Manager</h2>
        <ul className="space-y-2">
          <li className="font-medium text-blue-600">Dashboard</li>
          {/* Future links can be added here */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user.username} ({user.role})</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Table & Chart */}
        <StudentTable />
        {/* <ChartView /> */}
        <StudentCharts/>

      </main>
    </div>
  );
};

export default Dashboard;
