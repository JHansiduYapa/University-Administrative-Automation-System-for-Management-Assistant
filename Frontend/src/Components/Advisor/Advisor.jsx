import React, { useState, useEffect } from "react";
import "./Advisor.css";

const Advisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");

  // Fetch advisors from backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:9080/api/advisors")
      .then((response) => response.json())
      .then((data) => setAdvisors(data))
      .catch((error) => console.error("Error fetching advisors:", error));
  }, []);

  const filteredAdvisors = advisors.filter((advisor) => {
    const nameMatch = advisor.lecturerName
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const departmentMatch =
      searchDepartment === "" || advisor.departmentName === searchDepartment;
    return nameMatch && departmentMatch;
  });

  return (
    <div className="advisor-container">
      <h2 className="advisor-title">Advisor List</h2>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="search-input"
        />
        <select
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
          className="search-select"
        >
          <option value="">All Departments</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Interdisciplinary">Interdisciplinary</option>
        </select>
      </div>

      <table className="advisor-table">
        <thead>
          <tr>
            <th>Advisor</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvisors.map((advisor) => (
            <tr key={advisor.lecturerId}>
              <td>{advisor.lecturerName}</td>
              <td>{advisor.departmentName}</td>
              <td>{advisor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Advisor;
