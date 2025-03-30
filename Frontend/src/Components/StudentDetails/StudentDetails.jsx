import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "./StudentDetails.css";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterDept, setFilterDept] = useState("");

  useEffect(() => {
    // Fetch students from the backend API using Axios
    axios
      .get("http://localhost:9080/api/student-details")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  // Filter students by departmentName if a filter is applied
  const filteredStudents = students.filter(
    (student) => filterDept === "" || student.departmentName === filterDept
  );

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>

      <div className="filters">
        <select onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Computer">Computer</option>
          <option value="Electrical and Electronic">Electrical and Electronic</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Email Address</th>
            <th>View Profile</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.studentId}>
              <td>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.departmentName}</td>
              <td>{student.semesterName}</td>
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
            <p>
              <strong>Name:</strong> {selectedStudent.firstName}{" "}
              {selectedStudent.lastName}
            </p>
            <p>
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p>
              <strong>Department:</strong> {selectedStudent.departmentName}
            </p>
            <p>
              <strong>Semester:</strong> {selectedStudent.semesterName}
            </p>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
