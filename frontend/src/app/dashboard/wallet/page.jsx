"use client";

import { useRef, useState, useEffect } from "react";
import { GlobalIcons } from "@/components/icons";
import { useNotification } from "@/hooks/useNotification";
import { motion, AnimatePresence } from "framer-motion";

const transactions = [
  {
    id: 1,
    type: "Depósito",
    description: "Depósito vía transferencia bancaria",
    date: "10 feb 2024, 10:00",
    amount: "+$1500.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 2,
    type: "Retiro",
    description: "Retiro a cuenta bancaria",
    date: "9 feb 2024, 15:30",
    amount: "-$500.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 3,
    type: "Transferencia",
    description: "Transferencia a @usuario123",
    date: "9 feb 2024, 12:00",
    amount: "$250.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 4,
    type: "Depósito",
    description: "Depósito vía tarjeta de crédito",
    date: "8 feb 2024, 09:15",
    amount: "+$2000.00",
    currency: "USD",
    status: "Pendiente",
  },
  {
    id: 5,
    type: "Retiro",
    description: "Retiro a cuenta bancaria",
    date: "7 feb 2024, 10:15",
    amount: "-$2000.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 6,
    type: "Depósito",
    description: "Depósito via tarjeta de crédito",
    date: "6 feb 2024, 10:15",
    amount: "+$500.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 7,
    type: "Depósito",
    description: "Depósito via tarjeta de crédito",
    date: "6 feb 2024, 10:15",
    amount: "+$500.00",
    currency: "USD",
    status: "Completado",
  },
  {
    id: 8,
    type: "Retiro",
    description: "Retiro a cuenta bancaria",
    date: "6 feb 2024, 10:15",
    amount: "-$1000.00",
    currency: "USD",
    status: "Completado",
  },
];

