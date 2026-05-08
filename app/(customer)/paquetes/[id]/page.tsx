// app/paquetes/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { obtenerPaqueteDetalle } from "@/lib/paquetes";
import { PaqueteDetalle } from "@/types";

// Componente para el slider de imágenes con efecto zoom
function Slideshow({ imagenes }: { imagenes: { url: string; alt?: string }[] }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (imagenes.length === 0) return;
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagenes]);

  if (imagenes.length === 0) return null;

  return (
    <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={indice}
          src={imagenes[indice].url}
          alt={imagenes[indice].alt || `Foto ${indice + 1}`}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
    </div>
  );
}

// Sub-navegación sticky
function SubNavbar() {
  const secciones = [
    { id: "resumen", label: "Resumen" },
    { id: "itinerario", label: "Itinerario" },
    { id: "incluye", label: "Incluye" },
    { id: "no-incluye", label: "No Incluye" },
    { id: "recomendaciones", label: "Recomendaciones" },
    { id: "preguntas", label: "Preguntas" },
    { id: "mapa", label: "Mapa" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-20 z-40 bg-[#2a1810] border-b border-[#d4663a]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex overflow-x-auto gap-2 py-2">
          {secciones.map((sec) => (
            <li key={sec.id} className="flex-shrink-0">
              <a
                href={`#${sec.id}`}
                onClick={(e) => handleScroll(e, sec.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#f4e8d9] hover:bg-[#d4663a] hover:text-white transition-colors whitespace-nowrap"
              >
                {sec.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Acordeón para el itinerario
function ItinerarioAccordion({ itinerario }: { itinerario: { diaNumero: number; titulo: string; descripcionMd?: string }[] }) {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {itinerario.map((dia, idx) => (
        <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setAbierto(abierto === idx ? null : idx)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="bg-[#d4663a] text-white text-sm font-bold px-3 py-1 rounded-full">
                Día {dia.diaNumero}
              </span>
              <h3 className="text-lg font-semibold text-left">{dia.titulo}</h3>
            </div>
            {abierto === idx ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          {abierto === idx && dia.descripcionMd && (
            <div className="p-4 prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{dia.descripcionMd}</ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PaqueteDetallePage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [paquete, setPaquete] = useState<PaqueteDetalle | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setCargando(true);
    obtenerPaqueteDetalle(id)
      .then((data) => {
        setPaquete(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar el paquete. Intenta nuevamente.");
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#f5eee6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4663a] mx-auto mb-4" />
          <p className="text-gray-600">Cargando detalles del paquete...</p>
        </div>
      </div>
    );
  }

  if (error || !paquete) {
    return (
      <div className="min-h-screen bg-[#f5eee6] flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error || "Paquete no encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5eee6]">
      {/* Hero con slider */}
      <Slideshow imagenes={paquete.fotos} />

      {/* Información principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10 -mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a1810] mb-2">
            {paquete.nombre}
          </h1>
          {paquete.subtitulo && (
            <p className="text-xl text-gray-600 mb-4">{paquete.subtitulo}</p>
          )}

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex items-center gap-2 text-lg font-bold text-[#d4663a]">
              <Clock size={20} />
              <span>
                {paquete.duracionDias} día{paquete.duracionDias > 1 ? "s" : ""}
                {paquete.duracionNoches ? ` / ${paquete.duracionNoches} noches` : ""}
              </span>
            </div>
            <div className="text-lg font-bold text-[#d4663a]">
              S/ {paquete.precioBase.toFixed(2)}
            </div>
            <div className="flex flex-wrap gap-2">
              {paquete.lugares.map((lugar) => (
                <span
                  key={lugar}
                  className="bg-[#f4e8d9] text-[#2a1810] text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <MapPin size={14} /> {lugar}
                </span>
              ))}
            </div>
          </div>

          {/* Sub-navbar sticky */}
          <SubNavbar />

          {/* Secciones */}
          <div className="mt-10 space-y-16">
            {/* Resumen */}
            {paquete.resumenMd && (
              <section id="resumen">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Resumen
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{paquete.resumenMd}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* Itinerario */}
            {paquete.itinerario && paquete.itinerario.length > 0 && (
              <section id="itinerario">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Itinerario
                </h2>
                <ItinerarioAccordion itinerario={paquete.itinerario} />
              </section>
            )}

            {/* Incluye */}
            {paquete.incluyeMd && (
              <section id="incluye">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Incluye
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{paquete.incluyeMd}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* No Incluye */}
            {paquete.noIncluyeMd && (
              <section id="no-incluye">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  No Incluye
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{paquete.noIncluyeMd}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* Recomendaciones */}
            {paquete.recomendacionesMd && (
              <section id="recomendaciones">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Recomendaciones
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{paquete.recomendacionesMd}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* Preguntas */}
            {paquete.preguntasMd && (
              <section id="preguntas">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Preguntas Frecuentes
                </h2>
                <div className="prose max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{paquete.preguntasMd}</ReactMarkdown>
                </div>
              </section>
            )}

            {/* Mapa */}
            {paquete.mapaUrl && (
              <section id="mapa">
                <h2 className="text-3xl font-bold text-[#2a1810] mb-4 border-l-4 border-[#d4663a] pl-4">
                  Mapa del Recorrido
                </h2>
                <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={paquete.mapaUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa del paquete"
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}