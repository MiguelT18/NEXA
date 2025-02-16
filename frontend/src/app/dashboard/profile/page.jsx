"use client";

import { GlobalIcons } from "@/components/icons";
import { useNotification } from "@/hooks/useNotification";
import CustomSelect from "@/components/ui/global/custom/CustomSelect";
import { useState } from "react";
import PrimaryButton from "@/components/ui/global/custom/Buttons/PrimaryButton";
import SecondaryButton from "@/components/ui/global/custom/Buttons/SecondaryButton";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTheme } from "@/hooks/useTheme";

const countries = [
  {
    value: "spain",
    label: "Spain",
    cities: ["Madrid", "Barcelona", "Sevilla"],
  },
  {
    value: "mexico",
    label: "Mexico",
    cities: ["Mexico City", "Guadalajara", "Monterrey"],
  },
  {
    value: "argentina",
    label: "Argentina",
    cities: ["Buenos Aires", "Rosario", "Santa Fe"],
  },
];

const chartData = [
  { month: "Enero", desktop: 186 },
  { month: "Febrero", desktop: 305 },
  { month: "Marzo", desktop: 237 },
  { month: "Abril", desktop: 273 },
  { month: "Mayo", desktop: 209 },
  { month: "Junio", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Ventas",
    color: "hsl(var(--chart-1))",
  },
};