export default function Wallet() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Todas");

  const menuRef = useRef(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(
    transactions.filter((t) =>
      selectedFilter === "Todas" ? true : t.type === selectedFilter
    ).length / itemsPerPage
  );

  const { showNotification } = useNotification();

  const handleHideBalance = () => {
    setIsBalanceHidden((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrar transacciones según el tipo seleccionado
  const filteredTransactions = transactions.filter((transaction) =>
    selectedFilter === "Todas" ? true : transaction.type === selectedFilter
  );

  // Obtener las transacciones de la página actual
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-8 gap-5 size-full [&>article]:bg-[#0c111000] [&>article]:border [&>article]:border-alt-dark-primary-border [&>article]:p-4 [&>article]:rounded-lg [&>article]:size-full [&>article]:md:overflow-y-auto [&>article]:dark:bg-alt-dark-primary-color/5 [&>article]:dark:text-white">
      <article className="dark:bg-alt-dark-primary-color/20 p-5 rounded-lg border border-alt-dark-primary-border size-full relative md:row-span-3">
        {/* Encabezado */}
        <header className="flex justify-between items-center">
          <h2 className="text-md font-medium text-black dark:text-white">
            Balance Total
          </h2>
          <button
            onClick={handleHideBalance}
            type="button"
            className="block size-fit rounded-md p-2 text-alt-dark-blue dark:bg-alt-dark-primary-color/20 hover:dark:bg-alt-dark-blue/40 transition-all cursor-pointer outline-none"
          >
            {isBalanceHidden ? (
              <GlobalIcons.CloseEyeIcon className="size-5" />
            ) : (
              <GlobalIcons.OpenEyeIcon className="size-5" />
            )}
          </button>
        </header>

        {/* Balance Principal */}
        <div className="mt-2">
          <p className="text-lg font-bold font-sans text-white">
            {isBalanceHidden ? "•••••••" : "$45,231.89 USD"}
          </p>
          <span className="text-positive-light-green dark:text-positive-dark-green text-sm">
            <span className="font-sans font-bold">+20.1%</span> desde el último
            mes
          </span>
        </div>

        {/* Balance en Trading y Disponible */}
        <div className="mt-2 flex justify-between text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          <div>
            <p>En Trading</p>
            <span className="text-white font-semibold font-sans text-md">
              {isBalanceHidden ? "••••" : "$12,450.00"}
            </span>
          </div>
          <div>
            <p>Disponible</p>
            <span className="text-white font-semibold font-sans text-md">
              {isBalanceHidden ? "••••" : "$32,781.89"}
            </span>
          </div>
        </div>
      </article>

      <article className="dark:bg-alt-dark-primary-color/20 p-5 rounded-lg border border-alt-dark-primary-border w-full md:col-start-2 md:row-span-3">
        {/* 📌 Encabezado */}
        <header>
          <h3 className="text-md font-medium dark:text-white text-black">
            Estadísticas
          </h3>

          <div className="flex items-center gap-3 mt-3">
            {/* 📈 Icono de tendencia */}
            <span className="block p-2 bg-green-500/10 rounded-md">
              <GlobalIcons.TrendingArrowIcon className="size-8 text-green-500" />
            </span>

            {/* 🟢 Rentabilidad */}
            <div>
              <h4 className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Rentabilidad Total
              </h4>
              <span className="text-md font-sans font-bold text-positive-light-green dark:text-positive-dark-green">
                +31.5%
              </span>
            </div>
          </div>
        </header>

        {/* 📌 Cuerpo - Mayor Depósito / Mayor Retiro */}
        <footer className="grid grid-cols-2 gap-4 mt-6">
          {/* 🔼 Mayor Depósito */}
          <div className="flex items-center gap-3">
            <span className="block p-2 bg-green-500/10 rounded-md">
              <GlobalIcons.ArrowIcon className="size-5 text-green-500" />
            </span>

            <div>
              <span className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Mayor Depósito
              </span>
              <span className="block text-sm font-sans font-bold text-white">
                $5,000.00
              </span>
            </div>
          </div>

          {/* 🔽 Mayor Retiro */}
          <div className="flex items-center gap-3">
            <span className="block p-2 bg-red-500/10 rounded-md">
              <GlobalIcons.ArrowIcon className="size-5 text-red-500 -rotate-180" />
            </span>

            <div>
              <span className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Mayor Retiro
              </span>
              <span className="block text-sm font-sans font-bold text-white">
                $2,450.00
              </span>
            </div>
          </div>

          {/* 📈 Mayor Ganancia */}
          <div className="flex items-center gap-3">
            <span className="block p-2 bg-green-500/10 rounded-md">
              <GlobalIcons.TrendingArrowIcon className="size-5 text-green-500" />
            </span>

            <div>
              <span className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Mayor Ganancia
              </span>
              <span className="block text-sm font-sans font-bold text-white">
                $3,200.00
              </span>
            </div>
          </div>

          {/* 📉 Mayor Pérdida */}
          <div className="flex items-center gap-3">
            <span className="block p-2 bg-red-500/10 rounded-md">
              <GlobalIcons.TrendingArrowIcon className="size-5 text-red-500 scale-x-[-1] rotate-180" />
            </span>

            <div>
              <span className="block text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
                Mayor Pérdida
              </span>
              <span className="block text-sm font-sans font-bold text-white">
                $1,750.00
              </span>
            </div>
          </div>
        </footer>
      </article>

      <article className="md:row-start-6 md:col-span-2 md:row-span-3 lg:row-start-4 lg:col-span-4 lg:row-span-5 p-4 rounded-lg border border-alt-dark-primary-border dark:bg-alt-dark-primary-color/10">
        {/* Encabezado */}
        <header className="flex justify-between items-center pb-4 relative">
          <h2 className="text-lg font-bold text-white">
            Historial de Transacciones
          </h2>

          {/* Botón del menú */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-md transition-all hover:bg-alt-dark-blue/30 active:scale-95"
          >
            <GlobalIcons.FilterIcon className="size-6" />
          </button>

          {/* Menú desplegable con animación */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ scale: 0, opacity: 0, transformOrigin: "top right" }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute right-0 top-12 w-40 bg-alt-dark-primary-color/10 backdrop-blur-md border border-alt-dark-primary-border rounded-lg shadow-lg z-50"
              >
                {["Todas", "Depósito", "Retiro", "Transferencia"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedFilter(filter);
                        setCurrentPage(1); // Reiniciar a la primera página al cambiar el filtro
                        setIsMenuOpen(false); // Cerrar el menú después de seleccionar
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm text-white hover:bg-alt-dark-blue/30 rounded-md ${
                        selectedFilter === filter ? "bg-alt-dark-blue/50" : ""
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-sm text-difuminate-text-dark">
                  Tipo
                </th>
                <th className="py-2 px-4 text-sm text-difuminate-text-dark">
                  Descripción
                </th>
                <th className="py-2 px-4 text-sm text-difuminate-text-dark">
                  Fecha
                </th>
                <th className="py-2 px-4 text-sm text-difuminate-text-dark">
                  Monto
                </th>
                <th className="py-2 px-4 text-sm text-difuminate-text-dark">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:dark:bg-alt-dark-primary-color/10 transition-all cursor-pointer"
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      {/* Icono según tipo de transacción */}
                      <span
                        className={`p-2 rounded-md ${
                          transaction.type === "Depósito"
                            ? "bg-green-500/10"
                            : transaction.type === "Retiro"
                              ? "bg-red-500/10"
                              : "bg-blue-500/10"
                        }`}
                      >
                        {transaction.type === "Depósito" ? (
                          <GlobalIcons.ArrowIcon className="size-5 text-green-500" />
                        ) : transaction.type === "Retiro" ? (
                          <GlobalIcons.ArrowIcon className="size-5 text-red-500 rotate-180" />
                        ) : (
                          <GlobalIcons.ArrowIcon className="size-5 text-blue-500" />
                        )}
                      </span>
                      <span className="text-white text-sm">
                        {transaction.type}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-sm text-gray-400">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-400">
                      {transaction.date}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm font-bold ${
                        transaction.amount.startsWith("-")
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.amount} {transaction.currency}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-md ${
                          transaction.status === "Completado"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No hay transacciones disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 rounded-md bg-alt-dark-blue/20 transition-all hover:bg-alt-dark-blue/30 active:scale-95 disabled:opacity-50"
          >
            <GlobalIcons.ArrowIcon className="size-4 -rotate-90" />
          </button>

          <div className="space-x-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === i + 1
                    ? "bg-alt-dark-blue text-white"
                    : "text-alt-dark-blue"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="p-2 rounded-md bg-alt-dark-blue/20 transition-all hover:bg-alt-dark-blue/30 active:scale-95 disabled:opacity-50"
          >
            <GlobalIcons.ArrowIcon className="size-4 rotate-90" />
          </button>
        </div>
      </article>

      <article className="max-md:row-start-1 md:row-span-2 md:row-start-4 md:col-start-1 md:col-span-2 lg:col-start-3 lg:row-start-1 lg:row-span-3">
        <div className="size-full grid md:grid-cols-2 lg:grid-cols-1 gap-2 [&>button]:bg-alt-dark-primary-color/20 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:rounded-md [&>button]:gap-4 [&>button]:size-full [&>button]:text-sm [&>button]:font-sans [&>button]:tracking-wide [&>button]:outline-none [&>button]:max-md:p-2">
          <button
            onClick={() =>
              showNotification("Botón aún no implementado.", "error")
            }
            className="transition-all hover:bg-alt-dark-primary-color/10 active:scale-95"
          >
            <GlobalIcons.DepositIcon className="size-6" />
            Depositar
          </button>
          <button
            onClick={() =>
              showNotification("Botón aún no implementado.", "error")
            }
            className="transition-all hover:bg-alt-dark-primary-color/10 active:scale-95"
          >
            <GlobalIcons.HandCoinIcon className="size-6" />
            Retirar
          </button>
          <button
            onClick={() =>
              showNotification("Botón aún no implementado.", "error")
            }
            className="transition-all hover:bg-alt-dark-primary-color/10 active:scale-95"
          >
            <GlobalIcons.TransferIcon className="size-6" />
            Transferir
          </button>
          <button
            onClick={() =>
              showNotification("Botón aún no implementado.", "error")
            }
            className="transition-all hover:bg-alt-dark-primary-color/10 active:scale-95"
          >
            <GlobalIcons.MoreIcon className="size-6" />
            Más...
          </button>
        </div>
      </article>
    </section>
  );
}
