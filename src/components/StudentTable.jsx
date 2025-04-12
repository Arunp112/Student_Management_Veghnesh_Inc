import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, deleteStudent } from '../redux/studentSlice';

const StudentTable = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const students = useSelector((state) => state.students.data); // ✅ FIXED: direct array
//   const students=data.students
//   console.log('data', students)
// console.log('data',students)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Filters
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [attendanceFrom, setAttendanceFrom] = useState('');
  const [attendanceTo, setAttendanceTo] = useState('');

  // New Student Input State (admin only)
  const [newStudent, setNewStudent] = useState({
    name: '',
    roll: '',
    class: '',
    section: '',
    attendance: ''
  });

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.roll) {
      dispatch(addStudent({ ...newStudent, id: Date.now() }));
      setNewStudent({ name: '', roll: '', class: '', section: '', attendance: '' });
    } else {
      alert('Name and Roll No. are required');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  // Filter logic
  const filteredStudents = students.filter((student) => {
    const nameMatch = student.name?.toLowerCase().includes(search.toLowerCase());
    const rollMatch = student.roll?.toString().includes(search);

    return (
      (nameMatch || rollMatch) &&
      (classFilter ? student.class === classFilter : true) &&
      (sectionFilter ? student.section === sectionFilter : true) &&
      (attendanceFrom ? student.attendance >= Number(attendanceFrom) : true) &&
      (attendanceTo ? student.attendance <= Number(attendanceTo) : true)
    );
  });

  // Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  console.log('roll',currentStudents)


  const handleDownloadCSV = () => {
    const headers = ['Name', 'Roll', 'Class', 'Section', 'Attendance'];
  
    const rows = filteredStudents.map((student) => [
      student.name,
      student.roll,
      student.class,
      student.section,
      `${student.attendance}%`
    ]);
  
    // Generate CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n'; // Add headers
  
    rows.forEach(row => {
      csvContent += row.join(',') + '\n'; // Add data rows
    });
  
    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Student Table</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          className="p-2 border rounded"
          placeholder="Search Name / Roll"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Class"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Section"
          value={sectionFilter}
          onChange={(e) => setSectionFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <input
            className="p-2 border rounded w-full"
            type="number"
            placeholder="Attendance From"
            value={attendanceFrom}
            onChange={(e) => setAttendanceFrom(e.target.value)}
          />
          <input
            className="p-2 border rounded w-full"
            type="number"
            placeholder="To"
            value={attendanceTo}
            onChange={(e) => setAttendanceTo(e.target.value)}
          />
        </div>
      </div>

      {/* Admin Add Student */}
      {user.role === 'admin' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          {['name', 'roll', 'class', 'section', 'attendance'].map((field) => (
            <input
              key={field}
              className="p-2 border rounded"
              placeholder={field}
              value={newStudent[field]}
              onChange={(e) =>
                setNewStudent({ ...newStudent, [field]: e.target.value })
              }
            />
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded col-span-2 md:col-span-1"
            onClick={handleAddStudent}
          >
            Add Student
          </button>
        </div>
      )}


<div className="flex justify-end mb-4">
  <button
    onClick={handleDownloadCSV}
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Download CSV
  </button>
</div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Roll</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Attendance</th>
              {user.role === 'admin' && <th className="p-2 border">Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.roll_number}</td>
                <td className="p-2 border">{student.class}</td>
                <td className="p-2 border">{student.section}</td>
                <td className="p-2 border">{student.attendance}%</td>
                {user.role === 'admin' && (
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentTable;
