"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  TrendingUp, TrendingDown, DollarSign, Users,
  CalendarCheck, MapPin, Download, AlertTriangle,
} from "lucide-react";

// ── Paleta cálida del proyecto ─────────────────────────────
const C = {
  naranja: "#d4663a",
  naranjaLight: "#fdf0e8",
  marron: "#2a1810",
  beige: "#e8d8cc",
  verde: "#2d7a47",
  verdeLight: "#e8f5ec",
  ambar: "#f59e0b",
  ambarLight: "#fef3e2",
  rojo: "#c0392b",
  rojoLight: "#fdecea",
  texto: "#4a3020",
  textoMuted: "#8c7b6e",
};

// ── Mock data ──────────────────────────────────────────────
const ingresosMensuales = [
  { mes: "Oct", ingresos: 6200, reservas: 28, meta: 8000 },
  { mes: "Nov", ingresos: 7800, reservas: 35, meta: 8000 },
  { mes: "Dic", ingresos: 11200, reservas: 52, meta: 10000 },
  { mes: "Ene", ingresos: 8400, reservas: 38, meta: 9000 },
  { mes: "Feb", ingresos: 9600, reservas: 44, meta: 9000 },
  { mes: "Mar", ingresos: 12450, reservas: 51, meta: 10000 },
  { mes: "Abr", ingresos: 10800, reservas: 47, meta: 11000 },
];

const ocupacionPaquetes = [
  { nombre: "Arequipa + Colca", reservas: 42, cupos: 50, ingresos: 11760 },
  { nombre: "Colca + Campiña", reservas: 28, cupos: 40, ingresos: 5040 },
  { nombre: "Arequipa + Cotahuasi", reservas: 15, cupos: 24, ingresos: 6300 },
  { nombre: "City Tour Arequipa", reservas: 30, cupos: 60, ingresos: 1350 },
  { nombre: "Colca Express", reservas: 18, cupos: 20, ingresos: 3240 },
  { nombre: "Toro Muerto", reservas: 8, cupos: 20, ingresos: 1680 },
];

const estadosReserva = [
  { name: "Confirmadas", value: 87, color: C.verde },
  { name: "Pendiente pago", value: 24, color: C.ambar },
  { name: "Canceladas", value: 17, color: C.rojo },
];

const procedenciaClientes = [
  { pais: "Perú", clientes: 42, porcentaje: 33 },
  { pais: "EE.UU.", clientes: 28, porcentaje: 22 },
  { pais: "España", clientes: 19, porcentaje: 15 },
  { pais: "Chile", clientes: 15, porcentaje: 12 },
  { pais: "Argentina", clientes: 12, porcentaje: 9 },
  { pais: "Otros", clientes: 12, porcentaje: 9 },
];

const reservasSemana = [
  { dia: "Lun", nuevas: 4, canceladas: 1 },
  { dia: "Mar", nuevas: 7, canceladas: 0 },
  { dia: "Mié", nuevas: 3, canceladas: 2 },
  { dia: "Jue", nuevas: 9, canceladas: 1 },
  { dia: "Vie", nuevas: 12, canceladas: 0 },
  { dia: "Sáb", nuevas: 8, canceladas: 1 },
  { dia: "Dom", nuevas: 5, canceladas: 0 },
];

// ── Helpers ────────────────────────────────────────────────
function pct(a: number, b: number) { return Math.round((a / b) * 100); }

function KpiCard({
  title, value, sub, trend, trendUp, icon, color,
}: {
  title: string; value: string; sub: string;
  trend?: string; trendUp?: boolean;
  icon: React.ReactNode; color: string;
}) {
  return (
    <Card className="border-[#e8d8cc]">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: color + "20", color }}
          >
            {icon}
          </div>
          {trend && (
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: trendUp ? C.verdeLight : C.rojoLight,
                color: trendUp ? C.verde : C.rojo,
              }}
            >
              {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {trend}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold" style={{ color: C.marron }}>{value}</p>
        <p className="text-xs mt-0.5" style={{ color: C.textoMuted }}>{title}</p>
        <p className="text-[11px] mt-1" style={{ color: C.textoMuted }}>{sub}</p>
      </CardContent>
    </Card>
  );
}

