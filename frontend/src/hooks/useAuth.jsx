"use client";

import apiService from "@/services/apiService";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      setUser({ token, userId });
    }
  }, []);

  const register = async (data) => {
    try {
      const response = await apiService.post("/add_user", data);
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (identifier, password) => {
    try {
      const response = await apiService.post("/login_send", {
        identifier,
        password,
      });

      // Guardar el token y el id del usuario en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);

      // Actualizar el estado del usuario
      setUser({ token: response.token, userId: response.userId });
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
