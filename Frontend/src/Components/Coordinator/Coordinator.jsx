import React, { useState } from "react";
import "./Coordinator.css";
import Sidebar from "../Sidebar/Sidebar";
import UserInfo from "../UserInfo/UserInfo";

const Coordinator = () => {
  const [selectedSemester, setSelectedSemester] = useState("semester1");
  const [selectedDepartment, setSelectedDepartment] = useState("Computing");
  const [courses, setCourses] = useState([
    { courseName: "Software Engineering", courseCode: "SE302", coordinator: "Dr. Smith" },
    { courseName: "Database Systems", courseCode: "DB204", coordinator: "Dr. Johnson" },
  ]);

  const [newCourse, setNewCourse] = useState({ courseName: "", courseCode: "", coordinator: "" });

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (newCourse.courseName && newCourse.courseCode && newCourse.coordinator) {
      setCourses([...courses, newCourse]);
      setNewCourse({ courseName: "", courseCode: "", coordinator: "" });
    }
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  return (
    <div className="coordinator-container">
      <Sidebar />
      <div className="coordinator-content">
        <div className="filter-section">
          <select
            className="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index} value={`semester${index + 1}`}>
                Semester {index + 1}
              </option>
            ))}
          </select>

          <select
            className="department-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="Computing">Computing</option>
            <option value="Civil">Civil</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>

        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course Code</th>
              <th>Coordinator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.courseCode}</td>
                <td>{course.coordinator}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteCourse(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  name="courseName"
                  value={newCourse.courseName}
                  onChange={handleInputChange}
                  placeholder="Enter course name"
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="courseCode"
                  value={newCourse.courseCode}
                  onChange={handleInputChange}
                  placeholder="Enter course code"
                  className="input-field"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="coordinator"
                  value={newCourse.coordinator}
                  onChange={handleInputChange}
                  placeholder="Enter coordinator name"
                  className="input-field"
                />
              </td>
              <td>
                <button className="add-btn" onClick={addCourse}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coordinator;