"use client";

import { CloseIcon } from "@/components/icons";
import React, { useState, createContext, useContext } from "react";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const showNotification = (text, type = "info") => {
    if (isNotificationVisible) return;

    setIsNotificationVisible(true);
    setNotification({ text, type });

    setTimeout(() => {
      setNotification(null);
      setIsNotificationVisible(false);
    }, 5000);
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case "error":
        return "bg-red-700/65 text-white";
      case "success":
        return "bg-green-700/65 text-white";
      default:
        return "dark:bg-white/70 dark:text-black bg-black/70 text-white";
    }
  };

  const handleCloseNotification = () => {
    setIsNotificationVisible(false);
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div
          className={`w-fit max-w-[300px] flex justify-between items-center gap-2 backdrop-blur-sm p-2 rounded-lg fixed bottom-10 right-10 ${getNotificationStyle(notification?.type)}`}
        >
          {notification.text}
          <span
            onClick={handleCloseNotification}
            className="block cursor-pointer hover:dark:bg-dark-gray/20 p-1 rounded-md"
          >
            <CloseIcon />
          </span>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
