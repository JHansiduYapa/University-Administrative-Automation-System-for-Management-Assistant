import React, { useState } from "react";
import "./Advisor.css";

const Advisor = () => {
  // Initial Data
  const [advisors, setAdvisors] = useState([
    { id: 1, name: "Dr. John Doe", department: "Computer Engineering" },
    { id: 2, name: "Dr. Jane Smith", department: "Mechanical Engineering" },
    { id: 3, name: "Dr. Alice Brown", department: "Civil Engineering" },
    { id: 4, name: "Dr. Bob White", department: "Electrical Engineering" },
  ]);

  const [newAdvisor, setNewAdvisor] = useState({ name: "", department: "" });
  const [searchName, setSearchName] = useState(""); // Search by advisor name
  const [searchDepartment, setSearchDepartment] = useState(""); // Search by department

  // Handle Input Change
  const handleInputChange = (e) => {
    setNewAdvisor({ ...newAdvisor, [e.target.name]: e.target.value });
  };

  // Add a New Row
  const addRow = () => {
    if (newAdvisor.name && newAdvisor.department) {
      setAdvisors([
        ...advisors,
        { id: Date.now(), name: newAdvisor.name, department: newAdvisor.department },
      ]);
      setNewAdvisor({ name: "", department: "" });
    } else {
      alert("Please enter both Name and Department");
    }
  };

  // Delete a Specific Row
  const deleteRow = (id) => {
    setAdvisors(advisors.filter((advisor) => advisor.id !== id));
  };

  // Filter Advisors Based on Search Inputs
  const filteredAdvisors = advisors.filter(
    (advisor) =>
      advisor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchDepartment === "" || advisor.department === searchDepartment)
  );

  return (
    <div className="advisor-container">
      {/* User Profile Icon */}
      <div className="user-icon">
        <img src="https://via.placeholder.com/40" alt="User" />
      </div>

      <h2 className="advisor-title">Advisor List</h2>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Advisor Name"
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
          <option value="Computer Engineering">Computing</option>
          <option value="Civil Engineering">Civil</option>
          <option value="Mechanical Engineering">Mechanical</option>
          <option value="Electrical Engineering">Electrical</option>
        </select>
      </div>

      {/* Table */}
      <table className="advisor-table">
        <thead>
          <tr>
            <th>Advisor</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvisors.map((advisor) => (
            <tr key={advisor.id}>
              <td>{advisor.name}</td>
              <td>{advisor.department}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteRow(advisor.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Advisor Inputs */}
      <div className="add-advisor">
        <input
          type="text"
          name="name"
          placeholder="Advisor Name"
          value={newAdvisor.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newAdvisor.department}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={addRow}>
          Add New Row
        </button>
      </div>
    </div>
  );
};

export default Advisor;
