"use client";

import apiService from "@/services/apiService";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  /**
   * Registra un nuevo usuario.
   * @param {Object} data - Los datos del usuario a registrar.
   * @returns {Promise<Object>} - Un objeto que indica el éxito y el mensaje de respuesta.
   */
  const register = async ({ name, last_name, email }) => {
    try {
      // Asegurar que los campos enviados coincidan con lo esperado en la API Flask
      const response = await apiService.post("/register", {
        name,
        last_name,
        email,
      });
  
      return { success: true, message: response.message, user: response.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };  

  /**
   * Inicia sesión de un usuario existente.
   * @param {string} identifier - El identificador del usuario (puede ser email o nombre de usuario).
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<Object>} - Un objeto que indica el éxito y el mensaje de respuesta.
   */
  const login = async ({ username, password }) => {
    try {
      // Enviar las credenciales correctas según la API Flask
      const response = await apiService.post("/login", { username, password });
  
      // Guardar el token en localStorage
      localStorage.setItem("token", response.token);
  
      // Actualizar el estado del usuario con los datos de sesión
      setUser({
        token: response.token,
        username,
        name: response.name, // Asumimos que el backend devuelve "name" en la respuesta
        user_id: response.user_id,
      });
  
      return { success: true, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };  

  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