// ── Tooltip personalizado ──────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#e8d8cc] bg-white px-3 py-2 shadow text-xs">
      <p className="font-semibold mb-1" style={{ color: C.marron }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{typeof p.value === "number" && p.name.includes("ngreso")
            ? `$${p.value.toLocaleString()}` : p.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ── Alerta de decisión ─────────────────────────────────────
function Alerta({ tipo, mensaje }: { tipo: "warn" | "ok"; mensaje: string }) {
  return (
    <div
      className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-xs"
      style={{
        background: tipo === "warn" ? C.ambarLight : C.verdeLight,
        color: tipo === "warn" ? "#92400e" : C.verde,
        border: `0.5px solid ${tipo === "warn" ? "#fcd9a0" : "#b8dfc5"}`,
      }}
    >
      <AlertTriangle size={13} className="flex-shrink-0 mt-0.5" />
      {mensaje}
    </div>
  );
}

// ── Página principal ───────────────────────────────────────
export default function ReportesPage() {
  const [periodo, setPeriodo] = useState<"7d" | "30d" | "6m">("6m");

  const totalIngresos = ingresosMensuales.reduce((a, m) => a + m.ingresos, 0);
  const totalReservas = estadosReserva.reduce((a, e) => a + e.value, 0);
  const ingresoMes = ingresosMensuales.at(-1)!.ingresos;
  const ingresoAnterior = ingresosMensuales.at(-2)!.ingresos;
  const crecimiento = pct(ingresoMes - ingresoAnterior, ingresoAnterior);

  return (
    <div className="space-y-6">

      {/* ── Encabezado ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.marron }}>Reportes y análisis</h2>
          <p className="text-sm mt-0.5" style={{ color: C.textoMuted }}>
            Datos actualizados al {new Date().toLocaleDateString("es-PE", { dateStyle: "long" })}
          </p>
        </div>
        <Button variant="outline" className="gap-2 border-[#e8d8cc] text-[#4a3020] hover:bg-[#fdf0e8]">
          <Download size={15} />
          Exportar
        </Button>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Ingresos este mes"
          value={`$${ingresoMes.toLocaleString('es-PE')}`}
          sub={`Meta: $10,000`}
          trend={`${crecimiento > 0 ? "+" : ""}${crecimiento}%`}
          trendUp={crecimiento > 0}
          icon={<DollarSign size={18} />}
          color={C.naranja}
        />
        <KpiCard
          title="Reservas totales"
          value={String(totalReservas)}
          sub={`${estadosReserva[0].value} confirmadas`}
          trend="+6%"
          trendUp
          icon={<CalendarCheck size={18} />}
          color={C.verde}
        />
        <KpiCard
          title="Ocupación promedio"
          value="68%"
          sub="Sobre todos los paquetes"
          trend="-2%"
          trendUp={false}
          icon={<MapPin size={18} />}
          color={C.ambar}
        />
        <KpiCard
          title="Nuevos clientes"
          value="23"
          sub="Este mes"
          trend="+12%"
          trendUp
          icon={<Users size={18} />}
          color="#7b5ea7"
        />
      </div>

      {/* ── Alertas de decisión ── */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Alerta tipo="warn" mensaje="Colca Express tiene 90% de ocupación — considera abrir más cupos o crear un nuevo paquete similar." />
        <Alerta tipo="warn" mensaje="Toro Muerto solo tiene 40% de ocupación. Evalúa reducir precio o pausar el paquete." />
      </div>

      {/* ── Tabs de reportes ── */}
      <Tabs defaultValue="ingresos">
        <TabsList className="border border-[#e8d8cc] bg-[#fdf4ef]">
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="paquetes">Paquetes</TabsTrigger>
          <TabsTrigger value="reservas">Reservas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
        </TabsList>

        {/* ─── TAB INGRESOS ─────────────────────── */}
        <TabsContent value="ingresos" className="space-y-4 mt-5">
          <Card className="border-[#e8d8cc]">
            <CardHeader>
              <CardTitle className="text-base" style={{ color: C.marron }}>Ingresos vs Meta mensual</CardTitle>
              <CardDescription style={{ color: C.textoMuted }}>Últimos 7 meses en USD</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={ingresosMensuales}>
                  <defs>
                    <linearGradient id="gradIngreso" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.naranja} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={C.naranja} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: C.textoMuted }} />
                  <YAxis tick={{ fontSize: 12, fill: C.textoMuted }} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Area
                    type="monotone" dataKey="ingresos" name="Ingresos"
                    stroke={C.naranja} strokeWidth={2}
                    fill="url(#gradIngreso)"
                  />
                  <Area
                    type="monotone" dataKey="meta" name="Meta"
                    stroke={C.beige} strokeWidth={1.5} strokeDasharray="4 4"
                    fill="none"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Tabla resumen */}
          <Card className="border-[#e8d8cc]">
            <CardHeader>
              <CardTitle className="text-base" style={{ color: C.marron }}>Detalle mensual</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e8d8cc]">
                    <TableHead>Mes</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Ticket prom.</TableHead>
                    <TableHead>vs Meta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingresosMensuales.map((m) => {
                    const ticket = Math.round(m.ingresos / m.reservas);
                    const vsMeta = pct(m.ingresos, m.meta);
                    return (
                      <TableRow key={m.mes} className="border-[#f0e8e0] hover:bg-[#fdf0e8]">
                        <TableCell className="font-medium" style={{ color: C.texto }}>{m.mes} 2025</TableCell>
                        <TableCell style={{ color: C.naranja, fontWeight: 600 }}>${m.ingresos.toLocaleString('es-PE')}</TableCell>
                        <TableCell>{m.reservas}</TableCell>
                        <TableCell>${ticket}</TableCell>
                        <TableCell>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: vsMeta >= 100 ? C.verdeLight : C.ambarLight,
                              color: vsMeta >= 100 ? C.verde : "#92400e",
                            }}
                          >
                            {vsMeta}%
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB PAQUETES ─────────────────────── */}
        <TabsContent value="paquetes" className="space-y-4 mt-5">
          <Card className="border-[#e8d8cc]">
            <CardHeader>
              <CardTitle className="text-base" style={{ color: C.marron }}>Ocupación por paquete</CardTitle>
              <CardDescription style={{ color: C.textoMuted }}>Reservas actuales vs cupos disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={ocupacionPaquetes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: C.textoMuted }} domain={[0, 60]} />
                  <YAxis
                    dataKey="nombre" type="category"
                    tick={{ fontSize: 10, fill: C.textoMuted }} width={130}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="reservas" name="Reservas" fill={C.naranja} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="cupos" name="Cupos totales" fill={C.beige} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-[#e8d8cc]">
            <CardHeader>
              <CardTitle className="text-base" style={{ color: C.marron }}>Rendimiento por paquete</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#e8d8cc]">
                    <TableHead>Paquete</TableHead>
                    <TableHead>Reservas</TableHead>
                    <TableHead>Ingresos</TableHead>
                    <TableHead>Ocupación</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...ocupacionPaquetes]
                      .sort((a, b) => b.ingresos - a.ingresos)
                      .map((p) => {
                      const ocp = pct(p.reservas, p.cupos);
                      const estado =
                        ocp >= 90 ? "Lleno" : ocp >= 60 ? "Buena" : ocp >= 30 ? "Regular" : "Baja";
                      const estadoColor =
                        ocp >= 90 ? C.rojo : ocp >= 60 ? C.verde : ocp >= 30 ? C.ambar : C.textoMuted;
                      return (
                        <TableRow key={p.nombre} className="border-[#f0e8e0] hover:bg-[#fdf0e8]">
                          <TableCell className="text-sm font-medium" style={{ color: C.texto }}>
                            {p.nombre}
                          </TableCell>
                          <TableCell>{p.reservas}/{p.cupos}</TableCell>
                          <TableCell style={{ color: C.naranja, fontWeight: 600 }}>
                            ${p.ingresos.toLocaleString('es-PE')}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 rounded-full bg-[#f0e8e0] overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${ocp}%`, background: estadoColor }}
                                />
                              </div>
                              <span className="text-xs">{ocp}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: estadoColor + "20",
                                color: estadoColor,
                                border: `0.5px solid ${estadoColor}40`,
                              }}
                            >
                              {estado}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB RESERVAS ─────────────────────── */}
        <TabsContent value="reservas" className="space-y-4 mt-5">
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Donut de estados */}
            <Card className="border-[#e8d8cc]">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: C.marron }}>Distribución por estado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={estadosReserva} cx="50%" cy="50%"
                      innerRadius={55} outerRadius={85}
                      paddingAngle={3} dataKey="value"
                    >
                      {estadosReserva.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v} reservas`]} />
                    <Legend
                      formatter={(val, entry: any) =>
                        `${val}: ${entry.payload.value} (${pct(entry.payload.value, totalReservas)}%)`
                      }
                      wrapperStyle={{ fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Reservas por día de la semana */}
            <Card className="border-[#e8d8cc]">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: C.marron }}>Reservas esta semana</CardTitle>
                <CardDescription style={{ color: C.textoMuted }}>Nuevas vs canceladas por día</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={reservasSemana}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e0" />
                    <XAxis dataKey="dia" tick={{ fontSize: 11, fill: C.textoMuted }} />
                    <YAxis tick={{ fontSize: 11, fill: C.textoMuted }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="nuevas" name="Nuevas" fill={C.naranja} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="canceladas" name="Canceladas" fill={C.rojo} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tabla reservas recientes */}
          <Card className="border-[#e8d8cc]">
            <CardHeader>
              <CardTitle className="text-base" style={{ color: C.marron }}>Resumen de cancelaciones</CardTitle>
              <CardDescription style={{ color: C.textoMuted }}>
                17 cancelaciones este mes — tasa del 13%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { motivo: "Cambio de planes personal", cantidad: 7, pct: 41 },
                  { motivo: "Problemas de pago", cantidad: 5, pct: 29 },
                  { motivo: "Enfermedad o emergencia", cantidad: 3, pct: 18 },
                  { motivo: "No especificado", cantidad: 2, pct: 12 },
                ].map((m) => (
                  <div key={m.motivo} className="flex items-center gap-3">
                    <span className="text-sm flex-1" style={{ color: C.texto }}>{m.motivo}</span>
                    <div className="w-24 h-1.5 rounded-full bg-[#f0e8e0] overflow-hidden">
                      <div className="h-full rounded-full bg-[#c0392b]" style={{ width: `${m.pct}%` }} />
                    </div>
                    <span className="text-xs w-8 text-right" style={{ color: C.textoMuted }}>{m.cantidad}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB CLIENTES ─────────────────────── */}
        <TabsContent value="clientes" className="space-y-4 mt-5">
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Procedencia */}
            <Card className="border-[#e8d8cc]">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: C.marron }}>Procedencia de clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {procedenciaClientes.map((p) => (
                    <div key={p.pais} className="flex items-center gap-3">
                      <span className="text-sm w-20 flex-shrink-0 font-medium" style={{ color: C.texto }}>
                        {p.pais}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-[#f0e8e0] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.porcentaje}%`, background: C.naranja }}
                        />
                      </div>
                      <span className="text-xs w-12 text-right" style={{ color: C.textoMuted }}>
                        {p.clientes} ({p.porcentaje}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Métricas de clientes */}
            <div className="space-y-3">
              {[
                { label: "Clientes recurrentes", value: "34%", desc: "Reservaron más de 1 vez", color: C.verde },
                { label: "Ticket promedio", value: "$285", desc: "Por reserva confirmada", color: C.naranja },
                { label: "Tiempo promedio de anticipación", value: "18 días", desc: "Entre reserva y salida", color: "#7b5ea7" },
                { label: "Tasa de conversión", value: "72%", desc: "De consulta a reserva confirmada", color: C.ambar },
              ].map((m) => (
                <Card key={m.label} className="border-[#e8d8cc]">
                  <CardContent className="pt-4 pb-3 flex items-center gap-4">
                    <div
                      className="text-xl font-bold flex-shrink-0 w-20"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: C.marron }}>{m.label}</p>
                      <p className="text-xs" style={{ color: C.textoMuted }}>{m.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}