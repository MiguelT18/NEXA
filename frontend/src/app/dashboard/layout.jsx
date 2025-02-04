"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import React, { useState, useEffect, useRef } from "react";
import {
  UserIcon,
  ConfigIcon,
  FileIcon,
  TriangleArrowIcon,
  ShortcutsIcon,
  BugIcon,
  DashboardIcon,
} from "@/components/icons/index";
import { usePathname, useRouter } from "next/navigation";
import SideMenu from "@/components/ui/pure/SideMenu";

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ProtectedRoute>
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
      </main>
    </ProtectedRoute>
  );
}
