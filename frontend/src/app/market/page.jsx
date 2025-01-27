"use client";

import Market from "@/components/layouts/market/Market";
import MarketMenu from "@/components/layouts/market/MarketMenu";
import React, { useEffect, useRef, useState } from "react";

export default function MarketPage() {
  const [menuHeight, setMenuHeight] = useState(0);

  console.log(menuHeight);

  const marketMenuRef = useRef(null);

  useEffect(() => {
    if (marketMenuRef.current) {
      setMenuHeight(marketMenuRef.current.offsetHeight);
    }

    const handleResize = () =>
      setMenuHeight(marketMenuRef.current.offsetHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="min-h-[80dvh] flex flex-col">
      <nav className="w-full overflow-hidden border border-dark-gray/25 dark:border-light-gray rounded-md p-4">
        <ul className="flex gap-4 items-center">
          <li>BOOM500</li>
          <li>BOOM1000</li>
          <li>CRASH500</li>
          <li>CRASH1000</li>
        </ul>
      </nav>

      <section className="h-full flex flex-1 md:gap-4 py-5">
        <div className="w-full flex flex-col gap-5">
          <article className="w-full p-2 rounded-lg border border-dark-gray/25 dark:border-light-gray">
            <Market />
          </article>

          <article
            className={`w-full max-h-[calc(100dvh-${menuHeight}px)] flex-1 border border-dark-gray/25 dark:border-light-gray rounded-md p-2 overflow-y-auto`}
          >
            <div className="md:w-[80%] max-w-[1080px] mx-auto">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                fugiat vero facilis vel debitis accusantium eos ipsa voluptatum!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
                placeat earum autem sapiente, molestias explicabo eaque harum
                ratione nobis, magni saepe natus velit architecto, excepturi
                veritatis quae nostrum accusantium. Quo! Pariatur voluptas
                adipisci dignissimos magni excepturi eligendi praesentium
                impedit iure tempore nemo, nam, nostrum quaerat minima at
                exercitationem voluptatum facilis sint autem aut debitis nisi
                alias amet quibusdam sequi? Esse? Optio facilis odio cupiditate
                reiciendis praesentium in alias dignissimos earum numquam
                reprehenderit? Esse, laboriosam dolorem quia dolor sapiente
                ipsum veritatis rerum repellendus consequatur, corporis
                asperiores cum similique culpa expedita libero! Odit perferendis
                esse alias eaque et porro laboriosam tempora dignissimos vel
                ipsa magnam dolores autem commodi suscipit temporibus molestiae
                ad labore fugit animi doloribus libero, dolorum dolor soluta
                aperiam! Laboriosam. Voluptate id impedit neque esse quaerat
                architecto quos possimus nemo eveniet velit qui beatae
                reprehenderit ipsa tempore, et magnam, consectetur est quibusdam
              </p>
            </div>
          </article>
        </div>

        <aside ref={marketMenuRef} className="size-fit max-w-[400px]">
          <MarketMenu />
        </aside>
      </section>
    </main>
  );
}
