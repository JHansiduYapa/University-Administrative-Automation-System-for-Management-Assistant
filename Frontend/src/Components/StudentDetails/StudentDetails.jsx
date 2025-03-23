import React, { useState, useEffect } from "react";
import "./StudentDetails.css";
import { FaUserCircle, FaEnvelope, FaPhone, FaHome, FaCalendar, FaUniversity, FaIdBadge, FaStar } from "react-icons/fa";
import jsonData from "../../data.json";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterDept, setFilterDept] = useState("");
  const [searchReg, setSearchReg] = useState("");

  useEffect(() => {
    // Load students from the JSON data
    if (jsonData && jsonData.students) {
      setStudents(jsonData.students);
    }
  }, []);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(
    (student) =>
      (filterDept === "" || student.department === filterDept) &&
      (searchReg === "" || student.registration_number.includes(searchReg))
  );

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>

      <div className="filters">
        <select onChange={(e) => setFilterDept(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
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
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name.split(" ")[0]} {student.name.split(" ")[1].charAt(0)}.</td>
              <td>{student.registration_number}</td>
              <td>{student.department.split(" ")[0]}</td>
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
            <p><FaIdBadge className="icon" /> <strong>Name:</strong> {selectedStudent.name}</p>
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
