import React, { createContext, useState } from "react";
import axios from "../axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post("/login", { username, password });
      setUser(response.data.user);
      console.log("User in context:", response.data.user);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
