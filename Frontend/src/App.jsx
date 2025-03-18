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
import Advisor from "./Components/Advisor/Advisor"; // Import Advisor Component
import Advisee from "./Components/Advisee/Advisee";

import AuthProvider from "./AuthContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
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
            
            {/* Advisor Page Route */}
            <Route path="/advisor" element={<><Sidebar /><Advisor /></>} />
            <Route path="/advisee" element={<><Sidebar /><Advisee /></>} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
