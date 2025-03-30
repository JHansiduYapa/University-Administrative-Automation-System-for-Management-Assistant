import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token,setToken] =useState("");

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
