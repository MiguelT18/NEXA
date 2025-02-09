"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import { useState } from "react";
import { GlobalIcons } from "@/components/icons/index";
import { usePathname, useRouter } from "next/navigation";
import SideMenu from "@/components/ui/pure/SideMenu";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard/index",
    icon: <GlobalIcons.DashboardIcon className="size-5" />,
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: <GlobalIcons.UserIcon className="size-5" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuration",
    icon: <GlobalIcons.ConfigIcon className="size-5" />,
  },
  {
    title: "Reportes",
    href: "/dashboard/reports",
    icon: <GlobalIcons.FileIcon className="size-5" />,
  },
  {
    title: "Atajos de teclado ",
    href: "/dashboard/shortcuts",
    icon: <GlobalIcons.ShortcutsIcon className="size-5" />,
  },
  {
    title: "Ayuda",
    href: "/dashboard/help",
    icon: <GlobalIcons.BugIcon className="size-5" />,
  },
];

export default function DashboardPage({ children }) {
  const { theme } = useTheme();

  return (
    <ProtectedRoute>
      <nav>
        <Link
          href="/"
          className={`font-black font-sans uppercase text-[28px] w-fit inline-block ${
            theme === "light" ? "text-gradient-light" : "text-gradient-dark"
          }`}
        >
          NEXA AI
        </Link>

        <div className="size-full relative">
          <input
            type="search"
            placeholder="Buscar"
            className="w-full bg-transparent p-2 border border-alt-dark-green-border rounded-full"
          />
          <GlobalIcons.SearchIcon className="size-6 absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </nav>

      {/* <nav className="w-full h-[10dvh] md:pl-20 p-2 fixed left-1/2 -translate-x-1/2 top-0">
        <div className="w-full justify-between flex items-center border-2 border-alt-green-border rounded-full">
          <h4 className="block p-2">Hola {name}!</h4>
          <div className="flex justify-center items-center border-1 border-alt-green-border p-2 rounded-md">
            <GlobalIcons.UserIcon className="size-8" />
          </div>
        </div>
      </nav>

      <main className="flex relative">
        <SideMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}>
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
        </SideMenu>

        <section className="w-full h-full min-h-[calc(100dvh-20dvh)] md:pl-20 p-5 max-md:pb-32">
          {children}
        </section>
      </main> */}
    </ProtectedRoute>
  );
}
