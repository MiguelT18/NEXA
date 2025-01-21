"use client";

import React from "react";
import SwitchButton from "@/components/ui/SwitchButton";

export default function Configuration() {
  return (
    <section className="w-full min-h-[calc(100dvh-14dvh)] overflow-y-auto p-5 relative">
      <h1 className="text-lg font-sans font-bold">Configuración</h1>

      <article className="border border-dark-gray w-full p-4 rounded-lg mt-5">
        <h2 className="text-md font-bold mb-2">Cambiar Contraseña</h2>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Actualiza tu contraseña para mantener tu cuenta segura.
        </p>

        <form>
          <div className="w-full space-y-4 my-5 [&>label]:w-full [&>label]:flex [&>label]:flex-col [&>label>input]:w-full [&>label>input]:rounded-md [&>label>input]:p-2 [&>label>input]:dark:bg-dark-background [&>label>input]:bg-white [&>label>input]:border [&>label>input]:border-dark-gray [&>label>input]:dark:border-light-gray [&>label>input]:mt-2">
            <label htmlFor="currentPassword">
              Contraseña actual:
              <input type="password" />
            </label>

            <label htmlFor="currentPassword">
              Nueva contraseña:
              <input type="password" />
            </label>

            <label htmlFor="currentPassword">
              Confirmar nueva contraseña:
              <input type="password" />
            </label>
          </div>

          <button className="dark:hover:bg-white/80 bg-black text-white dark:bg-white dark:text-black p-2 rounded-md transition-all">
            Cambiar contraseña
          </button>
        </form>
      </article>

      <article className="border border-dark-gray dark:border-dark-gray w-full p-4 rounded-lg mt-5">
        <div>
          <h2 className="text-md font-bold">Seguridad de la Cuenta</h2>
          <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Configura opciones adicionales de seguridad.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-8">
          <div>
            <h3 className="font-bold text-sm">Autenticación de Dos Factores</h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Aumenta la seguridad de tu cuenta con la autenticación de dos
              factores.
            </p>
          </div>

          <SwitchButton />
        </div>
      </article>

      <article className="border border-dark-gray dark:border-dark-gray w-full p-4 rounded-lg mt-5">
        <div>
          <h2 className="text-md font-bold">Notificaciones</h2>
          <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Configura tus preferencias de notificaciones
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-8">
          <div>
            <h3 className="font-bold text-sm">Notificaciones Push</h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Recibe notificaciones push en tu dispositivo.
            </p>
          </div>

          <SwitchButton />
        </div>

        <div className="flex items-center justify-between mt-8">
          <div>
            <h3 className="font-bold text-sm">Notificaciones por Email</h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Recibe notificaciones por correo electrónico.
            </p>
          </div>

          <SwitchButton />
        </div>
      </article>
    </section>
  );
}
