"use client";

import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import { GlobalIcons } from "@/components/icons/index";
import SideMenu from "@/components/ui/pure/SideMenu";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <GlobalIcons.DashboardIcon className="size-5" />,
  },
  {
    title: "Mi Billetera",
    href: "/dashboard/wallet",
    icon: <GlobalIcons.BalanceWalletIcon className="size-5" />,
  },
  {
    title: "Mi Perfil",
    href: "/dashboard/profile",
    icon: <GlobalIcons.UserIcon className="size-5" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/configuration",
    icon: <GlobalIcons.ConfigIcon className="size-5" />,
  },
  {
    title: "Ayuda",
    href: "/dashboard/help",
    icon: <GlobalIcons.BugIcon className="size-5" />,
  },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    display: "none",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
    display: "block",
  },
};

const navItems = [
  {
    value: "/",
    label: "Volver al inicio",
  },
  {
    value: "/logout",
    label: "Cerrar sesión",
  },
];

export default function DashboardPage({ children }) {
  const data = {
    name: "Miguel Terán",
    username: "@miguelt",
    email: "miguel.teranj02@gmail.com",
  };

  const pathname = usePathname();
  const router = useRouter();

  const { theme, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  useEffect(() => {
    const closeMenu = (event) => {
      // Asegúrate de que el clic no esté dentro del menú
      if (isNavMenuOpen && !event.target.closest(".menu-container")) {
        setIsNavMenuOpen(false);
      }
    };

    if (isNavMenuOpen) {
      // Agrega el listener cuando el menú está abierto
      document.addEventListener("mousedown", closeMenu);
    }

    return () => {
      // Remueve el listener cuando el componente se desmonte o el menú se cierre
      document.removeEventListener("mousedown", closeMenu);
    };
  }, [isNavMenuOpen]);

  return (
    <ProtectedRoute>
      <SideMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}>
        <header className="flex-grow">
          <div
            className={`${!isMenuOpen ? "hidden" : "block"} bg-secondary-color/5 backdrop-blur-sm rounded-xl mb-5`}
          >
            <div className={`h-2 w-full rounded-t-[inherit] bg-gradient-pro`} />

            <div className="flex justify-between items-center p-4">
              <div className="space-y-1 text-nowrap [&>h3]:block [&>span]:block">
                <h3 className="font-bold text-sm">Plan Actual</h3>
                <span className="text-difuminate-text-dark">Trader Pro</span>
              </div>

              <Link
                href="/plans"
                className="block dark:bg-alt-dark-primary-color/30 p-2 rounded-md transition-all hover:dark:bg-alt-dark-primary-color/50 dark:text-white/50 hover:dark:text-white/80"
              >
                <GlobalIcons.InfoIcon className="size-full" />
              </Link>
            </div>
          </div>

          <ul className="flex flex-col gap-2 [&>li]:cursor-pointer [&>li]:text-sm [&>li]:rounded-md [&>li]:flex [&>li]:gap-2 [&>li]:items-center [&>li]:p-3">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                onClick={() => router.push(`${item.href}`)}
                className={`hover:bg-light-gray/15 hover:dark:bg-alt-dark-primary-color/50 ${pathname === item.href ? "bg-light-gray/15 dark:bg-alt-dark-primary-color/50" : ""}`}
              >
                <div>{item.icon}</div>
                <span
                  className={`text-sm text-nowrap font-sans ${isMenuOpen ? "block" : "hidden"}`}
                >
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </header>

        <footer className={`${isMenuOpen ? "block" : "hidden"} mt-auto`}>
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="hover:bg-light-gray/15 hover:dark:bg-alt-dark-primary-color/50 text-sm text-nowrap p-3 rounded-md transition-all flex items-center gap-2"
            >
              {theme === "dark" ? (
                <GlobalIcons.SunRisingIcon className="size-5 block text-white" />
              ) : (
                <GlobalIcons.MoonRisingIcon className="size-5 block text-white" />
              )}
              <span className="block size-fit mt-0.5 text-sm font-sans">
                Cambiar {theme === "dark" ? "Claro" : "Oscuro"}
              </span>
            </button>
            <Link
              href="/"
              className="hover:bg-light-gray/15 hover:dark:bg-alt-dark-primary-color/50 text-sm text-nowrap p-3 rounded-md transition-all flex items-center gap-2"
            >
              <GlobalIcons.HomeIcon className="size-5 block" />
              <span className="block size-fit mt-0.5 text-sm font-sans">
                Volver al inicio
              </span>
            </Link>
          </div>

          <hr className="my-5 dark:border-difuminate-text-dark" />

          <article className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="size-fit p-2 rounded-full bg-alt-dark-primary-border/30"
            >
              <GlobalIcons.UserIcon className="size-6 dark:text-white" />
            </Link>

            <div>
              <h2 className="text-sm">Miguel Terán</h2>
              <span
                onClick={() => navigator.clipboard.writeText(data.email)}
                className="text-difuminate-text-dark text-xs"
              >
                {data.email}
              </span>
            </div>
          </article>
        </footer>
      </SideMenu>

      <nav className="container mx-auto min-h-[10dvh] p-4 flex justify-between md:pl-20 max-md:flex-col-reverse max-md:gap-6 relative">
        <div className="h-fit w-full my-auto md:max-w-[50%] relative">
          <input
            spellCheck="false"
            type="search"
            placeholder="Buscar"
            className="w-full bg-transparent py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-full dark:text-white outline-none"
          />
          <GlobalIcons.SearchIcon className="text-difuminate-text-light dark:text-difuminate-text-dark absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

        <div className="w-fit flex items-center gap-4 max-md:flex-row-reverse">
          <h4 className="font-bold font-sans text-md dark:text-white block">
            Hola Miguel!
          </h4>

          <div onClick={toggleNavMenu} className="relative cursor-pointer">
            <div className="p-2 rounded-full bg-alt-dark-primary-color/25">
              <GlobalIcons.UserIcon className="size-fit dark:text-white" />
            </div>

            <AnimatePresence>
              {isNavMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={menuVariants}
                  className="absolute right-0 top-12 dark:bg-primary-color/50 backdrop-blur-sm rounded-md z-10"
                >
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setIsNavMenuOpen(false); // Cierra el menú al seleccionar un ítem
                        router.push(`/${item.value}`);
                      }}
                      className="hover:bg-light-gray/15 hover:dark:bg-alt-dark-primary-color/50 text-white w-full text-sm text-nowrap p-3 transition-all flex items-center gap-2 rounded-[inherit]"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="xl:container xl:mx-auto w-full md:h-[calc(100dvh-10dvh)] md:pl-20 max-md:p-5 md:pr-5 md:pb-5">
        {children}
      </main>
    </ProtectedRoute>
  );
}
