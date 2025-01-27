import { MinusIcon, PlusIcon } from "@/components/icons";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default function ControlButton({ isCurrency = true }) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: { counter: 0 },
  });

  // Obtenemos el valor actual de "counter" usando watch
  const counter = watch("counter");

  // Función de envío del formulario
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-light-gray/15 dark:bg-light-gray w-full flex items-center rounded-md mt-2"
    >
      <button
        type="button"
        onClick={() =>
          setValue("counter", Math.max(1, parseFloat(counter) - 1))
        }
        className="w-fit border-r border-dark-gray/25 dark:border-dark-gray py-2 px-4 hover:dark:bg-dark-background/50 hover:bg-dark-background/15 rounded-l-[inherit]"
      >
        <MinusIcon className="size-5 m-auto" />
      </button>

      <div className="px-5 flex items-center">
        <Controller
          name="counter"
          control={control}
          render={({ field }) => (
            <input
              type="text" // Cambiado a text para manejar decimales
              {...field}
              className="bg-transparent border-none text-center w-full focus:outline-none"
              onInput={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {isCurrency && <span className="text-sm ml-2">USD</span>}
      </div>

      <button
        type="button"
        onClick={() => setValue("counter", parseFloat(counter) + 1)}
        className="w-fit border-l-2 border-dark-gray/25 dark:border-dark-gray py-2 px-4 hover:dark:bg-dark-background/50 hover:bg-dark-background/15 rounded-r-[inherit]"
      >
        <PlusIcon className="size-5 m-auto" />
      </button>
    </form>
  );
}
