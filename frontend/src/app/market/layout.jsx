"use client";

import { TriangleArrowIcon } from "@/components/icons";
import CurrenciesTab from "@/components/layouts/market/CurrenciesTab";
import ToolsTab from "@/components/layouts/market/ToolsTab";
import React, { useEffect, useRef, useState } from "react";

export default function layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("currencies");

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
    <main className="relative">
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

        <div
          className={`${isMenuOpen ? "" : "hidden"} bg-light-gray/15 dark:bg-light-gray rounded-lg [&>button]:p-2 [&>button]:w-1/2`}
        >
          <button
            onClick={() => setActiveTab("currencies")}
            className={`transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15 rounded-l-[inherit] ${
              activeTab === "currencies"
                ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                : ""
            }`}
          >
            Activos
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15 rounded-r-[inherit] ${
              activeTab === "tools"
                ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                : ""
            }`}
          >
            Herramientas
          </button>
        </div>

        {activeTab === "currencies" && <CurrenciesTab isVisible={isMenuOpen} />}
        {activeTab === "tools" && <ToolsTab isVisible={isMenuOpen} />}
      </aside>

      <section className="w-full h-full min-h-[calc(100dvh-20dvh)] md:pl-20 p-5 max-md:pb-32">
        {children}
      </section>
    </main>
  );
}
