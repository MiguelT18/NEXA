import React from "react";
import ControlButton from "@/components/ui/pure/ControlButton";

export default function MarketMenu() {
  return (
    <aside className="w-[320px] p-4 hidden border border-dark-gray/25 dark:border-light-gray rounded-lg md:block">
      <div className="border border-dark-gray/25 dark:border-light-gray rounded-md px-2 py-4">
        <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark text-center">
          Inversión
        </h3>

        <ControlButton />

        <h3 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark text-center mt-5">
          Cantidad/Lotaje
        </h3>

        <ControlButton isCurrency={false} />
      </div>
    </aside>
  );
}
