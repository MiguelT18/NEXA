"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React, { useState, useEffect, useRef } from "react";
import {
  UserIcon,
  ConfigIcon,
  FileIcon,
  TriangleArrowIcon,
  ShortcutsIcon,
} from "@/components/icons/index";
import DashboardIcon from "@/components/icons/dashboard";
import { usePathname, useRouter } from "next/navigation";
import BugIcon from "@/components/icons/bug";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/index",
    icon: <DashboardIcon className="size-5" />,
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: <UserIcon className="size-5" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuration",
    icon: <ConfigIcon className="size-5" />,
  },
  {
    title: "Reportes",
    href: "/dashboard/reports",
    icon: <FileIcon className="size-5" />,
  },
  {
    title: "Atajos de teclado ",
    href: "/dashboard/shortcuts",
    icon: <ShortcutsIcon className="size-5" />,
  },
  {
    title: "Ayuda",
    href: "/dashboard/help",
    icon: <BugIcon className="size-5" />,
  },
];

export default function DashboardPage({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <ProtectedRoute>
      <main className="flex">
        <aside
          ref={menuRef}
          className={`border-r border-dark-gray/25 dark:border-light-gray bg-white dark:bg-dark-background px-2 max-md:hidden md:sticky z-10 duration-300 ${
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

          <ul className="flex flex-col gap-2 [&>li]:cursor-pointer [&>li]:text-sm [&>li]:rounded-md [&>li]:flex [&>li]:gap-2 [&>li]:items-center [&>li]:p-3">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                onClick={() => router.push(`${item.href}`)}
                className={`hover:bg-light-gray/15 hover:dark:bg-white/10 ${pathname === item.href ? "bg-light-gray/15 dark:bg-white/10" : ""}`}
              >
                <div>{item.icon}</div>
                <span
                  className={`text-sm text-nowrap ${isMenuOpen ? "block" : "hidden"}`}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="w-full h-full min-h-[calc(100dvh-20dvh)] p-5 max-md:pb-32">
          {children}
        </section>
      </main>
    </ProtectedRoute>
  );
}
