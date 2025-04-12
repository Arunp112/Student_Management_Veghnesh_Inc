import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const ChartView = () => {
  const  students = useSelector(state => state.students.data);
    // const students = data.students
  const classAttendance = {};
  students.forEach(student => {
    if (!classAttendance[student.class]) classAttendance[student.class] = 0;
    classAttendance[student.class] += student.attendance;
  });

  const chartData = {
    labels: Object.keys(classAttendance),
    datasets: [
      {
        label: 'Total Attendance by Class',
        data: Object.values(classAttendance),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold mb-2">Attendance Chart</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartView;
