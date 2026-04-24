"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal, Plus, Search, Eye,
  Pencil, Copy, PowerOff, Power, Trash2,
  MapPin, Clock, DollarSign, Users,
} from "lucide-react";

// ── Tipos ────────────────────────────────────────────────
type Tour = {
  id: number;
  nombre: string;
  lugares: string[];
  precio: number;
  duracion_dias: number;
  duracion_noches: number;
  cupos: number;
  reservas: number;
  estado: "activo" | "inactivo";
  fotos: number;
  created_at: string;
};

// ── Mock data ─────────────────────────────────────────────
const toursMock: Tour[] = [
  {
    id: 1,
    nombre: "Arequipa + Cañón del Colca",
    lugares: ["Arequipa", "Colca"],
    precio: 280,
    duracion_dias: 3,
    duracion_noches: 2,
    cupos: 16,
    reservas: 9,
    estado: "activo",
    fotos: 6,
    created_at: "2025-03-01",
  },
  {
    id: 2,
    nombre: "Valle del Colca + Campiña Arequipeña",
    lugares: ["Colca", "Campiña"],
    precio: 180,
    duracion_dias: 2,
    duracion_noches: 1,
    cupos: 20,
    reservas: 20,
    estado: "activo",
    fotos: 4,
    created_at: "2025-03-10",
  },
  {
    id: 3,
    nombre: "City Tour Arequipa",
    lugares: ["Arequipa"],
    precio: 45,
    duracion_dias: 1,
    duracion_noches: 0,
    cupos: 30,
    reservas: 0,
    estado: "inactivo",
    fotos: 3,
    created_at: "2025-02-15",
  },
  {
    id: 4,
    nombre: "Arequipa + Cotahuasi",
    lugares: ["Arequipa", "Cotahuasi"],
    precio: 420,
    duracion_dias: 4,
    duracion_noches: 3,
    cupos: 12,
    reservas: 5,
    estado: "activo",
    fotos: 8,
    created_at: "2025-04-01",
  },
];

// ── Helpers ───────────────────────────────────────────────
function ocupacion(reservas: number, cupos: number) {
  const pct = Math.round((reservas / cupos) * 100);
  return { pct, label: `${reservas}/${cupos}` };
}

