import React, { createContext, useState } from "react";

// Create a context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Mock authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;