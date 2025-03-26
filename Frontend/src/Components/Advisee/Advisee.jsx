import React, { useState, useEffect } from "react";
import "./Advisee.css";
import jsonData from "../../data.json";

const Advisee = () => {
  const [batch, setBatch] = useState(""); // Default empty to show all batches
  const [category, setCategory] = useState("General");
  const [department, setDepartment] = useState("");

  const [students, setStudents] = useState([]);
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    // Load students and advisors from JSON data
    if (jsonData) {
      setStudents(jsonData.students);
      setAdvisors(jsonData.lecturers);
    }
  }, []);

  // Get unique batches from students
  const availableBatches = [...new Set(students.map((student) => student.batch))];

  return (
    <div className="advisee-container">
      <h2>Advisee Page</h2>

      {/* Filters */}
      <div className="controls">
        {/* Batch Filter */}
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">All Batches</option>
          {availableBatches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        {/* Category Filter */}
        <button
          className={category === "General" ? "active" : ""}
          onClick={() => {
            setCategory("General");
            setDepartment(""); // Reset department for General category
          }}
        >
          General
        </button>
        <button
          className={category === "Special" ? "active" : ""}
          onClick={() => setCategory("Special")}
        >
          Special
        </button>

        {/* Department Filter (only for Special category) */}
        {category === "Special" && (
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        )}
      </div>

      {/* Student Table */}
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Advisor Name</th>
              <th>Advisor Role</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter((student) =>
                // Filter by batch
                batch === "" || student.batch === batch
              )
              .filter((student) =>
                // Filter by category and department
                category === "General"
                  ? !student.department // Show students without a main department
                  : student.department === department // Show students with the selected department
              )
              .map((student) => {
                const advisor =
                  category === "General"
                    ? advisors.find((advisor) => advisor.department === "Interdisciplinary")
                    : advisors.find((advisor) => advisor.department === student.department);

                return (
                  <tr key={student.id}>
                    <td>{student.registration_number}</td>
                    <td>{student.name}</td>
                    <td>{advisor?.name || "No Advisor Assigned"}</td>
                    <td>{advisor?.post || "N/A"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advisee;
