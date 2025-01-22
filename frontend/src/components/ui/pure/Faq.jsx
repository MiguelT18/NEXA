"use client";

import React, { useState } from "react";
import { TriangleArrowIcon } from "@/components/icons/index";

const faqItems = [
  {
    question: "¿Qué mercados soporta Nexa AI?",
    answer:
      "Nexa AI solo soporta mercados de activos sintéticos, ya que su movimiento algoritmico facilita la predicción y la ejecución de operaciones. Esto permite aprovechar oportunidades de trading con alta liquidez y ejecutar estrategias personalizadas de manera más eficiente.",
  },
  {
    question:
      "¿Qué ventajas tienen los activos sintéticos sobre los mercados tradicionales?",
    answer:
      "Una de las principales ventajas de los activos sintéticos es que sus movimientos de precios son controlados por algoritmos, lo que los hace más predecibles y estables que los mercados tradicionales. Además, al no depender de la oferta y demanda real, no están sujetos a la volatilidad causada por factores externos como eventos geopolíticos o económicos.",
  },
  {
    question: "¿Puedo personalizar mis estrategias de Trading?",
    answer:
      "Por supuesto. Nexa AI permite configurar estrategias personalizadas y automatizarlas para que operen de manera eficiente según tus objetivos y necesidades.",
  },
  {
    question:
      "¿El hecho de que muchos traders intenten predecir el mercado afectará la efectividad de la IA?",
    answer:
      "No, la predicción del mercado mediante IA no se ve afectada por la cantidad de traders intentando predecirlo. Los activos sintéticos son controlados por algoritmos y no por la oferta y demanda de los traders, lo que hace que el comportamiento del activo sea más estable y predecible, incluso cuando muchos traders participan en el mercado.",
  },
  {
    question:
      "¿Cómo pueden los traders aprovechar los activos sintéticos en su estrategia de Trading?",
    answer:
      "Los traders pueden aprovechar los activos sintéticos utilizando herramientas como la inteligencia artificial para predecir los movimientos del mercado y ajustar sus estrategias de trading. Estos activos proporcionan un entorno de trading controlado y estable, ideal para probar y optimizar algoritmos y estrategias automatizadas.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((faq, index) => (
        <article
          onClick={() => handleToggle(index)}
          key={index}
          className="rounded-md border border-difuminate-text-dark dark:border-light-gray p-4 cursor-pointer"
        >
          <div className="flex justify-between items-center gap-6">
            <h3 className="text-sm font-bold">{faq.question}</h3>
            <TriangleArrowIcon
              className={`max-md:size-4 size-6 min-w-[24px] transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          <p
            className={`text-sm dark:text-difuminate-text-dark text-difuminate-text-light transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            {faq.answer}
          </p>
        </article>
      ))}
    </div>
  );
}
