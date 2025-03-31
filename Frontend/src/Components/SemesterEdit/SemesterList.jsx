import React, { useState, useEffect } from "react";
import axios from "axios";
import SemesterEdit from "./SemesterList"; // Import the edit component

const SemesterList = () => {
  const [semesters, setSemesters] = useState([]);
  const [editingSemesterId, setEditingSemesterId] = useState(null);

  // Fetch all semesters from backend
  useEffect(() => {
    axios
      .get("http://localhost:9080/api/semesters")
      .then((response) => {
        setSemesters(response.data);
      })
      .catch((error) => console.error("Error fetching semesters:", error));
  }, []);

  const handleEditClick = (semesterId) => {
    setEditingSemesterId(semesterId);
  };

  // After edit, refresh list
  const handleEditComplete = () => {
    setEditingSemesterId(null);
    axios
      .get("http://localhost:9080/api/semesters")
      .then((response) => {
        setSemesters(response.data);
      })
      .catch((error) => console.error("Error refreshing semesters:", error));
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

export default SemesterList;
