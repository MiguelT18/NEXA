"use client";

import React, { useState, useEffect } from "react";
import { ArrowIcon } from "@/components/icons/index";

const markets = [
  { name: "BTC/USD", price: 43250.2 },
  { name: "ETH/USD", price: 2280.15 },
  { name: "GOLD/USD", price: 2014.3 },
  { name: "EUR/USD", price: 1.0925 },
];

export default function MarketTicker() {
  const [prices, setPrices] = useState(markets);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(
        prices.map((market) => ({
          ...market,
          price: market.price * (1 + (Math.random() - 0.5) * 0.002),
          trending: Math.random() > 0.5,
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [prices]);

  return (
    <div className="flex animate-scroll gap-8 whitespace-nowrap w-full">
      <div className="flex gap-8">
        {prices.map((market, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm">{market.name}</span>
            <span
              className={`${market.trending ? "text-green-500" : "text-red-500"} text-sm`}
            >
              ${market.price.toFixed(2)}
              {market.trending ? (
                <ArrowIcon className="ml-1 inline size-4" />
              ) : (
                <ArrowIcon className="ml-1 inline size-4 rotate-180" />
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-8">
        {prices.map((market, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm">{market.name}</span>
            <span
              className={market.trending ? "text-green-500" : "text-red-500"}
            >
              ${market.price.toFixed(2)}
              {market.trending ? (
                <ArrowIcon className="ml-1 inline size-4" />
              ) : (
                <ArrowIcon className="ml-1 inline size-4 rotate-180" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
