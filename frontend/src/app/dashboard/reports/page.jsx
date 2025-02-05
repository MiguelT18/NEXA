"use client";

import { useState } from "react";
import OrderHistory from "@/components/layouts/dashboard/OrderHistory";
import RecentActivty from "@/components/layouts/dashboard/RecentActivity";

import { format } from "date-fns";
import { GlobalIcons } from "@/components/icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PrimaryButton, SecondaryButton } from "@/components/ui/pure/Buttons";
import { useNotification } from "@/hooks/useNotification";

export default function ReportsGenerator() {
  const { showNotification } = useNotification();

  const [date, setDate] = useState();
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <>
      <h1 className="text-lg font-sans font-bold">Generador de Reportes</h1>

      <article className="border border-dark-gray/25 dark:border-light-gray w-full p-4 rounded-lg mt-5">
        <h2 className="text-md font-bold mb-4">Reportes de Rendimiento</h2>

        <div className="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-4">
          <div>
            <span className="mb-1 block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Fecha de inicio
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date &&
                      "text-muted-foreground border-dark-gray/25 dark:border-light-gray"
                  )}
                >
                  <GlobalIcons.CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-dark-gray/25 dark:border-light-gray"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <span className="mb-1 block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Fecha de fin
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date &&
                      "text-muted-foreground border-dark-gray/25 dark:border-light-gray"
                  )}
                >
                  <GlobalIcons.CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 border-dark-gray/25 dark:border-light-gray"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <span className="mb-1 block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
              Tipo de Reporte
            </span>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de reporte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Actividad Reciente</SelectItem>
                <SelectItem value="orders">Historial de Órdenes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative">
          <div className="flex md:flex-row max-md:flex-col mt-5 bg-light-gray/15 dark:bg-light-gray max-md:w-full md:w-fit rounded-lg [&>button]:px-4 [&>button]:py-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`hover:dark:bg-dark-gray hover:bg-light-gray/15 max-md:w-full block transition-all max-md:rounded-t-[inherit] md:rounded-l-[inherit] ${
                activeTab === "orders"
                  ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                  : ""
              }`}
            >
              Historial de Órdenes
            </button>
            <button
              onClick={() => setActiveTab("operations")}
              className={`hover:dark:bg-dark-gray hover:bg-light-gray/15 max-md:w-full block transition-all max-md:rounded-b-[inherit] md:rounded-r-[inherit] ${
                activeTab === "operations"
                  ? "bg-light-gray/15 dark:bg-dark-gray text-black/30 dark:text-white/30"
                  : ""
              }`}
            >
              Actividad Reciente
            </button>
          </div>

          {activeTab === "orders" && <OrderHistory />}
          {activeTab === "operations" && <RecentActivty />}
        </div>

        <div className="flex items-center gap-4 mt-5">
          <PrimaryButton
            onClick={() =>
              showNotification(
                "Falta agregar interacción a este botón.",
                "info"
              )
            }
          >
            <GlobalIcons.FileIcon />
            Descargar PDF
          </PrimaryButton>
          <SecondaryButton
            onClick={() =>
              showNotification(
                "Falta agregar interacción a este botón.",
                "info"
              )
            }
          >
            <GlobalIcons.FileIcon />
            Descargar Excel
          </SecondaryButton>
        </div>
      </article>
    </>
  );
}
