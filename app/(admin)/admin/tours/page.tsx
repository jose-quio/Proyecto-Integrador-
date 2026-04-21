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
import { MoreHorizontal, Plus, Search } from "lucide-react";

const toursMock = [
  {
    id: 1,
    nombre: "Aventura en Machu Picchu",
    precio: 350,
    descripcion: "Tour de 2 días a la ciudadela inca",
    duracion: "2 días",
    cupos: 20,
    cuposDisponibles: 8,
    destino: "Cusco",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Islas Galápagos Express",
    precio: 1200,
    descripcion: "5 días navegando por las islas",
    duracion: "5 días",
    cupos: 12,
    cuposDisponibles: 3,
    destino: "Galápagos",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "City Tour Lima",
    precio: 45,
    descripcion: "Recorrido por el centro histórico",
    duracion: "4 horas",
    cupos: 30,
    cuposDisponibles: 30,
    destino: "Lima",
    estado: "inactivo",
  },
];

export default function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTours = toursMock.filter(
    (t) =>
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.destino.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Tours</h2>
        <Button className="bg-[#d4663a] hover:bg-[#b8532e]">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Tour
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar tour..."
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
              <TableHead>Nombre</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Precio (USD)</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Cupos (Disp./Total)</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium">{tour.nombre}</TableCell>
                <TableCell>{tour.destino}</TableCell>
                <TableCell>${tour.precio}</TableCell>
                <TableCell>{tour.duracion}</TableCell>
                <TableCell>
                  {tour.cuposDisponibles} / {tour.cupos}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={tour.estado === "activo" ? "default" : "secondary"}
                    className={
                      tour.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {tour.estado}
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
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem>
                        {tour.estado === "activo" ? "Desactivar" : "Activar"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Eliminar
                      </DropdownMenuItem>
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