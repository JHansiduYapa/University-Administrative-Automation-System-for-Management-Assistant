import React, { useState } from "react";
import "./Advisee.css";

const Advisee = () => {
  const [batch, setBatch] = useState("E21");
  const [category, setCategory] = useState("General");
  const [department, setDepartment] = useState("Computing");

  const students = [
    { id: "2021/E013", name: "A.J.K. Ekanayaka", department: "Computing" },
    { id: "2021/E124", name: "R.D.D.S. Rajamuni", department: "" }, // General
  ];

  const advisors = {
    General: [{ name: "Mr. Wijesakara", role: "Lecturer" }],
    Computing: [{ name: "Dr. Perera", role: "Senior Lecturer" }],
    Civil: [{ name: "Dr. Fernando", role: "Senior Lecturer" }],
    Electrical: [{ name: "Dr. Silva", role: "Professor" }],
    Mechanical: [{ name: "Dr. Kumara", role: "Senior Lecturer" }],
  };

  return (
    <div className="advisee-container">
      <div className="controls">
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="E21">E21</option>
          <option value="E22">E22</option>
          <option value="E23">E23</option>
          <option value="E24">E24</option>
        </select>

        <button
          className={category === "General" ? "active" : ""}
          onClick={() => setCategory("General")}
        >
          General
        </button>
        <button
          className={category === "Special" ? "active" : ""}
          onClick={() => setCategory("Special")}
        >
          Special
        </button>

        {category === "Special" && (
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="Computing">Computing</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
          </select>
        )}
      </div>

      <div className="student-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Advisor Name</th>
              <th>Advisor Role</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter(
                (student) =>
                  category === "General"
                    ? !student.department
                    : student.department === department
              )
              .map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    {category === "General"
                      ? advisors.General[0].name
                      : advisors[department][0].name}
                  </td>
                  <td>
                    {category === "General"
                      ? advisors.General[0].role
                      : advisors[department][0].role}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advisee;
