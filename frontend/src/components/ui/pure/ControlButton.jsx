import { MinusIcon, PlusIcon } from "@/components/icons";
import React from "react";
import { useForm } from "react-hook-form";

export default function ControlButton({ isFloatValue = false }) {
  const { register, setValue, watch } = useForm({
    defaultValues: { counter: isFloatValue ? "0.0" : "0" },
  });

  const counter = watch("counter");

  const handleDecrement = () => {
    if (counter < 1) return;
    const newValue = isFloatValue
      ? (parseFloat(counter || 0) - 0.5).toFixed(1)
      : Math.max(0, parseInt(counter || 0) - 1).toString();
    setValue("counter", newValue);
  };

  const handleIncrement = () => {
    const newValue = isFloatValue
      ? (parseFloat(counter || 0) + 0.5).toFixed(1)
      : Math.min(2000, parseInt(counter || 0) + 1).toString();
    setValue("counter", newValue);
  };

  return (
    <form className="w-fit flex border border-dark-gray/25 dark:border-light-gray rounded-lg [&>button]:w-fit [&>button]:px-4">
      <button
        onClick={handleDecrement}
        type="button"
        className="transition-all hover:dark:bg-light-gray hover:bg-light-gray/15 rounded-l-[inherit] border-r border-dark-gray/25 dark:border-light-gray"
      >
        <MinusIcon className="size-5 m-auto" />
      </button>

      <input
        type="text"
        className="bg-transparent p-2 text-center w-full focus:outline-none"
        {...register("counter")}
      />

      <button
        onClick={handleIncrement}
        type="button"
        className="transition-all hover:dark:bg-light-gray hover:bg-light-gray/15 rounded-r-[inherit] border-l border-dark-gray/25 dark:border-light-gray"
      >
        <PlusIcon className="size-5 m-auto" />
      </button>
    </form>
  );
}
