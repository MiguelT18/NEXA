"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React, { useState } from "react";
import {
  UserIcon,
  UsersIcon,
  ConfigIcon,
  FileIcon,
  StatsIcon02,
} from "@/icons/index";
import UserProfile from "@/components/layouts/dashboard/UserProfile";
import Configuration from "@/components/layouts/dashboard/Configuration";
import Reports from "@/components/layouts/dashboard/Reports";
import Stats from "@/components/layouts/dashboard/Stats";
import Users from "@/components/layouts/dashboard/Users";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("Perfil");

  return (
    <ProtectedRoute>
      <main className="flex p-4 gap-4">
        <aside className="w-[calc(100%-70dvw)] border dark:border-light-gray border-dark-gray rounded-lg p-4">
          <h1 className="text-md font-bold font-sans">Dashboard</h1>

          <ul className="flex flex-col gap-2 mt-4 [&>li]:py-3 [&>li]:cursor-pointer [&>li]:px-4 [&>li]:text-sm [&>li]:rounded-md [&>li]:flex [&>li]:gap-2 [&>li]:items-center [&>li]:transition-all">
            <li
              onClick={() => setActiveSection("Perfil")}
              className="hover:bg-black/10 hover:dark:bg-white/10"
            >
              <UserIcon className="size-5" />
              Perfil
            </li>
            <li
              onClick={() => setActiveSection("Configuración")}
              className="hover:bg-black/10 hover:dark:bg-white/10"
            >
              <ConfigIcon className="size-5" />
              Configuración
            </li>
            <li
              onClick={() => setActiveSection("Reportes")}
              className="hover:bg-black/10 hover:dark:bg-white/10"
            >
              <FileIcon className="size-5" />
              Reportes
            </li>
            <li
              onClick={() => setActiveSection("Estadísticas")}
              className="hover:bg-black/10 hover:dark:bg-white/10"
            >
              <StatsIcon02 className="size-5" />
              Estadísticas
            </li>
            <li
              onClick={() => setActiveSection("Usuarios")}
              className="hover:bg-black/10 hover:dark:bg-white/10"
            >
              <UsersIcon className="size-5" />
              Usuarios
            </li>
          </ul>
        </aside>

        {activeSection === "Perfil" && <UserProfile />}
        {activeSection === "Configuración" && <Configuration />}
        {activeSection === "Reportes" && <Reports />}
        {activeSection === "Estadísticas" && <Stats />}
        {activeSection === "Usuarios" && <Users />}
      </main>
    </ProtectedRoute>
  );
}
