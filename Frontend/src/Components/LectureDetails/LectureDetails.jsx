import React, { useState, useEffect } from "react";
import "./LectureDetails.css";

const LectureDetails = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    // Fetch lecturers from the backend API
    fetch("http://localhost:9080/api/lecturers")
      .then((response) => response.json())
      .then((data) => {
        setLecturers(data);
      })
      .catch((error) => console.error("Error fetching lecturers:", error));
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredLecturers = selectedDepartment === "All" 
    ? lecturers 
    : lecturers.filter(lecturer => lecturer.departmentName === selectedDepartment);

  return (
    <div className="lecture-details-page">
      <h1 className="page-title">Lecture Details</h1>

      {/* Department Dropdown */}
      <div className="filter-section">
        <label htmlFor="department-filter">Department:</label>
        <select 
          id="department-filter" 
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="department-select"
        >
          <option value="All">All</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
        </select>
      </div>

      {/* Lecturer Cards */}
      <div className="lecturer-cards">
        {filteredLecturers.map((lecturer) => (
          <div key={lecturer.id} className="lecturer-card">
            <div className="lecturer-info">
              <h3>{lecturer.firstName} {lecturer.lastName}</h3>
              <p><strong>Department:</strong> {lecturer.departmentName}</p>
              <p><strong>Email:</strong> {lecturer.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureDetails;
