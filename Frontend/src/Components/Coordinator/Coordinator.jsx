import React, { useState } from "react";
import axios from "axios";
import "./Coordinator.css"; // using the same CSS file

const CourseDetails = () => {
  const [courseId, setCourseId] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [selectedCoordinatorId, setSelectedCoordinatorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch course details based on the course ID
  const fetchCourseDetails = async () => {
    if (!courseId) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:9080/api/courses/${courseId}/details`
      );
      setCourseDetails(response.data);
      if (response.data.course.coordinator) {
        setSelectedCoordinatorId(
          response.data.course.coordinator.lecturerId.toString()
        );
      } else {
        setSelectedCoordinatorId("");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching course details.");
    } finally {
      setLoading(false);
    }
  };

  // Update the coordinator for the course
  const updateCoordinator = async () => {
    if (!courseId || !selectedCoordinatorId) return;
    try {
      await axios.put(
        `http://localhost:9080/api/courses/${courseId}/coordinator?coordinatorId=${selectedCoordinatorId}`
      );
      const newCoordinator = courseDetails.availableLecturers.find(
        (lect) => lect.lecturerId.toString() === selectedCoordinatorId
      );
      setCourseDetails({
        ...courseDetails,
        course: { ...courseDetails.course, coordinator: newCoordinator },
      });
      alert("Coordinator updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Error updating coordinator.");
    }
  };

  return (
    <div className="coordinator-container">
      <div className="coordinator-content">
        <h2>Course Details</h2>
        <div className="filter-section">
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="number"
            id="courseId"
            className="input-field"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter course ID"
          />
          <button className="add-btn" onClick={fetchCourseDetails}>
            Get Course Details
          </button>
        </div>

        {loading && <p>Loading course details...</p>}
        {error && <p className="error">{error}</p>}

        {courseDetails && (
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
              <tr>
                <td>{courseDetails.course.courseCode || courseDetails.course.courseId}</td>
                <td>{courseDetails.course.courseName}</td>
                <td>
                  {courseDetails.course.coordinator
                    ? `${courseDetails.course.coordinator.firstName} ${courseDetails.course.coordinator.lastName} (${courseDetails.course.coordinator.email})`
                    : "None"}
                </td>
                <td>
                  <select
                    className="input-field"
                    value={selectedCoordinatorId}
                    onChange={(e) => setSelectedCoordinatorId(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {courseDetails.availableLecturers.map((lecturer) => (
                      <option
                        key={lecturer.lecturerId}
                        value={lecturer.lecturerId}
                      >{`${lecturer.firstName} ${lecturer.lastName} (${lecturer.email})`}</option>
                    ))}
                  </select>
                  <button className="add-btn" onClick={updateCoordinator}>
                    Update Coordinator
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
