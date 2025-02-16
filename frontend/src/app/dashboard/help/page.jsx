"use client";

import Image from "next/image";
import React from "react";
import TradingImg from "@/images/hero-image-01.jpg";
import CustomSelect from "@/components/ui/global/custom/CustomSelect";
import PrimaryButton from "@/components/ui/global/custom/Buttons/PrimaryButton";
import { useNotification } from "@/hooks/useNotification";

export default function Help() {
  const { showNotification } = useNotification();

  const areas = [
    {
      label: "Bug",
      value: "bug",
    },
    {
      label: "Soporte",
      value: "support",
    },
    {
      label: "Otro...",
      value: "other",
    },
  ];

  return (
    <section className="[&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5 [&>article]:dark:text-white">
      <article className="size-full flex">
        <div className="w-1/2">
          <Image
            src={TradingImg}
            className="object-cover size-full"
            alt="Gráfico de trading"
            priority={true}
          />
        </div>

        <div className="w-1/2 p-4">
          <h1 className="text-lg font-bold">Reportar un Problema</h1>
          <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Por favor, proporciona los detalles del problema que estás
            experimentando.
          </p>

          <form className="mt-2">
            <div className="mb-4 flex flex-col gap-2">
              <div>
                <span className="mb-1">Área de atención</span>
                <CustomSelect options={areas} />
              </div>

              <label htmlFor="subject">
                Asunto
                <input
                  id="subject"
                  type="text"
                  className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
                />
              </label>

              <label htmlFor="description">
                Descripción
                <textarea
                  rows={4}
                  id="description"
                  type="text"
                  className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
                />
              </label>
            </div>

            <PrimaryButton
              type="button"
              onClick={() =>
                showNotification("Error al enviar el reporte.", "error")
              }
            >
              Enviar reporte
            </PrimaryButton>
          </form>
        </div>
      </article>
    </section>
  );
}
