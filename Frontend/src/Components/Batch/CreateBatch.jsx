import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateBatch.css";

const CreateBatch = () => {
  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [regDate, setRegDate] = useState("");
  const [studentCount, setStudentCount] = useState("");

  // Convert yyyy-mm-dd to dd/MM/yyyy
  const convertDate = (dateString) => {
    const parts = dateString.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  // Fetch batches from the backend API using Axios
  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = () => {
    axios
      .get("http://localhost:9080/api/batches")
      .then((response) => {
        console.log(response)
        setBatches(response.data);
      })
      .catch((error) => console.error("Error fetching batches:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      batchName,
      regDate: convertDate(regDate), // Convert the date format before sending
      studentCount: parseInt(studentCount, 10)
    };

    axios
      .post("http://localhost:9080/api/batches", newBatch, {
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        // Update the list with the newly created batch
        setBatches([...batches, response.data]);
        // Reset form fields
        setBatchName("");
        setRegDate("");
        setStudentCount("");
        setShowForm(false);
      })
      .catch((error) => console.error("Error creating batch:", error));
  };

  return (
    <div className="create-batch-page">
      <h1 className="page-title">Batch Details</h1>
      <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
        {showForm ? "Cancel" : "Create New Batch"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="batch-form">
          <div>
            <label htmlFor="batchName">Batch Name:</label>
            <input
              type="text"
              id="batchName"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="regDate">Registration Date:</label>
            <input
              type="date"
              id="regDate"
              value={regDate}
              onChange={(e) => setRegDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="studentCount">Student Count:</label>
            <input
              type="number"
              id="studentCount"
              value={studentCount}
              onChange={(e) => setStudentCount(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

      <div className="batch-list">
        {batches.map((batch, index) => (
          <div key={index} className="batch-card">
            <h3>{batch.batchName}</h3>
            <p>
              <strong>Registration Date:</strong> {batch.regDate}
            </p>
            <p>
              <strong>Student Count:</strong> {batch.studentCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateBatch;
