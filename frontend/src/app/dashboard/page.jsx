"use client";

import React from "react";
import {
  ArrowIcon,
  TrendingUpIcon,
  BalanceWalletIcon,
} from "@/components/icons";
import PerformanceChart from "@/components/layouts/dashboard/PerformanceChart";
import OrderHistory from "@/components/layouts/dashboard/OrderHistory";

const iconMap = {
  "trending-up": TrendingUpIcon,
  arrow: ArrowIcon,
  "balance-wallet": BalanceWalletIcon,
};

const userDashboard = [
  { title: "Balance", icon: "trending-up", value: "$ 50 000" },
  {
    title: "Disponible",
    icon: "balance-wallet",
    value: "$ 3 500",
  },
  {
    title: "Evaluación de Rendimiento",
    icon: "trending-up",
    value: "Positivo",
  },
  { title: "Operaciones Totales", icon: "trending-up", value: 5 },
];

export default function Dashboard() {
  return (
    <section className="w-full min-h-[calc(100dvh-14dvh)] p-5 max-md:pb-28 relative">
      <h1 className="text-lg font-sans font-bold">Dashboard</h1>

      <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(240px,1fr))] mt-5">
        {userDashboard.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <article
              key={index}
              className="border dark:border-light-gray rounded-md p-4 w-full"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-sans font-semibold">
                  {item.title}
                </h3>
                <div>
                  <Icon
                    className={`size-5 ${(index === 1) | (index === 2) ? "text-secondary-color" : ""}`}
                  />
                </div>
              </div>

              <h1
                className={`text-lg font-bold ${
                  (index === 1) | (index === 2) ? "text-secondary-color" : ""
                }`}
              >
                {item.value}
              </h1>
              {item.percentage && (
                <span className="text-sm text-secondary-color font-bold">
                  {item.percentage}
                </span>
              )}
            </article>
          );
        })}
      </div>

      <PerformanceChart />

      <OrderHistory />
    </section>
  );
}
