import React from "react";
import MarketMenuManual from "./MarketMenuManual";
import MarketMenuAuto from "./MarketMenuAuto";

export default function MarketMenu() {
  return (
    <div className="size-full p-4 hidden border border-dark-gray/25 dark:border-light-gray rounded-lg md:block">
      <MarketMenuManual />
      <MarketMenuAuto />
    </div>
  );
}
