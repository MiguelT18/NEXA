"use client"

import { useTheme } from "@/hooks/useTheme"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { GlobalIcons } from "@/components/icons/index";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [isHidden, setIsHidden] = useState(false);

  const pathname = usePathname();

  const { theme } = useTheme();

  useEffect(() => {
    if (pathname.match("/dashboard")) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [pathname]);

  return (
    <footer
      className={`${isHidden ? "hidden" : ""} dark:bg-dark-background bg-white w-full min-h-[10dvh] border-t border-dark-gray/25 dark:border-light-gray dark:border-background-light max-md:hidden flex justify-around items-center`}
    >
      <Link
        href="/"
        className={`font-black font-sans uppercase text-[28px] inline-block ${
          theme === "light" ? "text-gradient-light" : "text-gradient-dark"
        }`}
      >
        NEXA AI
      </Link>

      <div className="flex items-center gap-4 [&>div]:size-8 [&>div]:text-black/60 [&>div]:dark:text-white">
        <GlobalIcons.FacebookIcon className="size-6 cursor-pointer text-light-gray/65 dark:text-white/80 hover:text-black hover:dark:text-white/50 transition-all" />
        <GlobalIcons.TwitterIcon className="size-6 cursor-pointer text-light-gray/65 dark:text-white/80 hover:text-black hover:dark:text-white/50 transition-all" />
        <GlobalIcons.InstagramIcon className="size-6 cursor-pointer text-light-gray/65 dark:text-white/80 hover:text-black hover:dark:text-white/50 transition-all" />
      </div>

      <span className="inline-block text-sm text-difuminate-text-light dark:text-difuminate-text-dark cursor-pointer transition-all hover:underline">
        contacto@nexaai.com
      </span>
    </footer>
  );
}
