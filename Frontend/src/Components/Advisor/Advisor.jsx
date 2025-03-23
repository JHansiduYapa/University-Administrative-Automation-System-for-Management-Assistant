import React, { useState, useEffect } from "react";
import "./Advisor.css";
import jsonData from "../../data.json";

const Advisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [newAdvisor, setNewAdvisor] = useState({ name: "", department: "" });
  const [availableLecturers, setAvailableLecturers] = useState([]);

  useEffect(() => {
    if (jsonData && jsonData.lecturers) {
      setLecturers(jsonData.lecturers);
    }
  }, []);

  useEffect(() => {
    if (newAdvisor.department) {
      if (newAdvisor.department === "Interdisciplinary") {
        setAvailableLecturers(lecturers);
      } else {
        const filteredLecturers = lecturers.filter(
          lecturer => lecturer.department === newAdvisor.department
        );
        setAvailableLecturers(filteredLecturers);
      }
    } else {
      setAvailableLecturers([]);
    }
  }, [newAdvisor.department, lecturers]);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setNewAdvisor({ ...newAdvisor, department, name: "" });
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewAdvisor({ ...newAdvisor, name });
  };

  const addRow = () => {
    if (newAdvisor.name && newAdvisor.department) {
      setAdvisors([...advisors, { ...newAdvisor, id: Date.now() }]);
      setNewAdvisor({ name: "", department: "" });
    } else {
      alert("Please select both Department and Advisor Name");
    }
  };

  const deleteRow = (id) => {
    setAdvisors(advisors.filter((advisor) => advisor.id !== id));
  };

  const filteredAdvisors = advisors.filter(
    (advisor) =>
      advisor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchDepartment === "" || advisor.department === searchDepartment)
  );

  return (
    <div className="advisor-container">
      <h2 className="advisor-title">Advisor List</h2>

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
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-advisor">
        <select
          value={newAdvisor.department}
          onChange={handleDepartmentChange}
          className="department-input"
        >
          <option value="">Select Department</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Interdisciplinary">Interdisciplinary</option>
        </select>
        
        <select
          value={newAdvisor.name}
          onChange={handleNameChange}
          className="advisor-input"
          disabled={!newAdvisor.department}
        >
          <option value="">Select Advisor Name</option>
          {availableLecturers.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.name}>
              {lecturer.name}
            </option>
          ))}
        </select>
        
        <button className="add-btn" onClick={addRow}>
          ADD NEW ROW
        </button>
      </div>
    </div>
  );
};

export default Advisor;
