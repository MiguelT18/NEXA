import { ArrowIcon } from "@/components/icons";
import ControlButton from "@/components/ui/pure/ControlButton";
import { Checkbox } from "@radix-ui/react-checkbox";
import React from "react";

export default function MarketMenuManual() {
  return (
    <article className="border border-dark-gray/25 dark:border-light-gray rounded-md p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark text-center">
          Inversión
        </h3>
        <ControlButton />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark text-center">
          Cantidad/Lotaje
        </h3>
        <ControlButton isFloatValue={true} />
      </div>

      <div className="flex justify-between items-center gap-2">
        <div className="space-y-2">
          <label
            htmlFor="takeProfit"
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox id="takeProfit" />
            Take profit
          </label>

          <input
            type="text"
            placeholder="0.00"
            className="p-2 w-full rounded-md bg-transparent border border-dark-gray/25 dark:border-light-gray"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="stopLoss"
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox id="stopLoss" />
            Stop loss
          </label>

          <input
            type="text"
            placeholder="0.00"
            className="p-2 w-full rounded-md bg-transparent border border-dark-gray/25 dark:border-light-gray"
          />
        </div>
      </div>

      <div className="space-y-4 pt-2 [&>button]:w-full [&>button]:p-2 [&>button]:text-white [&>button]:rounded-md">
        <button className="bg-green-500 dark:bg-green-700 hover:dark:dark:bg-green-700/70 hover:bg-green-500/90 transition-all flex items-center justify-center gap-2">
          <ArrowIcon className="size-4" />
          Comprar
        </button>
        <button className="bg-red-500 dark:bg-red-700 hover:dark:bg-red-700/70 hover:bg-red-500/90 transition-all flex items-center justify-center gap-2">
          <ArrowIcon className="size-4 rotate-180" />
          Vender
        </button>
      </div>
    </article>
  );
}
