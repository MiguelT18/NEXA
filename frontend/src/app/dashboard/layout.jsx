"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React, { useState, useEffect } from "react";
import {
  UserIcon,
  UsersIcon,
  ConfigIcon,
  FileIcon,
  StatsIcon02,
  TriangleArrowIcon,
} from "@/components/icons/index";
import DashboardIcon from "@/components/icons/dashboard";
import { useRouter } from "next/navigation";

export default function DashboardPage({ children }) {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        setIsMenuOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ProtectedRoute>
      <main className="flex">
        <aside
          className={`border-r dark:border-light-gray border-dark-gray bg-white dark:bg-dark-background px-2 max-md:hidden md:sticky z-10 duration-100 ${
            isMenuOpen ? "w-64" : "w-16"
          }`}
        >
          <div
            className={`flex ${isMenuOpen ? "justify-end" : "justify-center rotate-180"}`}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-transform duration-300 transform ${
                isMenuOpen ? "-rotate-90" : "-rotate-90"
              } hover:bg-light-gray/5 hover:dark:bg-white/10 p-3 rounded-md my-4`}
            >
              <TriangleArrowIcon className="size-5" />
            </button>
          </div>

          <ul className="flex flex-col gap-2 [&>li]:cursor-pointer [&>li]:text-sm [&>li]:rounded-md [&>li]:flex [&>li]:gap-2 [&>li]:items-center [&>li]:transition-all [&>li]:duration-300 [&>li]:p-3">
            <li
              onClick={() => router.push("/dashboard")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <DashboardIcon className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Dashboard
              </span>
            </li>
            <li
              onClick={() => router.push("/dashboard/profile")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <UserIcon className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Perfil
              </span>
            </li>
            <li
              onClick={() => router.push("/dashboard/configuration")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <ConfigIcon className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Configuración
              </span>
            </li>
            <li
              onClick={() => router.push("/dashboard/reports")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <FileIcon className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Reportes
              </span>
            </li>
            <li
              onClick={() => router.push("/dashboard/statistics")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <StatsIcon02 className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Estadísticas
              </span>
            </li>
            <li
              onClick={() => router.push("/dashboard/users")}
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
            >
              <div>
                <UsersIcon className="size-5" />
              </div>
              <span
                className={`text-sm transition-opacity duration-300 ${
                  isMenuOpen ? "block" : "hidden"
                }`}
              >
                Usuarios
              </span>
            </li>
          </ul>
        </aside>
        {children}
      </main>
    </ProtectedRoute>
  );
}
