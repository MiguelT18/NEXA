"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useTheme } from "@/hooks/useTheme";
import { GlobalIcons } from "@/components/icons";
import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const { theme } = useTheme();

  const handleHideBalance = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  const userTransactions = [
    {
      id: 1,
      type: "Depósito",
      amount: 500.0,
      currency: "USD",
      date: "2025-02-09 14:30",
      status: "Completado",
      method: "Tarjeta de crédito",
    },
    {
      id: 2,
      type: "Retiro",
      amount: 200.0,
      currency: "USD",
      date: "2025-02-08 10:15",
      status: "Pendiente",
      method: "Transferencia bancaria",
    },
    {
      id: 3,
      type: "Transferencia",
      amount: 50.0,
      currency: "USD",
      date: "2025-02-07 18:45",
      status: "Completado",
      to: "miguel.teranj02@gmail.com",
    },
    {
      id: 4,
      type: "Depósito",
      amount: 1000.0,
      currency: "USD",
      date: "2025-02-06 09:20",
      status: "Completado",
      method: "Crypto USDT",
    },
    {
      id: 5,
      type: "Retiro",
      amount: 75.5,
      currency: "USD",
      date: "2025-02-05 16:10",
      status: "Fallido",
      method: "PayPal",
    },
  ];

  const recentTrades = [
    {
      currency: "BOOM1000",
      type: "Long",
      amount: "+ $200.15 USD",
      trade: "up",
      timeAgo: "2 min ago",
      priceRange: "42150.65 → 42350.8",
    },
    {
      currency: "BOOM500",
      type: "Short",
      amount: "+ $29.7 USD",
      trade: "down",
      timeAgo: "15 min ago",
      priceRange: "2280.5 → 2250.8",
    },
    {
      currency: "CRASH1000",
      type: "Long",
      amount: "- $0.4 USD",
      trade: "up",
      timeAgo: "1 hour ago",
      priceRange: "95.2 → 94.8",
    },
    {
      currency: "CRASH500",
      type: "Long",
      amount: "+ $119.4 USD",
      trade: "up",
      timeAgo: "1 hour ago",
      priceRange: "95.2 → 94.8",
    },
  ];

  const chartData = [
    { month: "Enero", negative: 186, positive: 80 },
    { month: "Febrero", negative: 305, positive: 200 },
    { month: "Marzo", negative: 237, positive: 400 },
    { month: "Abril", negative: 73, positive: 190 },
    { month: "Mayo", negative: 150, positive: 310 },
    { month: "Junio", negative: 69, positive: 243 },
    { month: "Julio", negative: 223, positive: 423 },
    { month: "Agosto", negative: 232, positive: 123 },
    { month: "Septiembre", negative: 123, positive: 486 },
    { month: "Octubre", negative: 42, positive: 285 },
    { month: "Noviembre", negative: 48, positive: 296 },
    { month: "Diciembre", negative: 48, positive: 348 },
  ];

  const chartConfig = {
    negative: {
      label: "Negativo",
      color: theme === "dark" ? "#B3261E" : "#E53935",
    },
    positive: {
      label: "Positivo",
      color: theme === "dark" ? "#16A34A" : "#0FA958",
    },
  };

  const statsData = [
    {
      label: "Trades Positivos",
      percentage: 75,
      change: "+5%",
      progressColor: "#22c55e",
      chartConfig: { positive: { label: "Positivos", color: "#22c55e" } },
    },
    {
      label: "Trades Negativos",
      percentage: 25,
      change: "-5%",
      progressColor: "#ef4444",
      chartConfig: { negative: { label: "Negativos", color: "#ef4444" } },
    },
    {
      label: "Rendimiento",
      percentage: 32.5,
      change: "30d",
      progressColor: "#14b8a6",
      chartConfig: { performance: { label: "Rendimiento", color: "#14b8a6" } },
    },
    {
      label: "Win Rate",
      percentage: 68,
      change: "+2%",
      progressColor: "#10b981",
      chartConfig: { winRate: { label: "Win Rate", color: "#10b981" } },
    },
  ];

  return (
    <section className="text-white size-full grid gap-5 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 [&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:p-4 [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5">
      <article className="lg:col-span-1">
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold font-sans text-md dark:text-white text-black">
              Balance Total
            </h2>

            <Link
              href="/dashboard/wallet"
              className="size-fit rounded-md p-2 text-alt-dark-blue dark:bg-alt-dark-primary-color/20 hover:dark:bg-alt-dark-blue/40 transition-all cursor-pointer outline-none"
            >
              <GlobalIcons.PlusIcon className="size-6" />
            </Link>
          </div>

          <div className="space-y-2">
            <div className="font-sans font-bold text-lg flex items-center gap-2">
              <button
                onClick={handleHideBalance}
                type="submit"
                className="block size-fit rounded-md p-2 text-alt-dark-blue dark:bg-alt-dark-primary-color/20 hover:dark:bg-alt-dark-blue/40 transition-all cursor-pointer outline-none"
              >
                {isBalanceHidden ? (
                  <GlobalIcons.CloseEyeIcon className="size-5" />
                ) : (
                  <GlobalIcons.OpenEyeIcon className="size-5" />
                )}
              </button>
              <p className="text-lg font-bold text-white">
                {isBalanceHidden ? "•••••••" : "$45,231.89 USD"}
              </p>
            </div>
            <span className="block dark:text-positive-dark-green text-positive-light-green">
              <span className="font-sans font-bold">+12.5%</span> esta semana
            </span>
          </div>
        </header>

        <main className="pt-4">
          <h3 className="text-md font-bold font-sans">Últimos movimientos</h3>

          <ul className="space-y-3 pt-2">
            {userTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-gray-200 dark:border-gray-700 pb-3 gap-2"
              >
                {/* Icono + Información de la Transacción */}
                <div className="flex items-center gap-3 w-full min-w-0">
                  {/* ICONO SEGÚN EL TIPO DE MOVIMIENTO */}
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-md shrink-0 ${
                      transaction.status === "Completado"
                        ? "bg-green-500/10"
                        : transaction.status === "Pendiente"
                          ? "bg-yellow-500/10"
                          : "bg-red-500/10"
                    }`}
                  >
                    {transaction.type === "Depósito" ? (
                      <GlobalIcons.PlusIcon className="size-5 text-green-500" />
                    ) : transaction.type === "Retiro" ? (
                      <GlobalIcons.MinusIcon className="size-5 text-red-500" />
                    ) : (
                      <GlobalIcons.ArrowIcon className="size-5 text-blue-500" />
                    )}
                  </span>

                  {/* INFORMACIÓN DE LA TRANSACCIÓN */}
                  <div className="flex-1 min-w-0">
                    <span className="text-black dark:text-white text-sm font-medium block truncate">
                      {transaction.type}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {transaction.date} ·{" "}
                      {transaction.method
                        ? transaction.method
                        : `A: ${transaction.to}`}
                    </p>
                  </div>
                </div>

                {/* MONTO Y ESTADO */}
                <div className="flex flex-col sm:items-end w-full sm:w-auto">
                  <span className="dark:text-difuminate-text-dark text-sm font-semibold font-sans">
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <p
                    className={`text-xs ${
                      transaction.status === "Completado"
                        ? "text-green-500"
                        : transaction.status === "Pendiente"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {transaction.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-2 pt-4 [&>button]:w-fit [&>button]:p-2 [&>button]:rounded-md [&>button]:bg-alt-dark-blue/20 transition-all">
            <button
              type="button"
              className="hover:dark:bg-alt-dark-primary-color/40 transition-all outline-none"
            >
              <GlobalIcons.ArrowIcon className="size-4 -rotate-90" />
            </button>

            <div className="space-x-4 [&>span]:inline-block">
              <span className="text-alt-dark-blue">1</span>
              <span>2</span>
              <span>3</span>
            </div>

            <button
              type="button"
              className="hover:dark:bg-alt-dark-primary-color/40 transition-all outline-none"
            >
              <GlobalIcons.ArrowIcon className="size-4 rotate-90" />
            </button>
          </div>
        </main>
      </article>

      <article className="lg:col-span-2 flex flex-col justify-between">
        <header>
          <h2 className="text-md font-sans font-bold">
            Rendimiento de tus últimos trades
          </h2>
          <p className="text-difuminate-text-light dark:text-difuminate-text-dark pb-2">
            Últimos 365 días
          </p>

          <div className="text-difuminate-text-light dark:text-difuminate-text-dark flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#E53935] dark:bg-[#B3261E]"></div>
              Negativo
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#0FA958] dark:bg-[#16A34A]"></div>
              Positivo
            </span>
          </div>
        </header>

        <ChartContainer config={chartConfig} className="h-[60%]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="positive"
              type="monotone"
              stroke="var(--color-positive)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="negative"
              type="monotone"
              stroke="var(--color-negative)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </article>

      <article className="lg:col-span-2">
        <h2 className="text-lg font-bold font-sans">Resumen de Rendimiento</h2>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark mt-1">
          Tus trades y rendimiento en los últimos 30 días y tu tasa de éxito
          general.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="dark:bg-alt-dark-primary-color/10 p-4 rounded-lg flex justify-between items-center gap-4 w-full"
            >
              {/* Información del Indicador */}
              <div>
                <span className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm">
                  {stat.label}
                </span>
                <p className="flex gap-4 text-lg [&>span]:block">
                  <span
                    className={`font-bold font-sans text-lg ${stat.label === "Trades Negativos" ? "text-negative-light-red dark:text-negative-dark-red" : "text-positive-light-green dark:text-positive-dark-green"}`}
                  >
                    {stat.percentage}%
                  </span>
                  <span
                    className={`font-sans font-medium text-sm mt-1 ${
                      stat.change.includes("%")
                        ? stat.change.startsWith("-")
                          ? "text-negative-light-red dark:text-negative-dark-red" // 🔴 Rojo si es negativo
                          : "text-positive-light-green dark:text-positive-dark-green" // 🟢 Verde si es positivo
                        : "dark:text-difuminate-text-dark text-difuminate-text-light" // 🎨 Color neutro si no es porcentaje
                    }`}
                  >
                    {stat.change}
                  </span>
                </p>
              </div>

              {/* 📌 ChartContainer envuelve a RadialBarChart */}
              <ChartContainer config={stat.chartConfig} className="size-[80px]">
                <RadialBarChart
                  width={100}
                  height={100}
                  cx="50%"
                  cy="50%"
                  innerRadius="80%"
                  outerRadius="100%"
                  barSize={10}
                  data={[{ value: stat.percentage }]}
                  startAngle={90}
                  endAngle={-270} // Sentido contrario a las agujas del reloj
                >
                  {/* Eje Fantasma para trayectoria completa */}
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />

                  {/* 🎯 Barra de Progreso */}
                  <RadialBar
                    dataKey="value"
                    fill={stat.progressColor} // Color dinámico
                    background={{ fill: "#2d3748", opacity: 0.8 }} // Fondo de la barra
                    cornerRadius={50}
                    clockWise
                  />
                </RadialBarChart>
              </ChartContainer>
            </div>
          ))}
        </div>
      </article>

      <article className="lg:col-span-1">
        <h2 className="text-md font-bold font-sans">Historial de Trades</h2>

        <ul className="pt-5 space-y-4">
          {recentTrades.map((trade, index) => (
            <li
              key={index}
              className="flex flex-col justify-between gap-3 sm:gap-4 border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              <div className="flex justify-between items-center">
                {/* Divisa y tipo de operación */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Icono según dirección del trade */}
                  <span
                    className={`flex items-center justify-center w-9 h-9 p-2 rounded-md shrink-0 ${
                      trade.trade === "up" ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    <GlobalIcons.TrendingArrowIcon
                      className={`size-6 ${
                        trade.trade === "up"
                          ? "text-green-500"
                          : "text-red-500 rotate-180 scale-x-[-1]"
                      }`}
                    />
                  </span>

                  {/* Divisa */}
                  <div className="flex flex-col">
                    <span className="block text-black dark:text-white text-sm font-medium truncate">
                      {trade.currency}
                    </span>
                    <span
                      className={`w-fit px-2 py-1 rounded-md text-xs font-semibold truncate ${
                        trade.type === "Long"
                          ? "text-green-500 bg-green-500/10"
                          : "text-red-500 bg-red-500/10"
                      }`}
                    >
                      {trade.type}
                    </span>
                  </div>
                </div>

                {/* Monto y rango de precios */}
                <div className="flex flex-col items-start sm:items-end sm:w-auto [&>span]:block [&>span]:w-fit">
                  <span
                    className={`text-sm font-bold font-sans truncate ${
                      trade.amount.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {trade.amount}
                  </span>
                  <span className="font-sans text-xs text-gray-500 dark:text-gray-400 truncate">
                    {trade.priceRange}
                  </span>
                </div>
              </div>

              {/* Tiempo transcurrido */}
              <div className="flex items-center justify-start gap-2 text-xs text-gray-500 dark:text-gray-400 truncate w-full sm:w-auto text-right">
                <span className="block text-gray-500 dark:text-gray-400">
                  <GlobalIcons.ClockIcon className="size-5" />
                </span>
                {trade.timeAgo}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center gap-2 pt-4 [&>button]:w-fit [&>button]:p-2 [&>button]:rounded-md [&>button]:bg-alt-dark-blue/20 transition-all">
          <button
            type="button"
            className="hover:dark:bg-alt-dark-primary-color/40 transition-all outline-none"
          >
            <GlobalIcons.ArrowIcon className="size-4 -rotate-90" />
          </button>

          <div className="space-x-4 [&>span]:inline-block">
            <span className="text-alt-dark-blue">1</span>
            <span>2</span>
            <span>3</span>
          </div>

          <button
            type="button"
            className="hover:dark:bg-alt-dark-primary-color/40 transition-all outline-none"
          >
            <GlobalIcons.ArrowIcon className="size-4 rotate-90" />
          </button>
        </div>
      </article>
    </section>
  );
}
