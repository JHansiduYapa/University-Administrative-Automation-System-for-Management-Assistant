import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for editing a specific semester
const SemesterEdit = ({ semesterId, onEditComplete }) => {
  const [semester, setSemester] = useState({
    startDate: "",
    endDate: "",
    semesterNumber: ""
  });

  // Fetch the specific semester details when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:9080/api/semesters/${semesterId}`)
      .then((response) => {
        const data = response.data;
        setSemester({
          startDate: data.startDate,
          endDate: data.endDate,
          semesterNumber: data.semesterNumber
        });
      })
      .catch((error) => console.error("Error fetching semester:", error));
  }, [semesterId]);

  const handleChange = (e) => {
    setSemester({
      ...semester,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9080/api/semesters/${semesterId}`, semester)
      .then((response) => {
        alert("Semester updated successfully!");
        onEditComplete();
      })
      .catch((error) => {
        console.error("Error updating semester:", error);
      });
  };

  return (
    <div className="semester-edit-container">
      <h3>Edit Semester (ID: {semesterId})</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date (dd/MM/yyyy): </label>
          <input
            type="text"
            name="startDate"
            value={semester.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>End Date (dd/MM/yyyy): </label>
          <input
            type="text"
            name="endDate"
            value={semester.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Semester Number: </label>
          <input
            type="number"
            name="semesterNumber"
            value={semester.semesterNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Semester</button>
      </form>
    </div>
  );
};

// Main component for listing semesters and triggering edit functionality
const SemesterManager = () => {
  const [semesters, setSemesters] = useState([]);
  const [editingSemesterId, setEditingSemesterId] = useState(null);

  // Fetch all semesters from backend
  const fetchSemesters = () => {
    axios
      .get("http://localhost:9080/api/semesters")
      .then((response) => {
        setSemesters(response.data);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleEditClick = (semesterId) => {
    setEditingSemesterId(semesterId);
  };

  // After edit, refresh list
  const handleEditComplete = () => {
    setEditingSemesterId(null);
    fetchSemesters();
  };

  return (
    <div className="semester-list-container">
      <h2>Semester List</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Semester Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((semester) => (
            <tr key={semester.semesterId}>
              <td>{semester.semesterId}</td>
              <td>{semester.startDate}</td>
              <td>{semester.endDate}</td>
              <td>{semester.semesterNumber}</td>
              <td>
                <button onClick={() => handleEditClick(semester.semesterId)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show the edit form if a semester is being edited */}
      {editingSemesterId && (
        <SemesterEdit
          semesterId={editingSemesterId}
          onEditComplete={handleEditComplete}
        />
      )}
    </div>
  );
};

export default SemesterManager;
