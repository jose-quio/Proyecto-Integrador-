"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft, Save, Plus, Trash2, GripVertical,
  ImagePlus, MapPin, X, AlertCircle, CheckCircle2,
} from "lucide-react";

// ── Tipos del formulario ──────────────────────────────────
type Foto = { id: number; url: string; alt: string };
type DiaItinerario = { id: number; dia: number; titulo: string; descripcion: string };
type LugarSeleccionado = { id: number; nombre: string };

const LUGARES_DISPONIBLES = [
  "Arequipa", "Cañón del Colca", "Campiña Arequipeña",
  "Cotahuasi", "Toro Muerto", "Laguna de Salinas",
  "Chivay", "Yanque",
];

const PROVEEDORES = [
  { id: 1, nombre: "Transport Colca SAC", tipo: "transporte" },
  { id: 2, nombre: "Hotel Las Casitas", tipo: "hotel" },
  { id: 3, nombre: "Restaurant El Montonero", tipo: "restaurante" },
  { id: 4, nombre: "Inka Bus", tipo: "transporte" },
  { id: 5, nombre: "Posada del Inca", tipo: "hotel" },
];

// ── Componente label ──────────────────────────────────────
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-400 mt-1">{children}</p>;
}

// ── Textarea con contador ─────────────────────────────────
function MarkdownTextarea({
  label, value, onChange, placeholder, hint, rows = 6, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; rows?: number; required?: boolean;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <textarea
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4663a]/30 focus:border-[#d4663a] resize-y font-mono"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────
export default function NuevoTourPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [guardando, setGuardando] = useState(false);

  // Estado del formulario
  const [nombre, setNombre] = useState("");
  const [lugaresSeleccionados, setLugaresSeleccionados] = useState<LugarSeleccionado[]>([]);
  const [precio, setPrecio] = useState("");
  const [dias, setDias] = useState("1");
  const [noches, setNoches] = useState("0");
  const [cupos, setCupos] = useState("16");
  const [activo, setActivo] = useState(true);
  const [mapaUrl, setMapaUrl] = useState("");

  // Contenido
  const [subtitulo, setSubtitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [recomendaciones, setRecomendaciones] = useState("");
  const [incluye, setIncluye] = useState("- Transporte en bus turístico\n- Guía local certificado\n- ");
  const [noIncluye, setNoIncluye] = useState("- Vuelos\n- Seguro de viaje\n- ");
  const [preguntas, setPreguntas] = useState("**¿Qué incluye el tour?**\n\n**¿Cuál es el punto de encuentro?**\n\n");

  // Fotos
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [nuevaFotoUrl, setNuevaFotoUrl] = useState("");

  // Itinerario
  const [itinerario, setItinerario] = useState<DiaItinerario[]>([
    { id: 1, dia: 1, titulo: "", descripcion: "" },
  ]);

  // Proveedores
  const [proveedoresAsignados, setProveedoresAsignados] = useState<number[]>([]);

  // Nombre automático basado en lugares
  const nombreGenerado = lugaresSeleccionados.map((l) => l.nombre).join(" + ");

  function agregarLugar(nombre: string) {
    if (lugaresSeleccionados.find((l) => l.nombre === nombre)) return;
    setLugaresSeleccionados((prev) => [...prev, { id: Date.now(), nombre }]);
  }

  function quitarLugar(id: number) {
    setLugaresSeleccionados((prev) => prev.filter((l) => l.id !== id));
  }

  function agregarFoto() {
    if (!nuevaFotoUrl.trim()) return;
    setFotos((prev) => [
      ...prev,
      { id: Date.now(), url: nuevaFotoUrl.trim(), alt: "" },
    ]);
    setNuevaFotoUrl("");
  }

  function agregarDia() {
    const nuevoDia = itinerario.length + 1;
    setItinerario((prev) => [
      ...prev,
      { id: Date.now(), dia: nuevoDia, titulo: "", descripcion: "" },
    ]);
    setDias(String(nuevoDia));
  }

  function quitarDia(id: number) {
    setItinerario((prev) => {
      const actualizado = prev
        .filter((d) => d.id !== id)
        .map((d, i) => ({ ...d, dia: i + 1 }));
      setDias(String(actualizado.length));
      return actualizado;
    });
  }

  function actualizarDia(id: number, campo: keyof DiaItinerario, valor: string) {
    setItinerario((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [campo]: valor } : d))
    );
  }

  function toggleProveedor(id: number) {
    setProveedoresAsignados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function guardar() {
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 1200));
    setGuardando(false);
    router.push("/admin/tours");
  }

  // Tabs con indicador de completitud
  const tabStatus = {
    general: nombre.trim().length > 0 || lugaresSeleccionados.length > 0,
    contenido: subtitulo.trim().length > 0 || resumen.trim().length > 0,
    itinerario: itinerario.some((d) => d.titulo.trim().length > 0),
    fotos: fotos.length > 0,
    extras: proveedoresAsignados.length > 0,
  };

  return (
    <div className="space-y-6 max-w-4xl">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/tours")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Nuevo paquete</h2>
            <p className="text-sm text-gray-500">
              {nombreGenerado || "Completa la información del paquete"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/tours")}>
            Cancelar
          </Button>
          <Button
            className="bg-[#d4663a] hover:bg-[#b8532e] gap-2 min-w-[120px]"
            onClick={guardar}
            disabled={guardando}
          >
            <Save className="h-4 w-4" />
            {guardando ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          {[
            { key: "general", label: "General" },
            { key: "contenido", label: "Contenido" },
            { key: "itinerario", label: "Itinerario" },
            { key: "fotos", label: "Fotos" },
            { key: "extras", label: "Extras" },
          ].map((t) => (
            <TabsTrigger key={t.key} value={t.key} className="relative gap-1.5 text-xs sm:text-sm">
              {t.label}
              {tabStatus[t.key as keyof typeof tabStatus] && (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── TAB: GENERAL ─────────────────────────── */}
        <TabsContent value="general" className="space-y-5 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Información básica</CardTitle>
              <CardDescription>Define los datos principales del paquete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">

              {/* Lugares */}
              <div>
                <Label required>Lugares del paquete</Label>
                <div className="flex flex-wrap gap-2 mb-3 min-h-[36px]">
                  {lugaresSeleccionados.map((l) => (
                    <Badge
                      key={l.id}
                      variant="outline"
                      className="gap-1.5 pl-2 pr-1 py-1 border-[#d4663a]/30 text-[#d4663a] bg-[#d4663a]/5"
                    >
                      <MapPin className="h-3 w-3" />
                      {l.nombre}
                      <button
                        onClick={() => quitarLugar(l.id)}
                        className="ml-0.5 hover:text-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {LUGARES_DISPONIBLES.filter(
                    (l) => !lugaresSeleccionados.find((s) => s.nombre === l)
                  ).map((l) => (
                    <button
                      key={l}
                      onClick={() => agregarLugar(l)}
                      className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:border-[#d4663a] hover:text-[#d4663a] transition-colors"
                    >
                      + {l}
                    </button>
                  ))}
                </div>
                <Hint>El nombre del paquete se generará automáticamente: {nombreGenerado || "Lugar 1 + Lugar 2"}</Hint>
              </div>

              {/* Nombre personalizado */}
              <div>
                <Label>Nombre personalizado</Label>
                <Input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={nombreGenerado || "Ej. Arequipa + Cañón del Colca"}
                />
                <Hint>Déjalo vacío para usar el nombre generado por los lugares</Hint>
              </div>

              {/* Duración + precio + cupos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <Label required>Días</Label>
                  <Input
                    type="number" min="1"
                    value={dias}
                    onChange={(e) => setDias(e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Noches</Label>
                  <Input
                    type="number" min="0"
                    value={noches}
                    onChange={(e) => setNoches(e.target.value)}
                  />
                </div>
                <div>
                  <Label required>Precio (USD)</Label>
                  <Input
                    type="number" min="0" step="0.01"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label required>Cupos máx.</Label>
                  <Input
                    type="number" min="1"
                    value={cupos}
                    onChange={(e) => setCupos(e.target.value)}
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivo(!activo)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    activo ? "bg-[#d4663a]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      activo ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-700">
                  {activo ? "Paquete activo (visible en web)" : "Paquete inactivo (oculto)"}
                </span>
              </div>

              {/* URL del mapa */}
              <div>
                <Label>URL del mapa</Label>
                <Input
                  value={mapaUrl}
                  onChange={(e) => setMapaUrl(e.target.value)}
                  placeholder="https://maps.google.com/..."
                />
                <Hint>Pega el enlace de Google Maps para mostrar la ruta del paquete</Hint>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB: CONTENIDO ──────────────────────── */}
        <TabsContent value="contenido" className="space-y-5 mt-6">
          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Todos los campos de texto aceptan formato <strong>Markdown</strong>: 
              usa <code className="bg-blue-100 px-1 rounded">**negrita**</code>, 
              <code className="bg-blue-100 px-1 rounded ml-1">- listas</code>, 
              saltos de línea, etc.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumen del paquete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label required>Subtítulo</Label>
                <Input
                  value={subtitulo}
                  onChange={(e) => setSubtitulo(e.target.value)}
                  placeholder="Ej. Vive la magia del cañón más profundo del mundo"
                />
              </div>
              <MarkdownTextarea
                label="Resumen"
                required
                value={resumen}
                onChange={setResumen}
                rows={5}
                placeholder="Describe el paquete para el cliente..."
                hint="Este texto aparecerá en la página principal del paquete"
              />
              <MarkdownTextarea
                label="Recomendaciones"
                value={recomendaciones}
                onChange={setRecomendaciones}
                rows={4}
                placeholder="- Llevar ropa abrigadora&#10;- Documentos de identidad&#10;- ..."
                hint="Consejos importantes para el viajero"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Incluye / No incluye</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <MarkdownTextarea
                label="✓ Incluye"
                value={incluye}
                onChange={setIncluye}
                rows={8}
                placeholder="- Transporte&#10;- Guía&#10;- ..."
              />
              <MarkdownTextarea
                label="✗ No incluye"
                value={noIncluye}
                onChange={setNoIncluye}
                rows={8}
                placeholder="- Vuelos&#10;- Seguro&#10;- ..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preguntas frecuentes</CardTitle>
              <CardDescription>Escribe las preguntas en negrita y la respuesta debajo</CardDescription>
            </CardHeader>
            <CardContent>
              <MarkdownTextarea
                label="Preguntas frecuentes"
                value={preguntas}
                onChange={setPreguntas}
                rows={10}
                placeholder={"**¿Cuál es el punto de encuentro?**\n\nNos reunimos en...\n\n**¿Qué debo llevar?**\n\n..."}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB: ITINERARIO ─────────────────────── */}
        <TabsContent value="itinerario" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Itinerario por días</CardTitle>
                <CardDescription>Define qué actividades se hacen cada día</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={agregarDia}
              >
                <Plus className="h-4 w-4" /> Agregar día
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {itinerario.map((dia) => (
                <div
                  key={dia.id}
                  className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-gray-300" />
                      <span className="text-sm font-semibold text-[#d4663a]">
                        Día {dia.dia}
                      </span>
                    </div>
                    {itinerario.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-400 hover:text-red-500"
                        onClick={() => quitarDia(dia.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <Label>Título del día</Label>
                    <Input
                      value={dia.titulo}
                      onChange={(e) => actualizarDia(dia.id, "titulo", e.target.value)}
                      placeholder="Ej. Llegada a Arequipa y visita al centro histórico"
                    />
                  </div>
                  <div>
                    <Label>Descripción</Label>
                    <textarea
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4663a]/30 focus:border-[#d4663a] resize-y font-mono"
                      rows={4}
                      value={dia.descripcion}
                      onChange={(e) => actualizarDia(dia.id, "descripcion", e.target.value)}
                      placeholder={"- 08:00 Desayuno en el hotel\n- 09:00 Visita a la Catedral\n- 12:00 Almuerzo libre..."}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB: FOTOS ──────────────────────────── */}
        <TabsContent value="fotos" className="space-y-5 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Galería de fotos</CardTitle>
              <CardDescription>
                Usa URLs de Cloudinary u otro proveedor de imágenes. La primera foto será la portada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Agregar foto */}
              <div className="flex gap-2">
                <Input
                  value={nuevaFotoUrl}
                  onChange={(e) => setNuevaFotoUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/tu-cuenta/image/upload/..."
                  onKeyDown={(e) => e.key === "Enter" && agregarFoto()}
                />
                <Button
                  variant="outline"
                  className="gap-1.5 shrink-0"
                  onClick={agregarFoto}
                >
                  <ImagePlus className="h-4 w-4" /> Agregar
                </Button>
              </div>

              {/* Lista de fotos */}
              {fotos.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center">
                  <ImagePlus className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Aún no hay fotos agregadas</p>
                  <p className="text-xs text-gray-300 mt-1">Pega una URL de Cloudinary arriba</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {fotos.map((foto, idx) => (
                    <div key={foto.id} className="relative group rounded-lg overflow-hidden border border-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={foto.url}
                        alt={foto.alt || `Foto ${idx + 1}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x300/f3f4f6/9ca3af?text=Error";
                        }}
                      />
                      {idx === 0 && (
                        <span className="absolute top-1.5 left-1.5 bg-[#d4663a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Portada
                        </span>
                      )}
                      <button
                        onClick={() =>
                          setFotos((prev) => prev.filter((f) => f.id !== foto.id))
                        }
                        className="absolute top-1.5 right-1.5 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="p-2">
                        <Input
                          value={foto.alt}
                          onChange={(e) =>
                            setFotos((prev) =>
                              prev.map((f) =>
                                f.id === foto.id ? { ...f, alt: e.target.value } : f
                              )
                            )
                          }
                          placeholder="Descripción de la foto"
                          className="text-xs h-7"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TAB: EXTRAS ─────────────────────────── */}
        <TabsContent value="extras" className="space-y-5 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Proveedores asignados</CardTitle>
              <CardDescription>
                Selecciona los proveedores que participan en este paquete (uso interno, no visible al cliente)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {PROVEEDORES.map((p) => {
                  const activo = proveedoresAsignados.includes(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        activo
                          ? "border-[#d4663a]/40 bg-[#d4663a]/5"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="accent-[#d4663a]"
                        checked={activo}
                        onChange={() => toggleProveedor(p.id)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{p.nombre}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          p.tipo === "transporte"
                            ? "border-blue-200 text-blue-600 bg-blue-50"
                            : p.tipo === "hotel"
                            ? "border-purple-200 text-purple-600 bg-purple-50"
                            : "border-amber-200 text-amber-600 bg-amber-50"
                        }
                      >
                        {p.tipo}
                      </Badge>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Resumen antes de guardar */}
          <Card className="border-[#d4663a]/20 bg-[#d4663a]/5">
            <CardHeader>
              <CardTitle className="text-base text-[#d4663a]">Resumen del paquete</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p><strong>Nombre:</strong> {nombre || nombreGenerado || "—"}</p>
              <p><strong>Lugares:</strong> {lugaresSeleccionados.map((l) => l.nombre).join(", ") || "—"}</p>
              <p><strong>Duración:</strong> {dias} días / {noches} noches</p>
              <p><strong>Precio:</strong> {precio ? `$${precio}` : "—"}</p>
              <p><strong>Cupos:</strong> {cupos}</p>
              <p><strong>Fotos:</strong> {fotos.length}</p>
              <p><strong>Días de itinerario:</strong> {itinerario.length}</p>
              <p><strong>Proveedores:</strong> {proveedoresAsignados.length}</p>
              <p><strong>Estado:</strong> {activo ? "Activo" : "Inactivo"}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Footer guardar ── */}
      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" onClick={() => router.push("/admin/tours")}>
          Cancelar
        </Button>
        <Button
          className="bg-[#d4663a] hover:bg-[#b8532e] gap-2 min-w-[140px]"
          onClick={guardar}
          disabled={guardando}
        >
          <Save className="h-4 w-4" />
          {guardando ? "Guardando..." : "Guardar paquete"}
        </Button>
      </div>
    </div>
  );
}