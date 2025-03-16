import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './TimeTableChange.css';

const TimeTableChange = () => {
    const navigate = useNavigate(); // Initialize navigation hook

  const [currentSemester, setCurrentSemester] = useState({
    startDate: new Date(2025, 0, 1).toISOString().substr(0, 10),
    endDate: new Date(2025, 2, 31).toISOString().substr(0, 10),
  });

  const [nextSemester, setNextSemester] = useState({
    startDate: new Date(2025, 3, 7).toISOString().substr(0, 10),
    endDate: new Date(2025, 5, 30).toISOString().substr(0, 10),
  });

  const handleInputChange = (semesterType, field, value) => {
    if (semesterType === 'current') {
      setCurrentSemester({ ...currentSemester, [field]: value });
    } else if (semesterType === 'next') {
      setNextSemester({ ...nextSemester, [field]: value });
    }
  };

  const handleSave = () => {
    // Simulate saving logic (can be replaced with API calls)
    console.log("Saved Changes:", { currentSemester, nextSemester });

    // Navigate back to TimeTable page
    navigate("/time-table");
  };

  return (
    <div className="time-table-change-page">
      <h1 className="page-title">Current State</h1>

      {/* Batch Table */}
      <table className="batch-table">
        <thead>
          <tr>
            <th>Batch</th>
            <th>Semester</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E21</td>
            <td>7</td>
          </tr>
          <tr>
            <td>E22</td>
            <td>5</td>
          </tr>
          <tr>
            <td>E23</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>

      {/* Editable Semester Table */}
      <table className="semester-table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Current Semester */}
          <tr>
            <td>Current Semester</td>
            <td>
              <input
                type="date"
                value={currentSemester.startDate}
                onChange={(e) =>
                  handleInputChange('current', 'startDate', e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="date"
                value={currentSemester.endDate}
                onChange={(e) =>
                  handleInputChange('current', 'endDate', e.target.value)
                }
              />
            </td>
          </tr>

          {/* Next Semester */}
          <tr>
            <td>Next Semester</td>
            <td>
              <input
                type="date"
                value={nextSemester.startDate}
                onChange={(e) =>
                  handleInputChange('next', 'startDate', e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="date"
                value={nextSemester.endDate}
                onChange={(e) =>
                  handleInputChange('next', 'endDate', e.target.value)
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Save Button */}
      <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>

      {/* Footer */}
      <footer />
    </div>
  );
};

export default TimeTableChange;
