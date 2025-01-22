import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const dashboardShortcuts = [
  {
    action: "Alternar abrir/cerrar menú lateral",
    key: "E",
  },
];

export default function Shortcuts() {
  return (
    <>
      <h1 className="text-lg font-sans font-bold">Atajos de teclado</h1>
      <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
        Estos atajos de teclado te ayudarán a navegar rápidamente por la
        interfaz de Nexa AI.
      </p>

      <article className="border border-dark-gray/25 dark:border-light-gray w-full p-4 rounded-lg mt-5">
        <h2 className="text-md font-bold mb-5">Dashboard</h2>

        <Table>
          <TableHeader>
            <TableRow className="border-dark-gray/25 dark:border-light-gray">
              <TableHead>Acción</TableHead>
              <TableHead>Teclas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboardShortcuts.map((shortcut, index) => (
              <TableRow
                key={index}
                className="border-dark-gray/25 dark:border-light-gray"
              >
                <TableCell>{shortcut.action}</TableCell>
                <TableCell>
                  <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-light-gray/20 border border-light-gray rounded-lg dark:bg-light-gray dark:text-gray-100 dark:border-white/30">
                    {shortcut.key}
                  </kbd>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
    </>
  );
}
