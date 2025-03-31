import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default SemesterEdit;
