import React, { useState } from "react";
import "./StudentDetails.css";
import { FaUserCircle, FaEnvelope, FaPhone, FaHome, FaCalendar, FaUniversity, FaIdBadge, FaStar } from "react-icons/fa"; 

const students = [
  {
    name: "John D.",
    regNumber: "2021/E/124",
    department: "Computing",
    semester: "5",
    email: "john.doe@example.com",
    fullName: "John Doe",
    dob: "1999-05-20",
    address: "123, Main Street, City",
    phone: "+94771234567",
    gpa: "3.85",
    date: "2024-03-22",
  },
  {
    name: "Jane S.",
    regNumber: "2021/E/125",
    department: "Mechanical",
    semester: "4",
    email: "jane.smith@example.com",
    fullName: "Jane Smith",
    dob: "2000-07-15",
    address: "456, Elm Street, Town",
    phone: "+94781234567",
    gpa: "3.75",
    date: "2024-03-22",
  },
];

const StudentDetails = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterDept, setFilterDept] = useState("");
  const [searchReg, setSearchReg] = useState("");

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
    (student) =>
      (filterDept === "" || student.department === filterDept) &&
      (searchReg === "" || student.regNumber.includes(searchReg))
  );

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>

      <div className="filters">
        <select onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Civil">Civil</option>
          <option value="Computing">Computing</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
        </select>
        <input
          type="text"
          placeholder="Search by Reg Number"
          onChange={(e) => setSearchReg(e.target.value)}
        />
        <button>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Email Address</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.regNumber}</td>
              <td>{student.department}</td>
              <td>{student.semester}</td>
              <td>{student.email}</td>
              <td>
                <FaUserCircle
                  className="profile-icon"
                  onClick={() => handleViewProfile(student)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Student Profile</h3>
            <p><FaIdBadge className="icon" /> <strong>Name:</strong> {selectedStudent.fullName}</p>
            <p><FaCalendar className="icon" /> <strong>DOB:</strong> {selectedStudent.dob}</p>
            <p><FaHome className="icon" /> <strong>Address:</strong> {selectedStudent.address}</p>
            <p><FaPhone className="icon" /> <strong>Phone:</strong> {selectedStudent.phone}</p>
            <p><FaEnvelope className="icon" /> <strong>Email:</strong> {selectedStudent.email}</p>
            <p><FaUniversity className="icon" /> <strong>Department:</strong> {selectedStudent.department}</p>
            <p><FaStar className="icon" /> <strong>GPA:</strong> {selectedStudent.gpa}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
