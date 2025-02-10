"use client";

import { useState } from "react";
import { GlobalIcons } from "@/components/icons";

export default function Wallet() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const handleHideBalance = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-5 size-full [&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:p-4 [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5 [&>article]:dark:text-white">
      <article className="dark:bg-alt-dark-primary-color/20 p-5 rounded-lg border border-alt-dark-primary-border w-full max-w-md relative">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <h2 className="text-md font-medium text-black dark:text-white">
            Balance Total
          </h2>
          <button
            onClick={handleHideBalance}
            type="button"
            className="block size-fit rounded-md p-2 text-alt-dark-blue dark:bg-alt-dark-primary-color/20 hover:dark:bg-alt-dark-blue/40 transition-all cursor-pointer outline-none"
          >
            {isBalanceHidden ? (
              <GlobalIcons.CloseEyeIcon className="size-5" />
            ) : (
              <GlobalIcons.OpenEyeIcon className="size-5" />
            )}
          </button>
        </div>

        {/* Balance Principal */}
        <div className="mt-2">
          <p className="text-lg font-bold text-white">
            {isBalanceHidden ? "•••••••" : "$45,231.89 USD"}
          </p>
          <span className="text-positive-light-green dark:text-positive-dark-green text-sm">
            +20.1% desde el último mes
          </span>
        </div>

        {/* Balance en Trading y Disponible */}
        <div className="mt-4 flex justify-between text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          <div>
            <p>En Trading</p>
            <span className="text-white font-semibold text-md">
              {isBalanceHidden ? "••••" : "$12,450.00"}
            </span>
          </div>
          <div>
            <p>Disponible</p>
            <span className="text-white font-semibold text-md">
              {isBalanceHidden ? "••••" : "$32,781.89"}
            </span>
          </div>
        </div>
      </article>

      <article>2</article>

      <article className="lg:col-span-3 lg:col-start-1 lg:row-start-2">
        3
      </article>

      <article className="lg:col-start-3 lg:row-start-1">4</article>
    </section>
  );
}
