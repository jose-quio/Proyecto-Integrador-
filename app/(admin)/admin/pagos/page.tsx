"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const pagosMock = [
  {
    id: 1,
    reservaId: 101,
    monto: 700,
    metodo: "Tarjeta de crédito",
    estado: "completado",
    fecha: "2025-03-15",
    usuario: "Juan Pérez",
  },
  {
    id: 2,
    reservaId: 102,
    monto: 1200,
    metodo: "Transferencia bancaria",
    estado: "pendiente",
    fecha: "2025-03-16",
    usuario: "María Gómez",
  },
  {
    id: 3,
    reservaId: 103,
    monto: 180,
    metodo: "Efectivo",
    estado: "reembolsado",
    fecha: "2025-03-10",
    usuario: "Carlos Ruiz",
  },
];

export default function PagosPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPagos = pagosMock.filter(
    (p) =>
      p.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reservaId.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestión de Pagos</h2>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar por usuario o reserva..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Pago</TableHead>
              <TableHead>Reserva #</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPagos.map((pago) => (
              <TableRow key={pago.id}>
                <TableCell>{pago.id}</TableCell>
                <TableCell>#{pago.reservaId}</TableCell>
                <TableCell>{pago.usuario}</TableCell>
                <TableCell>${pago.monto}</TableCell>
                <TableCell>{pago.metodo}</TableCell>
                <TableCell>{pago.fecha}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      pago.estado === "completado"
                        ? "default"
                        : pago.estado === "pendiente"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      pago.estado === "completado"
                        ? "bg-green-100 text-green-800"
                        : pago.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {pago.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}