import React from "react";

export default function Stats() {
  return (
    <section className="w-full min-h-[calc(100dvh-14dvh)] border dark:border-light-gray border-dark-gray rounded-lg p-4 md:py-4 md:px-8">
      <h1 className="text-lg font-sans font-bold">Estadísticas</h1>
      <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm mt-2">
        Obtén estadísticas sobre tus operaciones.
      </p>
    </section>
  );
}
