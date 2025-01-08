"use client";

import React, { useState, useEffect } from "react";
import {
  MoonRisingIcon,
  SunRisingIcon,
  MenuIcon,
  UserIcon,
} from "@/icons/index";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      const SystemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setTheme(SystemTheme);
      document.documentElement.classList.add(SystemTheme);
      localStorage.setItem("theme", SystemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <nav className="md:hidden dark:bg-background-dark bg-background-light sticky bottom-0 px-4 py-5 w-full border-t border-background-dark dark:border-background-light">
      {/* Mobile Navbar */}
      <ul className="dark:bg-background w-full flex justify-around max-sm:justify-between items-center ">
        <li className="cursor-pointer" onClick={toggleTheme}>
          {theme === "dark" ? (
            <MoonRisingIcon className="text-black dark:text-white size-8" />
          ) : (
            <SunRisingIcon className="text-black dark:text-white size-8" />
          )}
        </li>
        <li className="cursor-pointer">
          <MenuIcon className="size-6" />
        </li>
        <li className="cursor-pointer">
          <UserIcon className="size-9" />
        </li>
      </ul>
    </nav>
  );
}
