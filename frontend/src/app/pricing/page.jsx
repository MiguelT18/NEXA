import Navbar from "@/components/ui/Navbar";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";
import Link from 'next/link';
import React from "react";

const planes = [
  {
    nombre: "Básico",
    precio: "29.99",
    caracteristicas: [
      "Acceso a mercados sintéticos básicos",
      "Análisis de mercado diario",
      "Soporte por correo electrónico",
    ],
  },
  {
    nombre: "Pro",
    precio: "99.99",
    caracteristicas: [
      "Acceso a todos los mercados sintéticos",
      "Análisis de mercado en tiempo real",
      "Estrategias de trading automatizadas",
      "Soporte prioritario 24/7",
    ],
  },
  {
    nombre: "Empresarial",
    precio: "Personalizado",
    caracteristicas: [
      "Soluciones personalizadas",
      "API dedicada",
      "Gestor de cuenta personal",
      "Formación y soporte in situ",
    ],
  },
];

export default function PricingPage() {
  return (
    <ProtectedRoute>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto py-10">
          <h1 className="text-center font-bold text-3xl mb-10">Planes de Precios</h1>
          <div className="flex flex-wrap -mx-4">
            {planes.map((plan, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 mb-6">
                <div className="bg-white rounded-lg shadow-lg flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-center font-bold text-2xl mb-3">{plan.nombre}</h2>
                    <p className="text-center text-xl font-semibold my-3">
                      {plan.precio === "Personalizado"
                        ? "Personalizado"
                        : `$${plan.precio}/mes`}
                    </p>
                    <ul className="flex-grow mb-4">
                      {plan.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="mb-2 flex items-center">
                          <i className="bi bi-check-circle-fill text-green-500"></i>
                          <span className="ml-2">{caracteristica}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" passHref>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-auto">
                        Seleccionar Plan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
