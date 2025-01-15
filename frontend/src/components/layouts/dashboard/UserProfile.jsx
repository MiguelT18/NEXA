import React from "react";

export default function UserProfile() {
  return (
    <section className="w-full min-h-[calc(100dvh-14dvh)] border dark:border-light-gray border-dark-gray rounded-lg p-4 md:py-4 md:px-8">
      <h1 className="text-lg font-sans font-bold">Perfil de Usuario</h1>
      <p className="dark:text-difuminate-text-dark text-difuminate-text-light text-sm mt-2">
        Actualiza tu información de perfil y personaliza tu cuenta.
      </p>
    </section>
  );
}
