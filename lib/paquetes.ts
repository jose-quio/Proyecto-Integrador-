import api from "./axios";
import { PaqueteResumen, PaqueteDetalle} from "@/types";

export async function obtenerPaquetes(): Promise<PaqueteResumen[]> {
  const res = await api.get<PaqueteResumen[]>("/api/paquetes");
  return res.data;
}

export async function obtenerPaqueteDetalle(id: string): Promise<PaqueteDetalle> {
  const res = await api.get<PaqueteDetalle>(`/api/paquetes/${id}`);
  return res.data;
}