import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar"; // Import Sidebar component
import SignInPage from "./Components/SignInPage/SignInPage";
import PersonalDetails from "./Components/PersonalDetails/PersonalDetails";
import ContactUs from "./Components/ContactUs/ContactUs";
import MAPage from "./Components/MAPage/MAPage";
import TimeTable from "./Components/TimeTable/TimeTable";
import TimeTableChange from "./Components/TimeTableChange/TimeTableChange";
import UserInfo from "./Components/UserInfo/UserInfo";
import AuthProvider from "./AuthContext";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <AuthProvider>
    <Router>
      {/* Main Content */}
      <div className="app-content">
        {/* Header */}
        <Header />
        {/* Routes */}
        <Routes>
          {/* Sign-In Page */}
          <Route path="/" element={<SignInPage />} />
          {/* MAPage */}
          <Route path="/ma-page" element={<MAPage />} />
          <Route
            path="/personal-details"
            element={
              <>
                <Sidebar />
                <PersonalDetails />
              </>
            }
          />
          <Route
            path="/contact-us"
            element={
              <>
                <Sidebar />
                <ContactUs />
              </>
            }
          />

          <Route
            path="/time-table"
            element={
              <>
                <Sidebar />
                <TimeTable />
              </>
            }
          />

          <Route
            path="/time-table-change"
            element={
              <>
                <TimeTableChange />
              </>
            }
          />

        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
