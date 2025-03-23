import React, { useState, useEffect } from "react";
import "./LectureDetails.css";
import jsonData from "../../data.json";

const LectureDetails = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    // Load lecturers from the JSON data
    if (jsonData && jsonData.lecturers) {
      setLecturers(jsonData.lecturers);
    }
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const filteredLecturers = selectedDepartment === "All" 
    ? lecturers 
    : lecturers.filter(lecturer => lecturer.department === selectedDepartment);

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
              <h3>{lecturer.name}</h3>
              <p><strong>Qualifications:</strong> {lecturer.qualifications.join(", ")}</p>
              <p><strong>Post:</strong> {lecturer.post}</p>
              <p className="department-text"><strong>Department:</strong> {lecturer.department}</p>
              <p><strong>Email:</strong> {lecturer.email}</p>
              <p><strong>Phone:</strong> {lecturer.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureDetails;
