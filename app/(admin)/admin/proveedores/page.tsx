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

const proveedoresMock = [
  {
    id: 1,
    nombre: "Transportes Andinos",
    tipo: "transporte",
    contacto: "contacto@andinos.com",
    telefono: "+51 987654321",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "Hotel Sumaq",
    tipo: "hotel",
    contacto: "reservas@sumaqhotel.com",
    telefono: "+51 123456789",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Restaurante El Sabor",
    tipo: "restaurante",
    contacto: "elsabor@rest.com",
    telefono: "+51 555666777",
    estado: "inactivo",
  },
];

const tipoBadgeMap: Record<string, string> = {
  transporte: "bg-blue-100 text-blue-800",
  hotel: "bg-purple-100 text-purple-800",
  restaurante: "bg-orange-100 text-orange-800",
  otro: "bg-gray-100 text-gray-800",
};

export default function ProveedoresPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProveedores = proveedoresMock.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.contacto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Proveedores</h2>
        <Button className="bg-[#d4663a] hover:bg-[#b8532e]">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar proveedor..."
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
              <TableHead>Tipo</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[80px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProveedores.map((prov) => (
              <TableRow key={prov.id}>
                <TableCell className="font-medium">{prov.nombre}</TableCell>
                <TableCell>
                  <Badge className={tipoBadgeMap[prov.tipo] || tipoBadgeMap.otro}>
                    {prov.tipo}
                  </Badge>
                </TableCell>
                <TableCell>{prov.contacto}</TableCell>
                <TableCell>{prov.telefono}</TableCell>
                <TableCell>
                  <Badge
                    variant={prov.estado === "activo" ? "default" : "secondary"}
                    className={
                      prov.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {prov.estado}
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
                      <DropdownMenuItem>
                        {prov.estado === "activo" ? "Desactivar" : "Activar"}
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