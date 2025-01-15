"use client";

import React, { useEffect, useState } from "react";
import {
  MoonRisingIcon,
  SunRisingIcon,
  MenuIcon,
  UserIcon,
} from "@/icons/index";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import Loader from "./Loader";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "GET",
      });

      if (!response.ok) {
        console.error("❌ Error al cerrar sesión:", response.statusText);
      }
      console.log("Sesión cerrada en el servidor exitosamente");
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="dark:bg-dark-background bg-white block px-4 py-5 w-full z-10 max-md:fixed max-md:bottom-0 max-md:border-t md:border-b border-dark-gray dark:border-light-gray dark:border-background-light">
      {/* Desktop Navbar */}
      <div className="max-md:hidden flex justify-around items-center">
        <Link
          href="/"
          className={`font-black font-sans uppercase text-[28px] inline-block ${
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

          <li className="relative group">
            {!isAuthenticated ? (
              <div className="hover:bg-black/10 hover:dark:bg-white/10 p-2 rounded-md transition-all">
                <UserIcon className="size-6" />
              </div>
            ) : (
              <div className="hover:bg-black/10 hover:dark:bg-white/10 p-2 rounded-md transition-all">
                <Loader className="size-6 rounded-full" />
              </div>
            )}

            {!isAuthenticated ? (
              <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-dark-background border border-difuminate-text-dark dark:border-light-gray rounded-md w-40 z-20 group-hover:pointer-events-auto pointer-events-none">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm hover:bg-black/10 hover:dark:bg-white/10 transition-all rounded-t-[inherit]"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm hover:bg-black/10 hover:dark:bg-white/10 transition-all rounded-b-[inherit]"
                >
                  Crear Cuenta
                </Link>
              </div>
            ) : (
              <div className="w-fit absolute right-0 hidden group-hover:block bg-white dark:bg-dark-background border border-difuminate-text-dark dark:border-light-gray text-start rounded-md z-20 group-hover:pointer-events-auto pointer-events-none">
                <Link
                  href="/dashboard"
                  className="w-full block px-4 py-2 text-sm hover:bg-black/10 hover:dark:bg-white/10 transition-all rounded-t-[inherit]"
                >
                  Mi perfil
                </Link>
                <button
                  type="button"
                  className="w-full block px-4 py-2 text-sm hover:bg-black/10 hover:dark:bg-white/10 transition-all"
                >
                  Configuración
                </button>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full block px-4 py-2 text-sm hover:bg-black/10 hover:dark:bg-white/10 transition-all rounded-b-[inherit]"
                >
                  Cerrar Sesión
                </button>
              </div>
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
          {!isAuthenticated ? (
            <UserIcon className="size-9" />
          ) : (
            <Loader className="size-9 rounded-full" />
          )}
        </li>
      </ul>
    </nav>
  );
}
