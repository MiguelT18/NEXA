"use client";

import React from "react";
import Market from "@/components/layouts/market/Market";
import MarketChat from "@/components/layouts/market/MarketChat";
import MarketMenu from "@/components/layouts/market/MarketMenu";

export default function MarketPage() {
  return (
    <main className="md:min-h-[80dvh] flex flex-col">
      <nav className="w-full overflow-hidden border border-dark-gray/25 dark:border-light-gray rounded-md p-4">
        <ul className="flex gap-4 items-center">
          <li>BOOM500</li>
          <li>BOOM1000</li>
          <li>CRASH500</li>
          <li>CRASH1000</li>
        </ul>
      </nav>

      <section className="flex-1 grid grid-cols-[1fr_auto] md:gap-4 py-5">
        <div className="flex flex-col gap-5">
          <article className="relative w-full h-[550px] rounded-lg border border-dark-gray/25 dark:border-light-gray">
            <Market />
          </article>

          <article className="flex-1 border border-dark-gray/25 dark:border-light-gray rounded-md overflow-y-auto">
            <MarketChat />
          </article>
        </div>

        <aside className="w-full max-lg:max-w-[300px] lg:max-w-[400px]">
          <MarketMenu />
        </aside>
      </section>
    </main>
  );
}

