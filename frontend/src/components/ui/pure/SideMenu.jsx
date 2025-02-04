"use client";

import { TriangleArrowIcon } from "@/components/icons";
import { useEffect, useRef } from "react";

export default function SideMenu({ isMenuOpen, setIsMenuOpen, children }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "e") {
        event.preventDefault();
        setIsMenuOpen((prev) => !prev);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={menuRef}
      className={`absolute h-full z-10 border-r border-dark-gray/25 dark:border-light-gray bg-white dark:bg-dark-background px-2 max-md:hidden duration-300 ${
        isMenuOpen ? "w-64" : "w-16"
      }`}
    >
      <div
        className={`flex ${isMenuOpen ? "justify-end" : "justify-center rotate-180"}`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${
            isMenuOpen ? "-rotate-90" : "-rotate-90"
          } hover:bg-light-gray/5 hover:dark:bg-white/10 p-3 rounded-md my-4`}
        >
          <TriangleArrowIcon className="size-5" />
        </button>
      </div>

      {children}
    </aside>
  );
}
