import { EmptyIcon } from "@/components/icons";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { InfoIcon } from "lucide-react";

const operations = [
  {
    title: "Compra automática de ETH",
    description: "1.5 ETH a $1900",
    date: "2023-06-05 14:30",
  },
  {
    title: "Venta automática de BTC",
    description: "0.2 BTC a $30500",
    date: "2023-06-04 09:15",
  },
  {
    title: "Ajuste de estrategia",
    description: "Cambio a estrategia conservadora",
    date: "2023-06-03 18:45",
  },
  {
    title: "Depósito",
    description: "Depósito de $5000 USD",
    date: "2023-06-02 11:20",
  },
  {
    title: "Inicio de bot",
    description: "Bot de trading iniciado con éxito",
    date: "2023-06-01 16:00",
  },
];

export default function RecentActivity() {
  return (
    <div className="w-full mt-6 border border-dark-gray/25 dark:border-light-gray py-5 rounded-xl">
      <div className="flex items-center gap-2 px-5">
        <div className="relative group w-fit">
          <div className="transition-all hover:bg-light-gray/15 hover:dark:bg-dark-gray p-2 rounded-md cursor-pointer">
            <InfoIcon />
          </div>
          <div className="scale-0 group-hover:scale-100 transition transform duration-100 ml-5 mb-2 absolute max-sm:w-[240px] max-md:w-[360px] md:w-max max-w-[600px] bottom-full -left-5 bg-black text-white dark:bg-white dark:text-black p-2 rounded-lg">
            <p>
              El historial almacena un máximo de 50 actividades. Las actividades
              más antiguas se eliminarán automáticamente de manera ascendente a
              medida que se agreguen nuevas.
              <span className="inline-block mt-2 font-bold">
                Puede descargar un comprobante de la actividad que desee en
                formato PDF para mantener un registro seguro y accesible.
              </span>
            </p>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-md font-bold">Actividad Reciente</h2>
          <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
            Últimas acciones realizadas en tu cuenta
          </p>
        </div>
      </div>

      <div className="mt-4">
        {operations.length !== 0 ? (
          operations.map((operation, index) => (
            <article
              key={index}
              className="px-5 py-2 hover:bg-light-gray/15 hover:dark:bg-light-gray transition-all cursor-pointer flex justify-between items-center gap-2"
            >
              <div>
                <h2 className="text-sm font-sans font-semibold">
                  {operation.title}
                </h2>
                <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                  {operation.description}
                </p>
              </div>
              <span className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                {operation.date}
              </span>
            </article>
          ))
        ) : (
          <div className="w-full min-h-[270px] flex items-center flex-col justify-center space-y-2 h-full">
            <EmptyIcon className="size-10 mx-auto text-difuminate-text-light dark:text-difuminate-text-dark" />
            <p className="block w-fit mx-auto text-center text-difuminate-text-light dark:text-difuminate-text-dark">
              No hay operaciones recientes
            </p>
          </div>
        )}
      </div>

      <Pagination className="border-dark-gray/25 dark:border-light-gray mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
