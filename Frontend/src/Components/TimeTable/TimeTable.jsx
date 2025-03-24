import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TimeTable.css';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../UserInfo/UserInfo";

const TimeTable = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const currentSemester = {
    startDate: new Date(2025, 0, 1), // January 1, 2025
    endDate: new Date(2025, 2, 31), // March 31, 2025
  };

  const nextSemester = {
    startDate: new Date(2025, 3, 7), // April 7, 2025
    endDate: new Date(2025, 5, 30), // June 30, 2025
  };

  return (
    <div className="time-table-page">
      <h1 className="page-title">Time Table</h1>

      {/* Calendar Section */}
      <div className="calendar-section">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date }) => {
            if (
              date >= currentSemester.startDate &&
              date <= currentSemester.endDate
            ) {
              return 'current-semester-tile';
            }
            if (
              date >= nextSemester.startDate &&
              date <= nextSemester.endDate
            ) {
              return 'next-semester-tile';
            }
            if (
              date > currentSemester.endDate &&
              date < nextSemester.startDate
            ) {
              return 'vacation-tile';
            }
          }}
        />
      </div>

      {/* Change Period Button */}
      <div className="buttons-section">
        <button
          className="change-period-btn"
          onClick={() => navigate('/time-table-change')}
        >
          Change Period
        </button>
      </div>
    </div>
  );
};

export default TimeTable;