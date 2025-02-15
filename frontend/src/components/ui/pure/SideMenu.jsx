"use client";

import { GlobalIcons } from "@/components/icons";
import { useEffect, useRef } from "react";

export default function SideMenu({ isMenuOpen, setIsMenuOpen, children }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Solo alternar el menú si 'e' es presionado y el elemento activo no es un campo de entrada
      const isInputActive =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable;

      if (event.key === "e" && !isInputActive) {
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
      className={`h-full fixed z-10 bg-alt-light-primary-color/30 dark:bg-alt-dark-primary-color/30 backdrop-blur-md text-white sm px-2 pb-2 max-md:hidden duration-300 ${
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
          } hover:bg-alt-light-blue/50 hover:dark:bg-alt-dark-blue/50 p-3 rounded-md my-4 outline-none transition-all`}
        >
          <GlobalIcons.TriangleArrowIcon className="size-5 text-black dark:text-white" />
        </button>
      </div>

      <main className="flex flex-col h-[90dvh]">{children}</main>
    </aside>
  );
}
