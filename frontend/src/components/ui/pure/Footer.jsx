"use client";

import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/icons/index";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (pathname === "/market") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [pathname]);

  return (
    <footer
      className={`${isVisible ? "" : "hidden"} dark:bg-dark-background bg-white py-6 w-full border-t border-dark-gray/25 dark:border-light-gray dark:border-background-light max-md:hidden flex justify-around items-center`}
    >
      <Link
        href="/"
        className={`font-black font-sans uppercase text-[28px] inline-block ${
          theme === "light" ? "text-gradient-light" : "text-gradient-dark"
        }`}
      >
        NEXA AI
      </Link>

      <div className="flex items-center gap-4 [&>div]:size-8 [&>div]:text-black/60 [&>div]:dark:text-white transition-all">
        <div className="cursor-pointer hover:text-black hover:dark:text-white/60">
          <FacebookIcon className="size-full" />
        </div>
        <div className="cursor-pointer hover:text-black hover:dark:text-white/60">
          <TwitterIcon className="size-full" />
        </div>
        <div className="cursor-pointer hover:text-black hover:dark:text-white/60">
          <InstagramIcon className="size-full" />
        </div>
      </div>

      <span className="inline-block text-sm text-difuminate-text-light dark:text-difuminate-text-dark cursor-pointer transition-all hover:underline">
        contacto@nexaai.com
      </span>
    </footer>
  );
}
