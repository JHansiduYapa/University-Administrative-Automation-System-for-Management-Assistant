import React, { useState, useEffect } from "react";
import { notification } from "antd";
import "./Advisee.css";
import api from "../../api/api";

const Advisee = () => {
  const [batch, setBatch] = useState(""); // Selected batch
  const [category, setCategory] = useState("General");
  const [department, setDepartment] = useState("");

  const [batches, setBatches] = useState([]);
  const [advisees, setAdvisees] = useState([]);

  // 🔹 Fetch available batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await api.get("/api/batches");
        console.log(response.data);
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    fetchBatches();
  }, []);

  // 🔹 Fetch advisees based on selected batch & department
  useEffect(() => {
    const fetchAdvisees = async () => {
      if (!batch) return; // Don't fetch if batch is not selected
      try {
        const response = await api.get("/api/advisor-info/", {
          params: { batch, department: department || null }, // Send department only if selected
        });
        console.log(response.data);
        setAdvisees(response.data);
      } catch (error) {
        console.error("Error fetching advisees:", error);
      }
    };

    fetchAdvisees();
  }, [batch, department]);

  const reassign = async () => {
    try {
      // Making the POST request with parameters
      const response = await api.post('/api/advisor-info/distribute', null, {
        params: { batchId: batch, departmentId: department },
      });
      setAdvisees(response.data);

      // Show success notification
      notification.success({
        message: "Assigned Successfully",
        description: "Students have been distributed successfully.",
      });
    } catch (error) {
      console.error("Error distributing students:", error);
      // Show error notification
      notification.error({
        message: "Assignment Failed",
        description: "There was an error distributing the students.",
      });
    }
  };

  return (
    <div className="advisee-container">
      <h2>Advisee Page</h2>

      {/* Filters */}
      <div className="controls">
        {/* Batch Filter */}
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map((b, index) => (
            <option key={index} value={b.batchId}>
              {b.batchName}
            </option>
          ))}
        </select>

        {/* Reassign Button */}
        <button onClick={reassign}>Reassign</button>

        {/* Category Filter */}
        <button
          className={category === "General" ? "active" : ""}
          onClick={() => {
            setCategory("General");
            setDepartment(""); // Reset department when switching to General
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

        {/* Department Filter (Only for Special Category) */}
        {category === "Special" && (
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            <option value="1">Computer Engineering</option>
            <option value="3">Civil Engineering</option>
            <option value="2">Electrical Engineering</option>
            <option value="4">Mechanical Engineering</option>
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
            </tr>
          </thead>
          <tbody>
            {advisees.map((student) => (
              <tr key={student.id}>
                <td>{student.studentId}</td>
                <td>{student.studentName}</td>
                <td>{student.lecturerName || "No Advisor Assigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advisee;
