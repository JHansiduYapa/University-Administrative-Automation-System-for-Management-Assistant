import "./App.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar"; 
import SignInPage from "./Components/SignInPage/SignInPage";
import RegisterMA from "./Components/RegisterMA/RegisterMA";
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
import StudentDetails from "./Components/StudentDetails/StudentDetails";

import AuthProvider, { AuthContext } from "./AuthContext";
import ThemeProvider from "./context/ThemeContext";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="app-content">
            <Header />
            <Routes>

            <Route path="/" element={<SignInPage />} />
            <Route path="/register-ma" element={<RegisterMA />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ma-page" element={
              <PrivateRoute>
                <MAPage />
              </PrivateRoute>
            } />

              <Route path="/personal-details" element={
                <PrivateRoute>
                  <Sidebar /><PersonalDetails />
                </PrivateRoute>
              } />

              <Route path="/contact-us" element={
                <PrivateRoute>
                  <Sidebar /><ContactUs />
                </PrivateRoute>
              } />

              <Route path="/time-table" element={
                <PrivateRoute>
                  <Sidebar /><TimeTable />
                </PrivateRoute>
              } />

              <Route path="/time-table-change" element={
                <PrivateRoute>
                  <Sidebar /><TimeTableChange />
                </PrivateRoute>
              } />

              <Route path="/advisor" element={
                <PrivateRoute>
                  <Sidebar /><Advisor />
                </PrivateRoute>
              } />

              <Route path="/advisee" element={
                <PrivateRoute>
                  <Sidebar /><Advisee />
                </PrivateRoute>
              } />

              <Route path="/coordinator" element={
                <PrivateRoute>
                  <Sidebar /><Coordinator />
                </PrivateRoute>
              } />

              <Route path="/settings" element={
                <PrivateRoute>
                  <Sidebar /><Settings />
                </PrivateRoute>
              } />

              <Route path="/lecture-details" element={
                <PrivateRoute>
                  <Sidebar /><LectureDetails />
                </PrivateRoute>
              } />
              
              <Route path="/student-details" element={
                <PrivateRoute>
                  <Sidebar /><StudentDetails />
                </PrivateRoute>
              } />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
