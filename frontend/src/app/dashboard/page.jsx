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
import UserProfile from "@/components/layouts/dashboard/UserProfile";
import Configuration from "@/components/layouts/dashboard/Configuration";
import Reports from "@/components/layouts/dashboard/Reports";
import Stats from "@/components/layouts/dashboard/Stats";
import Users from "@/components/layouts/dashboard/Users";
import Dashboard from "@/components/layouts/dashboard/Dashboard";
import DashboardIcon from "@/components/icons/dashboard";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }

    if (window.location.pathname === "/dashboard") {
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  return (
    <ProtectedRoute>
      <main className="flex h-[90dvh] overflow-y-hidden">
        <aside
          className={`border-r dark:border-light-gray border-dark-gray bg-white dark:bg-dark-background px-2 max-md:hidden md:sticky z-10 h-full duration-100 ${
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
              onClick={() => setActiveSection("Dashboard")}
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
              onClick={() => setActiveSection("Perfil")}
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
              onClick={() => setActiveSection("Configuración")}
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
              onClick={() => setActiveSection("Reportes")}
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
              onClick={() => setActiveSection("Estadísticas")}
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
              onClick={() => setActiveSection("Usuarios")}
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

        {activeSection === "Dashboard" && <Dashboard />}
        {activeSection === "Perfil" && <UserProfile />}
        {activeSection === "Configuración" && <Configuration />}
        {activeSection === "Reportes" && <Reports />}
        {activeSection === "Estadísticas" && <Stats />}
        {activeSection === "Usuarios" && <Users />}
      </main>
    </ProtectedRoute>
  );
}
