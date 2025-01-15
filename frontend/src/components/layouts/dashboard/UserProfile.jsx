import React from "react";

export default function UserProfile() {
  return (
    <section className="w-full min-h-[calc(100dvh-14dvh)] border dark:border-light-gray border-dark-gray rounded-lg p-4 md:py-4 md:px-8">
      <h1 className="text-lg font-sans font-bold">Perfil de Usuario</h1>

      <div className="bg-dark-gray/10 dark:bg-dark-gray w-full p-4 rounded-lg mt-5">
        <h2 className="text-md font-bold font-sans mb-2">
          Información Personal
        </h2>
        <p className="text-difuminate-text-light dark:text-difuminate-text-dark">
          Actualiza tu información de perfil y personaliza tu cuenta.
        </p>
      </div>
    </section>
  );
}