function OcupacionBar({ reservas, cupos }: { reservas: number; cupos: number }) {
  const { pct, label } = ocupacion(reservas, cupos);
  const color =
    pct >= 100 ? "bg-red-500" : pct >= 70 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-12 text-right">{label}</span>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────
export default function ToursPage() {
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>(toursMock);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"todos" | "activo" | "inactivo">("todos");
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    tipo: "eliminar" | "toggle" | null;
    tour: Tour | null;
  }>({ open: false, tipo: null, tour: null });

  // Filtrado
  const filtered = tours.filter((t) => {
    const matchSearch =
      t.nombre.toLowerCase().includes(search.toLowerCase()) ||
      t.lugares.some((l) => l.toLowerCase().includes(search.toLowerCase()));
    const matchEstado = filtroEstado === "todos" || t.estado === filtroEstado;
    return matchSearch && matchEstado;
  });

  // Acciones
  function toggleEstado(tour: Tour) {
    setTours((prev) =>
      prev.map((t) =>
        t.id === tour.id
          ? { ...t, estado: t.estado === "activo" ? "inactivo" : "activo" }
          : t
      )
    );
    setConfirmDialog({ open: false, tipo: null, tour: null });
  }

  function eliminar(tour: Tour) {
    setTours((prev) => prev.filter((t) => t.id !== tour.id));
    setConfirmDialog({ open: false, tipo: null, tour: null });
  }

  function duplicar(tour: Tour) {
    const nuevo: Tour = {
      ...tour,
      id: Date.now(),
      nombre: `${tour.nombre} (copia)`,
      reservas: 0,
      estado: "inactivo",
      created_at: new Date().toISOString().split("T")[0],
    };
    setTours((prev) => [nuevo, ...prev]);
  }

  // Stats rápidas
  const activos = tours.filter((t) => t.estado === "activo").length;
  const totalReservas = tours.reduce((a, t) => a + t.reservas, 0);
  const sinCupos = tours.filter((t) => t.reservas >= t.cupos).length;

  return (
    <div className="space-y-6">

      {/* ── Encabezado ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Paquetes / Tours</h2>
          <p className="text-sm text-gray-500 mt-0.5">Gestiona los paquetes turísticos disponibles</p>
        </div>
        <Button
          className="bg-[#d4663a] hover:bg-[#b8532e] gap-2"
          onClick={() => router.push("/admin/tours/nuevo")}
        >
          <Plus className="h-4 w-4" />
          Nuevo paquete
        </Button>
      </div>

      {/* ── Tarjetas resumen ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total paquetes", value: tours.length, icon: <MapPin className="h-4 w-4" />, color: "text-blue-600 bg-blue-50" },
          { label: "Activos", value: activos, icon: <Power className="h-4 w-4" />, color: "text-emerald-600 bg-emerald-50" },
          { label: "Total reservas", value: totalReservas, icon: <Users className="h-4 w-4" />, color: "text-amber-600 bg-amber-50" },
          { label: "Sin cupos", value: sinCupos, icon: <PowerOff className="h-4 w-4" />, color: "text-red-600 bg-red-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white border rounded-xl p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o lugar..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {(["todos", "activo", "inactivo"] as const).map((f) => (
            <Button
              key={f}
              variant={filtroEstado === f ? "default" : "outline"}
              size="sm"
              className={filtroEstado === f ? "bg-[#d4663a] hover:bg-[#b8532e]" : ""}
              onClick={() => setFiltroEstado(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Paquete</TableHead>
              <TableHead>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Duración</span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />Precio</span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Ocupación</span>
              </TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[60px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-gray-400">
                  No se encontraron paquetes
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tour) => (
                <TableRow key={tour.id} className="hover:bg-gray-50/50">
                  {/* Nombre + lugares */}
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-800 leading-tight">{tour.nombre}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tour.lugares.map((l) => (
                          <span key={l} className="inline-flex items-center gap-0.5 text-[11px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                            <MapPin className="h-2.5 w-2.5" />{l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>

                  {/* Duración */}
                  <TableCell className="text-sm text-gray-600">
                    {tour.duracion_dias}D / {tour.duracion_noches}N
                  </TableCell>

                  {/* Precio */}
                  <TableCell className="text-sm font-semibold text-gray-800">
                    ${tour.precio}
                  </TableCell>

                  {/* Ocupación */}
                  <TableCell>
                    <OcupacionBar reservas={tour.reservas} cupos={tour.cupos} />
                  </TableCell>

                  {/* Estado */}
                  <TableCell>
                    <Badge
                      className={
                        tour.estado === "activo"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-gray-100 text-gray-500 border-gray-200"
                      }
                      variant="outline"
                    >
                      {tour.estado}
                    </Badge>
                  </TableCell>

                  {/* Acciones */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => router.push(`/admin/tours/${tour.id}`)}
                        >
                          <Eye className="h-4 w-4" /> Ver detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => router.push(`/admin/tours/${tour.id}/editar`)}
                        >
                          <Pencil className="h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() => duplicar(tour)}
                        >
                          <Copy className="h-4 w-4" /> Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={() =>
                            setConfirmDialog({ open: true, tipo: "toggle", tour })
                          }
                        >
                          {tour.estado === "activo" ? (
                            <><PowerOff className="h-4 w-4 text-amber-500" /> Desactivar</>
                          ) : (
                            <><Power className="h-4 w-4 text-emerald-500" /> Activar</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="gap-2 text-red-600 focus:text-red-600"
                          onClick={() =>
                            setConfirmDialog({ open: true, tipo: "eliminar", tour })
                          }
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Dialog confirmación ── */}
      <Dialog
        open={confirmDialog.open}
        onOpenChange={(o) =>
          !o && setConfirmDialog({ open: false, tipo: null, tour: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmDialog.tipo === "eliminar"
                ? "¿Eliminar paquete?"
                : confirmDialog.tour?.estado === "activo"
                ? "¿Desactivar paquete?"
                : "¿Activar paquete?"}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.tipo === "eliminar" ? (
                <>
                  Estás a punto de eliminar{" "}
                  <strong>{confirmDialog.tour?.nombre}</strong>. Esta acción no
                  se puede deshacer.
                </>
              ) : confirmDialog.tour?.estado === "activo" ? (
                <>
                  El paquete <strong>{confirmDialog.tour?.nombre}</strong> dejará
                  de aparecer en la web y no recibirá nuevas reservas.
                </>
              ) : (
                <>
                  El paquete <strong>{confirmDialog.tour?.nombre}</strong>{" "}
                  volverá a estar disponible para reservas.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog({ open: false, tipo: null, tour: null })
              }
            >
              Cancelar
            </Button>
            <Button
              className={
                confirmDialog.tipo === "eliminar"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-[#d4663a] hover:bg-[#b8532e]"
              }
              onClick={() => {
                if (!confirmDialog.tour) return;
                confirmDialog.tipo === "eliminar"
                  ? eliminar(confirmDialog.tour)
                  : toggleEstado(confirmDialog.tour);
              }}
            >
              {confirmDialog.tipo === "eliminar"
                ? "Sí, eliminar"
                : confirmDialog.tour?.estado === "activo"
                ? "Sí, desactivar"
                : "Sí, activar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}