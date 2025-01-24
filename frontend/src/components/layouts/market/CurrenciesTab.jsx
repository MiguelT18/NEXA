import { SearchIcon } from "@/components/icons";
import React from "react";

export default function CurrenciesTab({ isVisible }) {
  return (
    <div className={`mt-5 ${!isVisible ? "hidden" : ""}`}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="size-6 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm rounded-lg bg-transparent border border-light-gray/25 dark:border-light-gray outline-none focus:dark:border-white focus:border-black"
          placeholder="Buscar activos..."
        />
      </div>
    </div>
  );
}
