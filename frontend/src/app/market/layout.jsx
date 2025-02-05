"use client";

import CurrenciesTab from "@/components/layouts/market/CurrenciesTab";
import ToolsTab from "@/components/layouts/market/ToolsTab";
import SideMenu from "@/components/ui/pure/SideMenu";
import React, { useState } from "react";

export default function layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("currencies");

  return (
    <main className="relative">
      <SideMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}>
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
      </SideMenu>

      <section className="w-full h-full min-h-[calc(100dvh-20dvh)] md:pl-20 p-5 max-md:pb-24">
        {children}
      </section>
    </main>
  );
}
