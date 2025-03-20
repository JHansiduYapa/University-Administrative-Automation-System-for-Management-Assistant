import React, { createContext, useState, useEffect } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Check for dark mode in localStorage when the component mounts
  const savedTheme = localStorage.getItem("theme") || "light";  // Default to light if nothing is saved
  const [theme, setTheme] = useState(savedTheme);
  const [darkMode, setDarkMode] = useState(savedTheme === "dark");

  useEffect(() => {
    // Save the theme in localStorage when it changes
    localStorage.setItem("theme", theme);
    // Apply dark mode to the body if darkMode is true
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme, darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;