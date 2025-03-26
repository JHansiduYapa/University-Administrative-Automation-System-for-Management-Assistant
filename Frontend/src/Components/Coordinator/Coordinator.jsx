import React, { useState, useEffect } from "react";
import "./Coordinator.css";
import jsonData from "../../data.json";
import { FaTrash, FaEdit } from "react-icons/fa";

const Coordinator = () => {
  const [selectedSemester, setSelectedSemester] = useState("semester1");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // New state for department filter
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseCode: "",
    courseName: "",
    coordinator: "",
    department: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load courses and lecturers from JSON data
    if (jsonData) {
      setCourses(jsonData.courses);
      setLecturers(jsonData.lecturers);
    }
  }, []);

  // Filter courses by semester and department
  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        (selectedSemester === "" ||
          course.semester === parseInt(selectedSemester.replace("semester", ""))) &&
        (selectedDepartment === "" || course.department === selectedDepartment)
    );
    setFilteredCourses(filtered);
  }, [selectedSemester, selectedDepartment, courses]);

  const handleCourseCodeChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCourse = courses.find(
      (course) => course.course_code === selectedCode
    );

    setNewCourse({
      ...newCourse,
      courseCode: selectedCode,
      courseName: selectedCourse?.course_name || "",
      department: selectedCourse?.department || "", // Store course's actual department
    });
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const addCourse = () => {
    if (
      newCourse.courseCode &&
      newCourse.courseName &&
      newCourse.coordinator
    ) {
      // Ensure coordinator data is linked properly
      const coordinatorDetails = lecturers.find(
        (lecturer) => lecturer.name === newCourse.coordinator
      );

      const updatedNewCourse = {
        ...newCourse,
        coordinator: coordinatorDetails
          ? `${coordinatorDetails.name} (${coordinatorDetails.post})`
          : newCourse.coordinator,
      };

      setCourses([...courses, updatedNewCourse]); // Add the new course to the main courses array
      setNewCourse({ courseCode: "", courseName: "", coordinator: "", department: "" });
    }
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses); // Update the main courses array
  };

  const editCourse = (index) => {
    setEditIndex(index);
    setNewCourse(filteredCourses[index]);
  };

  const saveEdit = () => {
    const updatedCourses = courses.map((course, index) =>
      index === editIndex ? newCourse : course
    );
    setCourses(updatedCourses); // Update the main courses array
    setEditIndex(null);
    setNewCourse({ courseCode: "", courseName: "", coordinator: "", department: "" });
  };

  return (
    <div className="coordinator-container">
      <div className="coordinator-content">
        <h2>Coordinator Page</h2>

        {/* Filters */}
        <div className="filter-section">
          {/* Semester Filter */}
          <select
            className="semester-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">All Semesters</option>
            {Array.from({ length: 8 }, (_, index) => (
              <option key={index} value={`semester${index + 1}`}>
                Semester {index + 1}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            className="department-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {[...new Set(courses.map((course) => course.department))].map(
              (department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              )
            )}
          </select>
        </div>

        {/* Course Table */}
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Coordinator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={index}>
                <td>{course.course_code}</td>
                <td>{course.course_name}</td>
                <td>{course.coordinator}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <button className="edit-btn" onClick={() => editCourse(index)}>
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCourse(index)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {/* Add/Edit Row */}
            <tr>
              <td>
                {/* Course Code Dropdown */}
                <select
                  name="courseCode"
                  value={newCourse.courseCode}
                  onChange={handleCourseCodeChange}
                  className="input-field"
                >
                  <option value="">Select Course Code</option>
                  {courses.map((course) => (
                    <option key={course.course_code} value={course.course_code}>
                      {course.course_code}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {/* Auto-filled Course Name */}
                <input
                  type="text"
                  name="courseName"
                  value={newCourse.courseName}
                  className="input-field"
                  disabled
                />
              </td>
              <td>
                {/* Coordinator Dropdown */}
                <select
                  name="coordinator"
                  value={newCourse.coordinator}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select Coordinator</option>
                  {lecturers
                    .filter(
                      (lecturer) =>
                        lecturer.department === newCourse.department
                    )
                    .map((lecturer) => (
                      <option key={lecturer.id} value={lecturer.name}>
                        {lecturer.name} ({lecturer.post})
                      </option>
                    ))}
                </select>
              </td>
              <td>
                {editIndex !== null ? (
                  // Save Button for Editing
                  <button className="add-btn" onClick={saveEdit}>
                    Save
                  </button>
                ) : (
                  // Add Button for New Row
                  <button className="add-btn" onClick={addCourse}>
                    Add
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coordinator;
