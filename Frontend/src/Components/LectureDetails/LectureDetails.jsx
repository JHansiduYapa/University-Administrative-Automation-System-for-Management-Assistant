import React, { useState } from "react";
import "./LectureDetails.css";

const LectureDetails = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const lecturers = [
    {
      id: 1,
      name: "Dr. (Mrs.) P. Jeyananthan",
      qualifications: "B.Sc (Hons) in Computer Science (Jaffna), PhD (Southampton, UK)",
      post: "Senior Lecturer Grade II",
      department: "Computer Engineering",
      email: "pratheeba@eng.jfn.ac.lk",
      phone: "+94-21-228-2211",
    },
    {
      id: 2,
      name: "Prof. A. John",
      qualifications: "B.Sc, M.Sc, PhD",
      post: "Professor",
      department: "Civil Engineering",
      email: "john@eng.jfn.ac.lk",
      phone: "+94-21-228-2212",
    },
    {
      id: 3,
      name: "Dr. B. Smith",
      qualifications: "B.Sc, PhD",
      post: "Senior Lecturer",
      department: "Mechanical Engineering",
      email: "smith@eng.jfn.ac.lk",
      phone: "+94-21-228-2213",
    },
  ];

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  return (
    <div className="lecture-details-page">
      <h1 className="page-title">Lecture Details</h1>

      {/* Department Dropdown */}
      <div className="filter-section">
        <label htmlFor="department-filter">Department:</label>
        <select id="department-filter" onChange={handleDepartmentChange}>
          <option value="all">All</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical and Electronic Engineering">Electrical and Electronic Engineering</option>
          <option value="Interdisciplinary">Interdisciplinary Unit</option>
        </select>
      </div>

      {/* Lecturer Cards */}
      <div className="lecturer-cards">
        {lecturers
          .filter((lecturer) => selectedDepartment === "all" || lecturer.department === selectedDepartment)
          .map((lecturer) => (
            <div key={lecturer.id} className="lecturer-card">
              <div className="lecturer-info">
                <h3>{lecturer.name}</h3>
                <p><strong>Qualifications:</strong> {lecturer.qualifications}</p>
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
