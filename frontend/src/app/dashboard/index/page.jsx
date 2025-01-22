"use client";

import { useState } from "react";
import {
  ArrowIcon,
  TrendingUpIcon,
  BalanceWalletIcon,
} from "@/components/icons";
import PerformanceChart from "@/components/layouts/dashboard/PerformanceChart";
import OrderHistory from "@/components/layouts/dashboard/OrderHistory";
import RecentActivty from "@/components/layouts/dashboard/RecentActivity";

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
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <>
      <h1 className="text-lg font-sans font-bold">Dashboard</h1>

      <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(240px,1fr))] mt-5">
        {userDashboard.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <article
              key={index}
              className="border border-dark-gray/25 dark:border-light-gray rounded-md p-4 w-full"
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

      <div className="relative">
        <div className="flex md:flex-row max-md:flex-col mt-5 bg-light-gray/15 dark:bg-light-gray max-md:w-full md:w-fit rounded-lg [&>button]:px-4 [&>button]:py-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`hover:dark:bg-dark-gray hover:bg-light-gray/15 max-md:w-full block transition-all max-md:rounded-t-[inherit] md:rounded-l-[inherit] ${
              activeTab === "orders"
                ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                : ""
            }`}
          >
            Historial de Órdenes
          </button>
          <button
            onClick={() => setActiveTab("operations")}
            className={`hover:dark:bg-dark-gray hover:bg-light-gray/15 max-md:w-full block transition-all max-md:rounded-b-[inherit] md:rounded-r-[inherit] ${
              activeTab === "operations"
                ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                : ""
            }`}
          >
            Actividad Reciente
          </button>
        </div>

        {activeTab === "orders" && <OrderHistory />}
        {activeTab === "operations" && <RecentActivty />}
      </div>
    </>
  );
}
