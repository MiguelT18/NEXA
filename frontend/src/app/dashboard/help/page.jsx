"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { PrimaryButton } from "@/components/ui/pure/Buttons";
import { useNotification } from "@/hooks/useNotification";

export default function Help() {
  const { showNotification } = useNotification();

  return (
    <>
      <h1 className="text-lg font-sans font-bold">Reportar un problema</h1>

      <article className="border border-dark-gray/25 dark:border-light-gray w-full p-4 rounded-lg mt-5">
        <div>
          <h2 className="text-md font-bold">Formulario de Reporte</h2>
          <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Por favor, proporciona los detalles del problema que estás
            experimentando.
          </p>
        </div>

        <form className="flex flex-col gap-4 mt-5">
          <div className="space-y-2">
            <span>Área de interés</span>
            <Select>
              <SelectTrigger className="max-w-[300px]">
                <SelectValue placeholder="Selecciona un área de interés" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Áreas de interés</SelectLabel>
                  <SelectItem value="bug">Errores</SelectItem>
                  <SelectItem value="managment">Administración</SelectItem>
                  <SelectItem value="tecnical">Técnico</SelectItem>
                  <SelectItem value="support">Soporte</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <label
            htmlFor="subject"
            className="flex flex-col [&>input]:rounded-md [&>input]:p-2 [&>input]:mt-1 [&>input]:bg-transparent [&>input]:border [&>input]:dark:border-light-gray [&>input]:border-light-gray/25"
          >
            Asunto
            <input type="text" placeholder="Descripción breve del problema" />
          </label>
          <label
            htmlFor="subject"
            className="flex flex-col [&>textarea]:rounded-md [&>textarea]:p-2 [&>textarea]:mt-1 [&>textarea]:bg-transparent [&>textarea]:border [&>textarea]:dark:border-light-gray [&>textarea]:border-light-gray/25 [&>textarea]:resize-none"
          >
            Descripción
            <textarea name="" id="subject" cols="30" rows="8"></textarea>
          </label>

          <PrimaryButton
            width="fit"
            onClick={() =>
              showNotification(
                "Falta agregar interacción a este botón.",
                "info"
              )
            }
          >
            Enviar reporte
          </PrimaryButton>
        </form>
      </article>
    </>
  );
}
