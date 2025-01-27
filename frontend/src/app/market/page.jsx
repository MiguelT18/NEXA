"use client";

import Market from "@/components/layouts/market/Market";
import MarketMenu from "@/components/layouts/market/MarketMenu";
import React from "react";

export default function MarketPage() {
  return (
    <main className="min-h-[80dvh] flex gap-4">
      <section className="flex-1 min-w-0">
        <Market />
      </section>

      <MarketMenu />
    </main>
  );
}
