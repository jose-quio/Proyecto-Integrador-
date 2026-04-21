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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";

const reservasMock = [
  {
    id: 1,
    usuario: "Juan Pérez",
    tour: "Aventura en Machu Picchu",
    fecha: "2025-04-10",
    cantidad: 2,
    estado: "confirmada",
    total: 700,
    metodoPago: "Tarjeta",
  },
  {
    id: 2,
    usuario: "María Gómez",
    tour: "Islas Galápagos Express",
    fecha: "2025-05-15",
    cantidad: 1,
    estado: "pendiente",
    total: 1200,
    metodoPago: "Transferencia",
  },
  {
    id: 3,
    usuario: "Carlos Ruiz",
    tour: "City Tour Lima",
    fecha: "2025-03-22",
    cantidad: 4,
    estado: "cancelada",
    total: 180,
    metodoPago: "Efectivo",
  },
];

export default function ReservasPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReservas = reservasMock.filter(
    (r) =>
      r.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tour.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Reservas</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar reserva..."
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
              <TableHead>ID</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Tour</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell>#{reserva.id}</TableCell>
                <TableCell>{reserva.usuario}</TableCell>
                <TableCell>{reserva.tour}</TableCell>
                <TableCell>{reserva.fecha}</TableCell>
                <TableCell>{reserva.cantidad}</TableCell>
                <TableCell>${reserva.total}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      reserva.estado === "confirmada"
                        ? "default"
                        : reserva.estado === "pendiente"
                        ? "outline"
                        : "destructive"
                    }
                    className={
                      reserva.estado === "confirmada"
                        ? "bg-green-100 text-green-800"
                        : reserva.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {reserva.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                      <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
                      <DropdownMenuItem>Enviar recordatorio</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}