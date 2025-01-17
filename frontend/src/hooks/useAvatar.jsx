"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    setAvatar(storedAvatar);
  }, []);

  const removeAvatar = () => {
    setAvatar(null);
    localStorage.removeItem("avatar");
  };

  return (
    <AvatarContext.Provider value={{ avatar, removeAvatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => useContext(AvatarContext);
