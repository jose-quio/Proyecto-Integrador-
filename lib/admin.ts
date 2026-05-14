// lib/api/admin.ts
import api from "@/lib/axios";

export interface StatsDto {
  totalPaquetes: number;
  totalReservas: number;
  totalUsuarios: number;
  totalProveedores: number;
  reservasHoy: number;
  reservasPendientesPago: number;
  ingresosTotales: number;
}

export interface ActividadRecienteDto {
  id: string;
  clienteNombre: string;
  clienteEmail: string;
  paqueteNombre: string;
  fechaSalida: string;
  numPersonas: number;
  precioTotal: number;
  estado: string;
  createdAt: string;
}

export interface PaqueteAdminDto {
  id: string;
  nombre: string;
  lugares: string[];
  precioBase: number;
  duracionDias: number;
  duracionNoches: number;
  totalReservas: number;
  ingresosTotales: number;
  fotoPrincipal?: string;
  activo: boolean;
  createdAt: string;
}

export async function getStats(): Promise<StatsDto> {
  const res = await api.get<StatsDto>("/api/admin/stats");
  return res.data;
}

export async function getActividadReciente(): Promise<ActividadRecienteDto[]> {
  const res = await api.get<ActividadRecienteDto[]>("/api/admin/actividad-reciente");
  return res.data;
}

export async function getPaquetesAdmin(): Promise<PaqueteAdminDto[]> {
  const res = await api.get<PaqueteAdminDto[]>("/api/admin/paquetes");
  return res.data;
}