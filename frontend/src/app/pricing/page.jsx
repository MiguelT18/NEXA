import React from "react";
import { CheckIcon } from "@/components/icons/index";

const plans = [
  {
    name: "Básico",
    price: "29.99",
    features: [
      "Acceso limitado a mercados sintéticos básicos.",
      "Análisis diario de tendencias del mercado.",
      "Alertas de señales de trading por correo electrónico.",
      "Soporte técnico estándar.",
    ],
  },
  {
    name: "Pro",
    price: "99.99",
    features: [
      "Acceso completo a todos los mercados sintéticos.",
      "Análisis en tiempo real con actualizaciones cada 5 minutos.",
      "Estrategias de trading preconfiguradas y optimizadas.",
      "Alertas personalizadas de señales de trading.",
      "Soporte técnico prioritario 24/7.",
    ],
  },
  {
    name: "Premium",
    price: "199.99",
    features: [
      "Acceso completo con priorización de estrategias en mercados sintéticos.",
      "Análisis en tiempo real con actualizaciones en tiempo real.",
      "Estrategias avanzadas y personalizadas de trading automatizado.",
      "Informes detallados de rendimiento mensual.",
      "Soporte técnico prioritario con gestor asignado.",
      "Sesiones exclusivas de consultoría para optimización de estrategias.",
    ],
  },
];

const gradients = [
  "bg-gradient-to-r from-green-400 to-blue-500", // Básico
  "bg-gradient-to-r from-blue-500 to-purple-600", // Pro
  "bg-gradient-to-r from-purple-600 to-red-500", // Premium
];

export default function PricingPage() {
  return (
    <main className="container min-h-[80dvh] mx-auto px-4 flex items-center py-12">
      <section className="h-full w-full grid gap-10 grid-cols-[repeat(auto-fit,_minmax(290px,1fr))] max-md:pb-24">
        {plans.map((plan, index) => {
          return (
            <article
              key={index}
              className="border dark:border-light-gray border-dark-gray rounded-lg flex flex-col"
            >
              <div
                className={`h-3 w-full rounded-t-[inherit] ${
                  index === 0
                    ? "bg-gradient-basic"
                    : index === 1
                      ? "bg-gradient-pro"
                      : "bg-gradient-premium"
                }`}
              />

              <div className="p-5 flex flex-col h-full gap-5">
                <div className="flex-grow">
                  <h2 className="text-md font-sans font-bold">{plan.name}</h2>
                  <h1 className="text-lg font-black font-sans">
                    ${plan.price}/mes
                  </h1>
                  <ul className="space-y-4 pt-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-4">
                        <div className="text-green-500 size-5">
                          <CheckIcon />
                        </div>
                        <span className="inline-block text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-auto bg-black text-white dark:bg-white dark:text-black w-full rounded-md py-2">
                  Seleccionar plan
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
