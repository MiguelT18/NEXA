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
      <div className="bg-light min-vh-100">
        <Navbar />
        <main className="container py-5">
          <h1 className="text-center fw-bold mb-5">Planes de Precios</h1>
          <div className="row g-4">
            {planes.map((plan, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow">
                  <div className="card-body d-flex flex-column">
                    <h2 className="card-title text-center fw-bold">{plan.nombre}</h2>
                    <p className="card-text text-center fs-4 fw-bold my-3">
                      {plan.precio === "Personalizado"
                        ? "Personalizado"
                        : `$${plan.precio}/mes`}
                    </p>
                    <ul className="list-unstyled mb-4">
                      {plan.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="mb-2">
                          <i className="bi bi-check-circle-fill text-success"></i>{" "}
                          {caracteristica}
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" passHref>
                      <button className="btn btn-primary w-100 mt-auto">
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
