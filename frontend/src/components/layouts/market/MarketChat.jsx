import { SendIcon } from "lucide-react";
import React from "react";

export default function MarketChat() {
  return (
    <div className="size-full flex flex-col justify-between items-center max-h-[380px]">
      {/* Contenedor de mensajes */}
      <div className="overflow-y-auto w-full">
        {/* Mensaje 1 (izquierda) */}
        <section className="w-full md:max-w-[80%] mx-auto space-y-5 p-5">
          <div className="w-full flex justify-start">
            <p className="max-w-[80%] text-start dark:bg-light-gray bg-dark-gray/15 p-2 text-pretty rounded-e-xl rounded-tl-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur, praesentium neque totam placeat accusamus aspernatur
              harum dolorem architecto ad voluptates quaerat, nobis nostrum
              explicabo, maxime consectetur nihil? Voluptatum, eaque a!
            </p>
          </div>

          {/* Mensaje 2 (derecha) */}
          <div className="w-full flex justify-end">
            <p className="max-w-[80%] text-end p-2 border border-dark-gray/25 dark:border-light-gray text-pretty rounded-l-xl rounded-se-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur, praesentium neque totam placeat accusamus aspernatur
              harum dolorem architecto ad voluptates quaerat, nobis nostrum
              explicabo, maxime consectetur nihil? Voluptatum, eaque a!
            </p>
          </div>

          {/* Mensaje 3 (izquierda) */}
          <div className="w-full flex justify-start">
            <p className="max-w-[80%] text-start dark:bg-light-gray bg-dark-gray/15 p-2 text-pretty rounded-e-xl rounded-tl-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              laboriosam est provident impedit doloremque quod sit praesentium
              aliquid temporibus sequi et quisquam repellendus, tempora, facilis
              eaque, eos corporis quia quasi. Quas ipsum, ratione hic doloremque
              deleniti corporis quisquam incidunt? Enim veniam impedit
              voluptatem temporibus vero modi sequi delectus, ex eius earum
              maiores. Veritatis quod explicabo tempora ipsa et corrupti
              facilis? Deleniti sapiente, labore asperiores amet quia molestiae
              consequatur recusandae minus quod accusamus illo natus voluptate
              placeat? Quidem quo molestias porro. Tenetur, mollitia blanditiis!
              Autem ipsam voluptatum, similique minima voluptatibus expedita! Id
              nemo magni sed, quae rerum ex non, autem nostrum suscipit
              laudantium fugit sunt ullam facilis quisquam voluptatum ducimus
              soluta vel pariatur iusto mollitia architecto minima ratione a.
              Error, iusto. Reiciendis incidunt provident aliquam error
              recusandae asperiores! Tenetur impedit corporis earum commodi
              cupiditate. Corporis non consectetur obcaecati. Odit, repudiandae.
              Minima cum quia, sequi nisi ducimus ipsum quo adipisci pariatur
              quos?
            </p>
          </div>
        </section>
      </div>

      {/* Formulario fijo */}
      <form className="w-full md:max-w-[80%] flex items-center justify-between gap-2 p-5">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          className="w-full p-2 bg-transparent rounded-md border border-dark-gray/25 dark:border-light-gray"
        />
        <button
          type="button"
          className="p-3 rounded-md border border-dark-gray/25 dark:border-light-gray transition-all hover:dark:bg-dark-gray hover:bg-light-gray/15"
        >
          <SendIcon className="size-4" />
        </button>
      </form>
    </div>
  );
}
