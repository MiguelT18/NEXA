import SwitchButton from "@/components/ui/pure/SwitchButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobalIcons } from "@/components/icons";

export default function MarketMenuAuto() {
  return (
    <article className="border border-dark-gray/25 dark:border-light-gray rounded-md p-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          <GlobalIcons.RobotWinkIcon />
          Bot de Trading
        </h3>

        <SwitchButton />
      </div>

      <div className="bg-light-gray/15 dark:bg-light-gray rounded-lg mt-5 [&>button]:p-2 [&>button]:w-1/2">
        <button className="transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15 rounded-l-[inherit] gap-2">
          <span className="flex items-center justify-center gap-2">
            <GlobalIcons.AlertIcon className="size-4" />
            Alertas
          </span>
        </button>
        <button className="transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15 rounded-r-[inherit]">
          <span className="flex items-center justify-center gap-2">
            <GlobalIcons.AutoIcon className="size-4" />
            Automático
          </span>
        </button>
      </div>

      <div className="w-full flex flex-col gap-2 mt-4">
        <span className="inline-block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Estrategia
        </span>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una estrategia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservadora</SelectItem>
            <SelectItem value="moderate">Moderada</SelectItem>
            <SelectItem value="agressive">Agresiva</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h4 className="mt-5 flex items-center justify-between text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
        Mostrar señales en el gráfico
        <SwitchButton />
      </h4>

      <div className="mt-4 space-y-4">
        <label
          htmlFor="dailyLimitLoss"
          className="inline-block text-difuminate-text-light dark:text-difuminate-text-dark"
        >
          Límite de pérdida diaria
          <input
            id="dailyLimitLoss"
            type="text"
            placeholder="USD"
            className="p-2 mt-2 w-full rounded-md bg-transparent border border-dark-gray/25 dark:border-light-gray text-black dark:text-white"
          />
        </label>

        <label
          htmlFor="dailyTarget"
          className="inline-block text-difuminate-text-light dark:text-difuminate-text-dark"
        >
          Objetivo diario
          <input
            id="dailyTarget"
            type="text"
            placeholder="USD"
            className="p-2 mt-2 w-full rounded-md bg-transparent border border-dark-gray/25 dark:border-light-gray text-black dark:text-white"
          />
        </label>
      </div>

      <div className="w-full flex flex-col gap-2 mt-4">
        <span className="inline-block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Confirmación de operaciones
        </span>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el modo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Operar sin confirmar</SelectItem>
            <SelectItem value="all">Confirmar todas</SelectItem>
            <SelectItem value="risk">Solo operaciones de riesgo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </article>
  );
}
