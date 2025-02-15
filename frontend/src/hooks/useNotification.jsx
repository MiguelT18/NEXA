"use client";

import { GlobalIcons } from "@/components/icons/index";
import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import Scripts from "@/lib/scripts";
import { motion, AnimatePresence } from "framer-motion";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timeoutRefs = useRef({});

  const showNotification = (text, type = "info", id = Date.now()) => {
    setNotifications((prev) => [...prev, { id, text, type }]);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const currentNotification = notifications[0];
      const duration = 2000;

      if (!timeoutRefs.current[currentNotification.id]) {
        timeoutRefs.current[currentNotification.id] = setTimeout(() => {
          setNotifications((prev) =>
            prev.filter((n) => n.id !== currentNotification.id)
          );
          delete timeoutRefs.current[currentNotification.id];
        }, duration);
      }
    }

    return () => {
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
        return "dark:bg-yellow-500/30 bg-yellow-500/50 text-white";
    }
  };

  const handleCloseNotification = (id) => {
    clearTimeout(timeoutRefs.current[id]);
    delete timeoutRefs.current[id];
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {/* 📌 Contenedor de Notificaciones */}
      <div className="fixed flex flex-col gap-2 max-md:w-max max-md:right-1/2 max-md:translate-x-1/2 max-md:top-5 md:bottom-5 md:right-5">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className={`w-full max-w-[340px] flex justify-between items-center gap-2 backdrop-blur-sm p-2 rounded-lg max-md:flex-row-reverse ${getNotificationStyle(
                notification.type
              )}`}
            >
              <div className="flex justify-start items-center">
                <span className="block mr-4 text-sm font-bold">
                  {Scripts.capitalizeWords(notification.type)}:
                </span>
                {notification.text}
              </div>
              <span
                onClick={() => handleCloseNotification(notification.id)}
                className="block cursor-pointer transition-all hover:dark:bg-light-gray/30 p-2 rounded-md"
              >
                <GlobalIcons.CloseIcon />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
