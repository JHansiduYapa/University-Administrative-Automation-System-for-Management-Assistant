import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Advisee.css";

const Advisee = () => {
  const [advisorInfos, setAdvisorInfos] = useState([]);

  useEffect(() => {
    const fetchAdvisorInfo = async () => {
      try {
        const response = await axios.get("http://localhost:9080/api/advisor-info");
        setAdvisorInfos(response.data);
      } catch (error) {
        console.error("Error fetching advisor info:", error);
      }
    };

    fetchAdvisorInfo();
  }, []);

  return (
    <div className="advisee-container">
      <h2>Advisor-Student Mapping</h2>
      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Lecturer Name</th>
            </tr>
          </thead>
          <tbody>
            {advisorInfos.map((info, index) => (
              <tr key={index}>
                <td>{info.studentId}</td>
                <td>{info.studentName}</td>
                <td>{info.lecturerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advisee;
