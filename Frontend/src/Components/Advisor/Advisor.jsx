import React, { useState, useEffect } from "react";
import "./Advisor.css";
import api from "../../api/api";

const Advisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [newAdvisor, setNewAdvisor] = useState({ name: "", department: "" });
  const [availableLecturers, setAvailableLecturers] = useState([]);

  // Fetch all lecturers and filter advisors
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await api.get("/api/lecturers");
        setLecturers(response.data);
        
        // Extract only advisers (where adviserLec is true)
        const advisorsList = response.data
          .filter(lecturer => lecturer.adviserLec === true)
          .map(lecturer => ({
            id: lecturer.lecturerId,
            name: `${lecturer.firstName} ${lecturer.lastName}`,
            department: lecturer.departmentName,
          }));

        setAdvisors(advisorsList);
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchLecturers();
  }, []);

  // Update available lecturers based on selected department
  useEffect(() => {
    if (newAdvisor.department) {
      if (newAdvisor.department === "Interdisciplinary") {
        setAvailableLecturers(lecturers);
      } else {
        setAvailableLecturers(
          lecturers.filter(lecturer => lecturer.departmentName === newAdvisor.department)
        );
      }
    } else {
      setAvailableLecturers([]);
    }
  }, [newAdvisor.department, lecturers]);

  // Handle department selection
  const handleDepartmentChange = (e) => {
    setNewAdvisor({ ...newAdvisor, department: e.target.value, name: "" });
  };

  // Handle advisor name selection
  const handleNameChange = (e) => {
    setNewAdvisor({ ...newAdvisor, name: e.target.value });
  };

  // Add an advisor
  const addRow = async () => {
    console.log("searchDepartment:", searchDepartment);
    console.log("newAdvisor:", newAdvisor);
    console.log("lecturers:", lecturers);
  
    if (newAdvisor.name && newAdvisor.department) {
      try {
        const selectedLecturer = lecturers.find(
          lecturer =>
            `${lecturer.firstName} ${lecturer.lastName}` === newAdvisor.name
        );
  
        if (!selectedLecturer) {
          alert("Invalid advisor selection");
          return;
        }
  
        console.log("Selected Lecturer:", selectedLecturer.lecturerId);
  
        await api.put(`/api/lecturers/setAdviser/${selectedLecturer.lecturerId}?adviserLec=true`);
  
        // Update advisors list
        setAdvisors([...advisors, { 
          id: selectedLecturer.id, 
          name: newAdvisor.name, 
          department: selectedLecturer.departmentName 
        }]);
  
        setNewAdvisor({ name: "", department: "" });
      } catch (error) {
        console.error("Error adding advisor:", error);
      }
    } else {
      alert("Please select both Department and Advisor Name");
    }
  };
  

  // Remove an advisor
  const deleteRow = async (id) => {
    try {
      await api.put(`/api/lecturers/setAdviser/${id}?adviserLec=${false}`);
      setAdvisors(advisors.filter((advisor) => advisor.id !== id));
    } catch (error) {
      console.error("Error deleting advisor:", error);
    }
  };

  // Filter advisors based on search criteria
  const filteredAdvisors = advisors.filter(
    (advisor) =>
      advisor.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchDepartment === "" || advisor.department === searchDepartment)
  );


  return (
    <div className="advisor-container">
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
          <option value="Computer">Computer Engineering</option>
          <option value="Civil">Civil Engineering</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Electrical and Electronic">Electrical Engineering</option>
          <option value="Interdisciplinary">Interdisciplinary</option>
        </select>
      </div>

      {/* Advisors Table */}
      <table className="advisor-table">
        <thead>
          <tr>
            <th>Advisor</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvisors
          .map((advisor) => (
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

      {/* Add Advisor Section */}
      <div className="add-advisor">
        <select
          value={newAdvisor.department}
          onChange={handleDepartmentChange}
          className="department-input"
        >
          <option value="">Select Department</option>
          <option value="Computer">Computer Engineering</option>
          <option value="Civil">Civil Engineering</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Electrical and Electronic">Electrical and Electronic</option>
          <option value="Interdisciplinary">Interdisciplinary</option>
        </select>
        
        <select
          value={newAdvisor.name}
          onChange={handleNameChange}
          className="advisor-input"
          disabled={!newAdvisor.department}
        >
          <option value="">Select Advisor Name</option>
          {availableLecturers
          .filter(lecturer => lecturer.adviserLec === false)
          .map((lecturer) => (
            <option key={lecturer.id} value={`${lecturer.firstName} ${lecturer.lastName}`}>
              {lecturer.firstName} {lecturer.lastName}
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
