import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowIcon, InfoIcon } from "@/components/icons";

const historyData = [
  {
    date: "2023-06-01",
    currency: "BTC/USD",
    type: "Compra",
    amount: "0.5",
    price: "30 000",
    result: "10 324",
  },
  {
    date: "2023-06-02",
    currency: "ETH/USD",
    type: "Venta",
    amount: "2",
    price: "1 800",
    result: "5 432",
  },
  {
    date: "2023-06-03",
    currency: "BTC/USD",
    type: "Venta",
    amount: "0.3",
    price: "31 000",
    result: "2 034",
  },
  {
    date: "2023-06-04",
    currency: "XRP/USD",
    type: "Compra",
    amount: "1 000",
    price: "0.5",
    result: "2 543",
  },
  {
    date: "2023-06-05",
    currency: "ETH/USD",
    type: "Compra",
    amount: "1.5",
    price: "1 900",
    result: "432",
  },
];

export default function OrderHistory() {
  return (
    <div className="border border-dark-gray/25 dark:border-light-gray p-5 rounded-xl mt-6 relative">
      <div className="w-fit mb-4">
        <h2 className="text-md font-bold">Historial de Órdenes</h2>
        <p className="text-sm text-difuminate-text-light dark:text-difuminate-text-dark">
          Lleva un registro de todas tus órdenes realizadas
        </p>
      </div>

      <Select>
        <SelectTrigger className="w-[180px] mb-10 md:mb-4 md:absolute top-5 right-10">
          <SelectValue placeholder="Intervalo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1m">1 Mes</SelectItem>
          <SelectItem value="3m">3 Meses</SelectItem>
          <SelectItem value="6y">6 Meses</SelectItem>
          <SelectItem value="1y">1 Año</SelectItem>
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          <TableRow className="border-dark-gray/25 dark:border-light-gray">
            <TableHead>Fecha</TableHead>
            <TableHead>Moneda</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Resultado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyData.map((operation, index) => (
            <TableRow
              key={index}
              className="border-dark-gray/25 dark:border-light-gray cursor-pointer"
            >
              <TableCell>{operation.date}</TableCell>
              <TableCell>{operation.currency}</TableCell>
              <TableCell
                className={`${operation.type === "Compra" ? "text-green-500" : "text-red-500"}`}
              >
                {operation.type}
              </TableCell>
              <TableCell>{operation.amount}</TableCell>
              <TableCell>$ {operation.price}</TableCell>
              <TableCell
                className={`flex items-center gap-2 ${operation.price > operation.result ? "text-green-500" : "text-red-500"}`}
              >
                <ArrowIcon
                  className={`${operation.price > operation.result ? "" : "rotate-180"}`}
                />
                $ {operation.result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="border-dark-gray/25 dark:border-light-gray mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            >
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:bg-light-gray/5 hover:dark:bg-white/10"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
