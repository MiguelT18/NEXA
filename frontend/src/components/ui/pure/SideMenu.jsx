"use client";

import { GlobalIcons } from "@/components/icons";
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
      className={`h-full fixed z-10 bg-white dark:bg-alt-dark-primary-color/30 backdrop-blur-md text-white sm px-2 pb-2 max-md:hidden duration-300 ${
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
          } hover:bg-light-gray/5 hover:dark:bg-alt-dark-primary-color/30 p-3 rounded-md my-4 outline-none`}
        >
          <GlobalIcons.TriangleArrowIcon className="size-5" />
        </button>
      </div>

      <main className="flex flex-col h-[90dvh]">{children}</main>
    </aside>
  );
}