export default function UserProfile() {
  const { theme } = useTheme();
  const { showNotification } = useNotification();
  const [selectedCountry, setSelectedCountry] = useState(countries[0] || null);
  const [cities, setCities] = useState(countries[0]?.cities || []);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      showNotification("Modo edición activado.", "info");
    }
  };

  return (
    <section className="size-full grid gap-5 grid-cols-1 md:grid-cols-2 md:grid-rows-4 [&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:p-4 [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5 [&>article]:dark:text-white [&>article]:text-black">
      <article className="md:row-start-1 md:row-span-3">
        {/* 📌 Imagen de Perfil con Overlay en Hover */}
        <div
          className="relative flex justify-center items-center mb-4 w-fit mx-auto group cursor-pointer"
          onClick={() =>
            showNotification("Error al editar la imagen.", "error")
          }
        >
          {/* 📌 Imagen de perfil */}
          <div className="w-24 h-24 rounded-full bg-primary-color dark:bg-alt-dark-primary-border/30 flex items-center justify-center overflow-hidden">
            <GlobalIcons.UserIcon className="size-12 text-white" />
          </div>

          {/* 🔥 Overlay con ícono de edición (Aparece en hover) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <GlobalIcons.EditIcon className="size-6 text-white" />
          </div>

          {/* 📌 Botón explícito para cambiar imagen */}
          <div className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full border border-gray-600">
            <GlobalIcons.CameraIcon className="size-4 text-white" />
          </div>
        </div>

        {/* 📌 Información del Usuario */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Miguel Terán
          </h2>
          <p className="text-md text-difuminate-text-light dark:text-difuminate-text-dark">
            @miguel.teran
          </p>
        </div>

        {/* 📌 Detalles Personales */}
        <div className="grid grid-cols-2 gap-4 text-sm text-difuminate-text-light dark:text-difuminate-text-dark border-t border-gray-600 pt-4">
          <div className="truncate">
            <p className="text-sm">Email</p>
            <span className="text-sm font-medium text-black dark:text-white">
              miguel.teran@example.com
            </span>
          </div>
          <div>
            <p className="text-sm">Teléfono</p>
            <span className="text-sm font-medium text-black dark:text-white">
              1234567890
            </span>
          </div>
          <div>
            <p className="text-sm">Dirección</p>
            <span className="text-sm font-medium text-black dark:text-white">
              Calle Principal 123
            </span>
          </div>
          <div>
            <p className="text-sm">País</p>
            <span className="text-sm font-medium text-black dark:text-white">
              Bolivia
            </span>
          </div>
          <div>
            <p className="text-sm">Ciudad</p>
            <span className="text-sm font-medium text-black dark:text-white">
              Tarija
            </span>
          </div>
          <div>
            <p className="text-sm">Fecha de Nacimiento</p>
            <span className="text-sm font-medium text-black dark:text-white">
              04/02/2001
            </span>
          </div>
        </div>

        {/* 📌 Plan Actual */}
        <div className="border-t border-gray-600 pt-4 mt-4">
          <p className="text-sm font-bold text-black dark:text-white">
            Plan Actual
          </p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-white text-sm bg-gradient-pro px-4 py-1 rounded-full">
              Trader Pro
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded-md">
              Activo
            </span>
          </div>
          <p className="text-xs text-difuminate-text-light dark:text-difuminate-text-dark mt-4">
            Renovación automática: 15/03/2024
          </p>
        </div>
      </article>

      <article className="md:row-start-1 md:row-span-3 flex flex-col justify-between">
        <div className="flex-1">
          {/* 📌 Encabezado */}
          <header className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-md font-bold text-black dark:text-white">
                Editar Perfil
              </h1>
              <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Actualiza tu información personal
              </p>
            </div>
            <button
              onClick={toggleEdit}
              type="button"
              className={`p-2 rounded-md transition-all ${isEditing ? "bg-negative-light-red hover:bg-negative-light-red/80 dark:bg-negative-dark-red hover:dark:bg-negative-dark-red/80" : "hover:bg-primary-color/80 hover:dark:bg-alt-dark-blue bg-primary-color active:scale-95"}`}
            >
              <GlobalIcons.EditIcon className="size-6 text-white" />
            </button>
          </header>

          {/* 📌 Formulario */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 📝 Nombre Completo */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Nombre Completo
              </label>
              <input
                type="text"
                defaultValue="Miguel Terán"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            {/* 📝 Nombre de Usuario */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Nombre de Usuario
              </label>
              <input
                type="text"
                defaultValue="miguel.teran"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            {/* 📧 Email */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Email
              </label>
              <input
                type="email"
                defaultValue="miguel.teran@example.com"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            {/* 📞 Teléfono */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Teléfono
              </label>
              <input
                type="tel"
                defaultValue="+1234567890"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            {/* 📍 Dirección */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Dirección
              </label>
              <input
                type="text"
                defaultValue="Calle Principal 123"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>

            {/* 🌍 País */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                País
              </label>
              <CustomSelect
                disabled={!isEditing}
                options={countries.map((country) => ({
                  value: country.value,
                  label: country.label,
                }))}
                defaultValue={selectedCountry}
              />
            </div>

            {/* 🏙️ Ciudad */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Ciudad
              </label>
              <CustomSelect
                disabled={!isEditing}
                options={cities.map((city) => ({ value: city, label: city }))}
              />
            </div>

            {/* 📅 Fecha de Nacimiento */}
            <div>
              <label className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                defaultValue="1990-01-01"
                disabled={!isEditing}
                className="w-full bg-alt-light-primary-color/20 disabled:bg-alt-light-primary-color/10 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-md dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 disabled:cursor-not-allowed mt-1"
              />
            </div>
          </form>
        </div>

        <div className="space-y-5 mt-4">
          <p className="block p-2 dark:bg-yellow-500/10 rounded-lg border border-yellow-500/50 dark:text-white text-sm">
            <span className="font-bold block">Importante:</span>
            ¡Ten en cuenta que solo podrás restablecer tus cambios si no has
            guardado tus datos de perfil!
          </p>

          {/* 📌 Botones */}
          <div className="flex justify-between gap-5">
            <SecondaryButton
              disabled={!isEditing}
              onClick={() =>
                showNotification("Botón aún no implementado.", "error")
              }
            >
              Restablecer
            </SecondaryButton>
            <PrimaryButton
              disabled={!isEditing}
              onClick={() =>
                showNotification("Botón aún no implementado.", "error")
              }
            >
              Guardar Cambios
            </PrimaryButton>
          </div>
        </div>
      </article>

      <article className="md:row-start-4 md:row-span-2">
        <h2 className="text-md font-bold dark:text-white">
          Tu enlace de referidos
        </h2>

        <p className="mt-2 text-sm dark:text-difuminate-text-dark text-difuminate-text-light">
          Comparte este enlace con tus amigos y familiares para que puedan hacer
          trading de forma más eficiente y con mayor privacidad.
        </p>
        <p
          onClick={() =>
            showNotification("Error al copiar al portapapeles.", "error")
          }
          className="w-full bg-alt-light-primary-color/20 py-2 px-4 dark:bg-alt-dark-primary-color/10 rounded-full dark:text-white outline-none disabled:text-black/50 disabled:dark:text-white/50 cursor-not-allowed flex justify-between items-center gap-2 mt-4"
        >
          https://tu-enlace-de-referidos.com
          <span className="block dark:text-white">
            <GlobalIcons.ClipboardIcon className="size-6" />
          </span>
        </p>
      </article>

      <article className="md:row-start-4 md:row-span-2">
        <h2 className="text-md font-bold dark:text-white">
          Rendimiento de tus ventas anuales
        </h2>

        <div className="w-full h-full flex items-center justify-between gap-4">
          <ChartContainer
            config={chartConfig}
            className="w-full mx-auto aspect-square max-h-[150px]"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid stroke={theme === "dark" ? "#2d2d33" : "#bcbcc3"} />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>

          <div className="w-[80%]">
            <p className="flex items-center gap-2 dark:text-difuminate-text-dark text-difuminate-text-light">
              <GlobalIcons.TrendingArrowIcon className="size-8 bg-positive-light-green/30 dark:bg-positive-dark-green/30 p-1 rounded-md text-positive-light-green dark:text-positive-dark-green" />
              Ventas un 5.2% positivas este mes
            </p>
            <p className="text-xs dark:text-difuminate-text-dark text-difuminate-text-light flex items-center gap-2 mt-2">
              <GlobalIcons.ClockIcon className="size-5 rounded-md dark:text-difuminate-text-dark text-difuminate-text-light" />
              Junio - Julio 2025
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
