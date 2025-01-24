"use client";

import { CloseIcon } from "@/components/icons";
import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef({}); // Objeto para almacenar los timeouts por ID

  const showNotification = (text, type = "info", id = Date.now()) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, text, type },
    ]);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const currentNotification = notifications[0];
      const duration = 10000;

      if (!timeoutRefs.current[currentNotification.id]) {
        // Verificar si ya existe un timeout
        timeoutRefs.current[currentNotification.id] = setTimeout(() => {
          setNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.id !== currentNotification.id)
          );
          delete timeoutRefs.current[currentNotification.id]; // Limpiar el timeout del objeto
        }, duration);
      }
    }

    return () => {
      // Limpieza al desmontar o al cambiar las notificaciones
      Object.values(timeoutRefs.current).forEach(clearTimeout);
      timeoutRefs.current = {};
    };
  }, [notifications]);

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

  const handleCloseNotification = (id) => {
    clearTimeout(timeoutRefs.current[id]);
    delete timeoutRefs.current[id];
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.length > 0 && (
        <div className="fixed flex flex-col gap-2 max-md:w-max max-md:right-1/2 max-md:translate-x-1/2 max-md:top-5 md:bottom-5 md:right-5">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`w-fit max-w-[340px] flex justify-between items-center gap-2 backdrop-blur-sm p-2 rounded-lg max-md:flex-row-reverse ${getNotificationStyle(notification.type)}`}
            >
              <span
                onClick={() => handleCloseNotification(notification.id)}
                className="block cursor-pointer hover:dark:bg-dark-gray/20 p-2 rounded-md"
              >
                <CloseIcon />
              </span>
              {notification.text}
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
}
