"use client";

import { GlobalIcons } from "@/components/icons";
import PrimaryButton from "@/components/ui/global/custom/Buttons/PrimaryButton";
import SecondaryButton from "@/components/ui/global/custom/Buttons/SecondaryButton";
import CustomSelect from "@/components/ui/global/custom/CustomSelect";
import SwitchButton from "@/components/ui/pure/SwitchButton";
import { useNotification } from "@/hooks/useNotification";
import React from "react";

export default function Configuration() {
  const { showNotification } = useNotification();

  const accountTypes = [
    {
      value: "demo",
      label: "Demo",
    },
    {
      value: "real",
      label: "Real",
    },
  ];

  const riskLevels = [
    {
      value: "low",
      label: "Bajo",
    },
    {
      value: "medium",
      label: "Medio",
    },
    {
      value: "high",
      label: "Alto",
    },
  ];

  return (
    <section className="size-full grid gap-5 md:grid-cols-4 md:grid-rows-4 [&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:p-4 [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5 [&>article]:text-black [&>article]:dark:text-white">
      <article className="md:row-start-1 md:row-span-2 md:col-start-1 md:col-span-2">
        <h1 className="text-md font-semibold text-black dark:text-white">
          Conexión con MetaTrader5
        </h1>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark mb-2">
          Configura tu conexión con MetaTrader5 para que NEXA pueda operar.
        </p>

        <p className="block p-2 dark:bg-yellow-500/10 rounded-lg border border-yellow-500/50 dark:text-white text-sm">
          <span className="font-bold block">Importante:</span>
          Asegúrate de tener una cuenta de MetaTrader5 con Deriv. NEXA solo
          funciona con activos de Deriv.
        </p>

        <form className="mt-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <label htmlFor="brokerServer">
              Servidor del Broker
              <input
                type="text"
                id="brokerServer"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>

            <label htmlFor="mt5AccountId">
              ID de Cuenta MT5
              <input
                type="text"
                id="mt5AccountId"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>

            <label htmlFor="brokerPassword">
              Contraseña del Broker
              <input
                type="password"
                id="brokerPassword"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>

            <div>
              <span className="block mb-2">Tipo de Cuenta</span>
              <CustomSelect options={accountTypes} />
            </div>
          </div>

          <div className="flex justify-between items-center max-lg:items-start max-lg:flex-col gap-4 mt-4">
            <div className="flex justify-between gap-2 w-full">
              <PrimaryButton
                type="button"
                onClick={() =>
                  showNotification("Error al cambiar la contraseña.", "error")
                }
              >
                Conectar
              </PrimaryButton>
              <SecondaryButton
                type="button"
                onClick={() =>
                  showNotification("Error al cambiar la contraseña.", "error")
                }
              >
                Probar conexión
              </SecondaryButton>
            </div>

            <div className="text-negative-light-red dark:text-negative-dark-red flex lg:w-[40%] items-center gap-2 text-sm">
              <GlobalIcons.InfoIcon className="size-6" />
              <span>No conectado</span>
            </div>
          </div>
        </form>
      </article>

      <article className="md:row-start-1 md:row-span-2 md:col-start-3 md:col-span-2">
        <h1 className="text-md font-semibold text-black dark:text-white">
          Seguridad de la Cuenta
        </h1>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Actualiza tu contraseña y configura opciones adicionales de seguridad
          para mantener tu cuenta segura.
        </p>

        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-black dark:text-white">
              Autenticación de Dos Factores (2FA)
            </h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Aumenta la seguridad de tu cuenta con la autenticación de dos
              factores.
            </p>
          </div>

          <SwitchButton />
        </div>

        <form className="mt-4">
          <h3 className="text-sm font-semibold text-black dark:text-white">
            Cambiar Contraseña
          </h3>
          <p className="mb-2 text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Actualiza tu contraseña para mantener tu cuenta segura y accesible.
          </p>

          <div className="space-y-2 mb-4 [&>label]:block">
            <label htmlFor="currentPassword">
              Contraseña actual
              <input
                type="password"
                id="currentPassword"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>
            <label htmlFor="currentPassword">
              Nueva contraseña
              <input
                type="password"
                id="currentPassword"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>
            <label htmlFor="currentPassword">
              Confirmar nueva contraseña
              <input
                type="password"
                id="currentPassword"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </label>
          </div>

          <PrimaryButton
            type="button"
            onClick={() =>
              showNotification("Error al cambiar la contraseña.", "error")
            }
          >
            Cambiar Contraseña
          </PrimaryButton>
        </form>
      </article>

      <article className="md:row-start-3 md:row-span-2 lg:col-span-1 md:col-span-2 md:col-start-1">
        <h1 className="text-md font-semibold text-black dark:text-white">
          Notificaciones
        </h1>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Configura tus preferencias de notificaciones
        </p>

        <div className="mt-4 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-black dark:text-white">
                Notificaciones a tu teléfono
              </h3>
              <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Recibe notificaciones directamente a tu dispositivo.
              </p>
            </div>

            <SwitchButton />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-black dark:text-white">
                Notificaciones a tu correo electrónico
              </h3>
              <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Recibe notificaciones por correo electrónico.
              </p>
            </div>

            <SwitchButton />
          </div>
        </div>
      </article>

      <article className="md:row-start-3 md:row-span-2 md:col-start-3 md:col-span-2 lg:col-span-3">
        <h1 className="text-md font-semibold text-black dark:text-white">
          Configuración de Nexa IA
        </h1>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Personaliza cómo la IA operará en tu cuenta.
        </p>

        <div className="flex flex-col gap-5 mt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-black dark:text-white">
                  Trading automático con IA
                </h3>
                <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                  Permite que la IA opere automáticamente en tu cuenta.
                </p>
              </div>

              <SwitchButton />
            </div>

            <div>
              <span className="block mb-2">Nivel de Riesgo</span>
              <CustomSelect options={riskLevels} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white">
              Gestión de Riesgos
            </h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Configura límites para proteger tu cuenta.
            </p>

            <form className="flex flex-col gap-2 mt-2">
              <label htmlFor="maxDailyLoss">
                Pérdida Máxima Diaria ($)
                <input
                  type="text"
                  id="maxDailyLoss"
                  className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
                />
              </label>

              <label htmlFor="maxOpenPositions">
                Máximo de Posiciones Abiertas Diarias
                <input
                  type="text"
                  id="maxOpenPositions"
                  className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
                />
              </label>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white">
              Horario de Trading
            </h3>
            <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Define las horas en las que la IA puede operar.
            </p>

            <div className="mt-2">
              <label className="block text-sm text-black dark:text-white">
                Hora de Inicio
              </label>
              <input
                type="date"
                defaultValue="1990-01-01"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm text-black dark:text-white">
                Hora de Fin
              </label>
              <input
                type="date"
                defaultValue="1990-01-01"
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <PrimaryButton
            onClick={() =>
              showNotification("Error al guardar los cambios.", "error")
            }
          >
            Guardar Cambios
          </PrimaryButton>
        </div>
      </article>
    </section>
  );
}
