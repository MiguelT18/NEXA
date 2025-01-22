"use client";

import React from "react";
import {
  MoonRisingIcon,
  SunRisingIcon,
  MenuIcon,
  UserIcon,
} from "@/components/icons/index";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import DefaultAvatar from "@/images/avatars/default-avatar.png";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";

export default function Navbar() {
  const { showNotification } = useNotification();

  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    showNotification("Imposible cerrar sesión en este momento", "error");
  };

  return (
    <nav className="dark:bg-dark-background bg-white block px-4 w-full z-20 max-md:fixed max-md:bottom-0 max-md:border-t md:border-b border-dark-gray dark:border-light-gray dark:border-background-light">
      {/* Desktop Navbar */}
      <div className="max-md:hidden flex justify-around items-center min-h-[10dvh]">
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
              className="text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 px-4 py-2 rounded-md transition-all"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              href="/plans"
              className="text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 px-4 py-2 rounded-md transition-all"
            >
              Planes
            </Link>
          </li>

          <li>
            <Link
              href="/market"
              className="text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 px-4 py-2 rounded-md transition-all"
            >
              Mercado
            </Link>
          </li>

          <li
            className="hover:bg-light-gray/15 hover:dark:bg-white/10 p-2 rounded-md transition-all"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MoonRisingIcon className="text-black dark:text-white size-6" />
            ) : (
              <SunRisingIcon className="text-black dark:text-white size-6" />
            )}
          </li>

          <li className="relative group">
            {!user ? (
              <div className="hover:bg-light-gray/15 hover:dark:bg-white/10 p-2 rounded-md transition-all">
                <UserIcon className="size-6" />
              </div>
            ) : avatar ? (
              <div className="hover:bg-light-gray/15 hover:dark:bg-white/10 p-2 rounded-md transition-all">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full"
                />
              </div>
            ) : (
              <div className="hover:bg-light-gray/15 hover:dark:bg-white/10 p-2 rounded-md transition-all">
                <Image
                  src={DefaultAvatar}
                  alt="Default Avatar"
                  width={250}
                  height={250}
                  className="size-8 object-cover aspect-square rounded-full"
                />
              </div>
            )}

            {!user ? (
              <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-dark-background border border-difuminate-text-dark dark:border-light-gray rounded-md w-40 z-20 group-hover:pointer-events-auto pointer-events-none">
                <Link
                  href="/login"
                  className="inline-block w-full text-start px-4 py-2 text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 transition-all rounded-t-[inherit]"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="inline-block w-full text-start px-4 py-2 text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 transition-all rounded-y-[inherit]"
                >
                  Crear Cuenta
                </Link>
                <Link
                  href="/dashboard/index"
                  className=" inline-block w-full text-start px-4 py-2 text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 transition-all rounded-y-[inherit]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="inline-block w-full text-start px-4 py-2 text-sm hover:bg-light-gray/15 hover:dark:bg-white/10 transition-all rounded-b-[inherit]"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="w-max absolute right-0 hidden group-hover:block bg-white dark:bg-dark-background border border-difuminate-text-dark dark:border-light-gray text-start rounded-md z-20 group-hover:pointer-events-auto pointer-events-none">
                <Link
                  href="/dashboard/index"
                  className="w-full block px-4 py-2 text-sm hover:bg-light-gray/5 hover:dark:bg-white/10 transition-all rounded-t-[inherit]"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full block px-4 py-2 text-sm hover:bg-light-gray/5 hover:dark:bg-white/10 transition-all rounded-b-[inherit]"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <ul className="md:hidden dark:bg-background w-full flex justify-around max-sm:justify-between items-center min-h-[10dvh]">
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
          {!user ? (
            <UserIcon className="size-9" />
          ) : avatar ? (
            <img src={avatar} alt="Avatar" className="w-9 h-9 rounded-full" />
          ) : (
            <Image
              src={DefaultAvatar}
              alt="Default Avatar"
              width={250}
              height={250}
              className="size-9 object-cover aspect-square rounded-full"
            />
          )}
        </li>
      </ul>
    </nav>
  );
}
