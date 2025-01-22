import React, { useState } from "react";

export default function SwitchButton() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={handleClick}
<<<<<<< HEAD
      className="min-w-14 h-7 px-1 bg-black/10 dark:bg-white rounded-full cursor-pointer relative"
    >
      <span
        className={`block size-6 bg-secondary-color/80 dark:bg-primary-color rounded-full absolute top-1/2 -translate-y-1/2 transition-all ${isActive ? "translate-x-full" : "translate-x-0"}`}
=======
      className="min-w-14 h-7 px-1 bg-black dark:bg-white rounded-full cursor-pointer relative"
    >
      <span
        className={`block size-6 bg-white dark:bg-black rounded-full absolute top-1/2 -translate-y-1/2 transition-all ${isActive ? "translate-x-full" : "translate-x-0"}`}
>>>>>>> origin/axel-dev
      />
    </div>
  );
}
