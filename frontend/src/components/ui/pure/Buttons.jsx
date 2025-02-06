import React from "react";
import Link from "next/link";

export function PrimaryButton({
  type = "button",
  children,
  href,
  width,
  ...props
}) {
  const baseClass = `w-${width} flex items-center justify-center gap-2 dark:hover:bg-white/80 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md transition-all`;

  if (href) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} {...props}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  type = "button",
  children,
  href,
  width,
  ...props
}) {
  const baseClass = `w-${width} flex items-center justify-center gap-2 p-2 rounded-md tracking-wide border-difuminate-text-dark hover:border-difuminate-text-light dark:border-light-gray border hover:dark:text-difuminate-text-dark transition-all`;

  if (href) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} {...props}>
      {children}
    </button>
  );
}

export function ColorizedButton({
  type = "button",
  children,
  href,
  width = "fit",
  ...props
}) {
  const baseClass = `w-${width} primary-button text-white flex items-center justify-center gap-2 tracking-wide dark:bg-primary-color hover:dark:bg-primary-color/60 bg-secondary-color hover:bg-secondary-color/80 transition-all p-2 rounded-md`;

  if (href) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} {...props}>
      {children}
    </button>
  );
}

export function DestructiveButton({
  type = "button",
  children,
  href,
  width = "fit",
  ...props
}) {
  const baseClass = `w-${width} flex items-center justify-center gap-2 border hover:border-red-700/80 hover:text-red-700/80 border-red-500 text-red-500 rounded-md p-2 transition-all`;

  if (href) {
    return (
      <Link href={href} className={baseClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClass} {...props}>
      {children}
    </button>
  );
}
