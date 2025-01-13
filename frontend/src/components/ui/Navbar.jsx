"use client";

import React from "react";
import {
  MoonRisingIcon,
  SunRisingIcon,
  MenuIcon,
  UserIcon,
} from "@/icons/index";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="dark:bg-dark-background bg-white block px-4 py-5 w-full z-10 max-md:fixed max-md:bottom-0 max-md:border-t md:border-b border-dark-gray dark:border-light-gray dark:border-background-light">
      {/* Desktop Navbar */}
      <div className="max-md:hidden flex justify-around items-center">
        <Link
          href="/"
          className={`font-black font-sans uppercase text-md inline-block ${
            theme === "light" ? "text-gradient-light" : "text-gradient-dark"
          }`}
        >
          NEXA AI
        </Link>

        <ul className="flex items-center gap-2 [&>li]:cursor-pointer">
          <li>
            <Link
              href="/"
              className="text-sm hover:bg-black/10 hover:dark:bg-white/10 px-4 py-2 rounded-md transition-all"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/pricing"
              className="text-sm hover:bg-black/10 hover:dark:bg-white/10 px-4 py-2 rounded-md transition-all"
            >
              Precios
            </Link>
          </li>
          <li className="hover:bg-black/10 hover:dark:bg-white/10 p-2 rounded-md transition-all">
            <UserIcon className="size-6" />
          </li>
          <li
            className="hover:bg-black/10 hover:dark:bg-white/10 p-2 rounded-md transition-all"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MoonRisingIcon className="text-black dark:text-white size-6" />
            ) : (
              <SunRisingIcon className="text-black dark:text-white size-6" />
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <ul className="md:hidden dark:bg-background w-full flex justify-around max-sm:justify-between items-center">
        <li onClick={toggleTheme}>
          {theme === "dark" ? (
            <MoonRisingIcon className="text-black dark:text-white size-8" />
          ) : (
            <SunRisingIcon className="text-black dark:text-white size-8" />
          )}
        </li>
        <li>
          <MenuIcon className="size-6" />
        </li>
        <li>
          <UserIcon className="size-9" />
        </li>
      </ul>
    </nav>
  );
}
