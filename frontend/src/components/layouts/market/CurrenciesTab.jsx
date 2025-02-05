import { GlobalIcons } from "@/components/icons";
import React from "react";

const currencies = [
  {
    symbol: "BOOM300",
    price: 1037.705,
    change: 0.018,
    percentage: 0.0,
    trending: "up",
  },
  {
    symbol: "BOOM500",
    price: 5762.774,
    change: 0.008,
    percentage: 0.0,
    trending: "up",
  },
  {
    symbol: "BOOM1000",
    price: 20092.933,
    change: 0.046,
    percentage: 0.0,
    trending: "down",
  },
  {
    symbol: "CRASH300",
    price: 3053.876,
    change: 0.022,
    percentage: 0.0,
    trending: "down",
  },
  {
    symbol: "CRASH500",
    price: 4140.035,
    change: 0.019,
    percentage: 0.0,
    trending: "up",
  },
  {
    symbol: "CRASH1000",
    price: 5337.7,
    change: 0.004,
    percentage: 0.0,
    trending: "down",
  },
];

export default function CurrenciesTab({ isVisible }) {
  return (
    <div className={`mt-5 ${!isVisible ? "hidden" : ""}`}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
          <GlobalIcons.SearchIcon className="size-6 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 text-sm rounded-lg bg-transparent border border-light-gray/25 dark:border-light-gray outline-none focus:dark:border-white focus:border-black"
          placeholder="Buscar activos..."
        />
      </div>

      <div className="mt-5 space-y-2">
        {currencies.map((currency, index) => (
          <article
            key={index}
            className="p-2 cursor-pointer hover:bg-light-gray/15 dark:hover:bg-light-gray rounded-lg transition-all"
          >
            <h2 className="font-bold text-sm">{currency.symbol}</h2>

            <div className="flex justify-between items-center gap-2">
              <p className="block text-sm dark:text-difuminate-text-dark text-difuminate-text-light">
                <span>{currency.price}</span> - <span>{currency.change}</span>{" "}
                <span>({currency.percentage.toPrecision(3)}%)</span>
              </p>

              <GlobalIcons.TriangleSolidArrowIcon
                className={`size-4 ${currency.trending === "up" ? "text-green-500" : "text-red-500 rotate-180"}`}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
