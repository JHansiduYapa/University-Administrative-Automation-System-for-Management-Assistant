import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TimeTable.css';
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";

const TimeTable = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [currentSemester, setCurrentSemester] = useState(null);

  useEffect(() => {
    const getDates = async () => {
      try {
        const response = await api.get("/api/semesters/1");
        console.log(response.data); // Debugging log

        // Convert date strings to JavaScript Date objects
        const formattedSemester = {
          startDate: parseDate(response.data.startDate),
          endDate: parseDate(response.data.endDate),
        };

        setCurrentSemester(formattedSemester);
      } catch (error) {
        console.error("Error fetching semester data:", error);
      }
    };

    getDates();
  }, []);

  // Function to convert "DD/MM/YYYY" format to a JavaScript Date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
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
            if (currentSemester) {
              if (date >= currentSemester.startDate && date <= currentSemester.endDate) {
                return 'current-semester-tile';
              }
              else{
                return 'current-semester-tile';
              }
            }
            return null;
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
