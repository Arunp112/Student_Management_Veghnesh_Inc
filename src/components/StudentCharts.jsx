import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const StudentCharts = () => {
  const students = useSelector((state) => state.students.data);

  // Chart 1: Students per Class
  const studentsPerClass = {};
  students.forEach((s) => {
    studentsPerClass[s.class] = (studentsPerClass[s.class] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(studentsPerClass),
    datasets: [
      {
        label: 'Students per Class',
        data: Object.values(studentsPerClass),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  // Chart 2: Attendance Pie
  const attendanceBuckets = {
    '90-100%': 0,
    '80-89%': 0,
    '70-79%': 0,
    'Below 70%': 0,
  };

  students.forEach((s) => {
    const a = parseFloat(s.attendance);
    if (a >= 90) attendanceBuckets['90-100%']++;
    else if (a >= 80) attendanceBuckets['80-89%']++;
    else if (a >= 70) attendanceBuckets['70-79%']++;
    else attendanceBuckets['Below 70%']++;
  });

  const pieData = {
    labels: Object.keys(attendanceBuckets),
    datasets: [
      {
        data: Object.values(attendanceBuckets),
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
        ],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Students Per Class</h3>
        <Bar data={barData} />
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-2">Attendance Distribution</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default StudentCharts;
