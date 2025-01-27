import { useNotification } from "@/hooks/useNotification";
import React, { useState } from "react";

export default function SwitchButton() {
  const { showNotification } = useNotification();

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    showNotification("Falta agregar interacción a este botón.", "info");
  };

  return (
    <div
      onClick={handleClick}
      className="min-w-12 h-6 px-1 bg-black/25 dark:bg-white rounded-full cursor-pointer relative"
    >
      <span
        className={`block size-5 bg-white dark:bg-dark-background rounded-full absolute top-1/2 -translate-y-1/2 transition-all ${isActive ? "translate-x-full" : "translate-x-0"}`}
      />
    </div>
  );
}
