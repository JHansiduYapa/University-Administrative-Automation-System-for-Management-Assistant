import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar"; 
import SignInPage from "./Components/SignInPage/SignInPage";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactUs from "./Components/ContactUs/ContactUs";
import MAPage from "./Components/MAPage/MAPage";
import TimeTable from "./Components/TimeTable/TimeTable";
import TimeTableChange from "./Components/TimeTableChange/TimeTableChange";
import Advisor from "./Components/Advisor/Advisor"; 
import Advisee from "./Components/Advisee/Advisee";
import Coordinator from "./Components/Coordinator/Coordinator"; 
import Settings from "./Components/Settings/Settings"; 
import LectureDetails from "./Components/LectureDetails/LectureDetails"; 
import StudentDetails from "./Components/StudentDetails/StudentDetails"; // Import StudentDetails

import AuthProvider from "./AuthContext";
import ThemeProvider from "./context/ThemeContext"; // Import ThemeProvider
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
        <Router>
          <div className="app-content">
            <Header />
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/ma-page" element={<MAPage />} />
              <Route path="/personal-details" element={<><Sidebar /><PersonalDetails /></>} />
              <Route path="/contact-us" element={<><Sidebar /><ContactUs /></>} />
              <Route path="/time-table" element={<><Sidebar /><TimeTable /></>} />
              <Route path="/time-table-change" element={<TimeTableChange />} />
              <Route path="/advisor" element={<><Sidebar /><Advisor /></>} />
              <Route path="/advisee" element={<><Sidebar /><Advisee /></>} />
              <Route path="/coordinator" element={<><Sidebar /><Coordinator /></>} />
              <Route path="/settings" element={<><Sidebar /><Settings /></>} />
              <Route path="/lecture-details" element={<><Sidebar /><LectureDetails /></>} />
              <Route path="/student-details" element={<><Sidebar /><StudentDetails /></>} /> {/* Add StudentDetails route */}
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
