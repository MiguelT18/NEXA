import { SendIcon } from "lucide-react";
import React from "react";

export default function MarketChat() {
  return (
    <div className="w-[80%] max-w-[1080px] mx-auto flex flex-col">
      {/* Contenedor de mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 max-h-[290px]">
        {/* Mensaje 1 (izquierda) */}
        <div className="w-full flex justify-start">
          <p className="max-w-[80%] text-start dark:bg-light-gray bg-dark-gray/15 p-2 rounded-lg text-pretty">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur, praesentium neque totam placeat accusamus aspernatur
            harum dolorem architecto ad voluptates quaerat, nobis nostrum
            explicabo, maxime consectetur nihil? Voluptatum, eaque a!
          </p>
        </div>

        {/* Mensaje 2 (derecha) */}
        <div className="w-full flex justify-end">
          <p className="max-w-[80%] text-end p-2 rounded-lg border border-dark-gray/25 dark:border-light-gray text-pretty">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur, praesentium neque totam placeat accusamus aspernatur
            harum dolorem architecto ad voluptates quaerat, nobis nostrum
            explicabo, maxime consectetur nihil? Voluptatum, eaque a!
          </p>
        </div>

        {/* Mensaje 3 (izquierda) */}
        <div className="w-full flex justify-start">
          <p className="max-w-[80%] text-start dark:bg-light-gray bg-dark-gray/15 p-2 rounded-lg text-pretty">
            Otro mensaje de ejemplo para mostrar la alternancia entre
            posiciones.
          </p>
        </div>
      </div>

      {/* Formulario fijo */}
      <form className="w-full flex items-center justify-between gap-2 py-4">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          className="w-full p-2 bg-transparent rounded-md border border-dark-gray/25 dark:border-light-gray"
        />
        <button className="p-3 rounded-md border border-dark-gray/25 dark:border-light-gray transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15">
          <SendIcon className="size-4" />
        </button>
      </form>
    </div>
  );
}
