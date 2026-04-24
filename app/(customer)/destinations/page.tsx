"use client";

import { useState } from "react";
import { Clock, MapPin, Star, Filter } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
//import { ImageWithFallback } from "@/components/layout/ImageWithFallback";

export default function DestinosPage() {
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const destinations = [
    {
      name: "Cañón del Colca",
      description: "Uno de los cañones más profundos del mundo, hogar del majestuoso cóndor andino. Experimenta vistas espectaculares y pueblos tradicionales.",
      duration: "2 Días",
      durationDays: 2,
      location: "Colca",
      difficulty: "Moderado",
      highlights: ["Observación de cóndores", "Aguas termales", "Pueblos coloniales"],
      image: "https://images.unsplash.com/photo-1570958228554-b56a15c31489",
    },
    {
      name: "Volcán Misti",
      description: "El imponente guardián de Arequipa. Trekking de altura con vistas panorámicas.",
      duration: "2 Días",
      durationDays: 2,
      location: "Arequipa",
      difficulty: "Difícil",
      highlights: ["Trekking", "Campamento", "Vistas 360°"],
      image: "https://images.unsplash.com/photo-1563818708336-3e3449ca7eb4",
    },
    {
      name: "Centro Histórico de Arequipa",
      description: "Patrimonio UNESCO con arquitectura colonial en sillar blanco.",
      duration: "Medio Día",
      durationDays: 0.5,
      location: "Arequipa",
      difficulty: "Fácil",
      highlights: ["Santa Catalina", "Plaza", "Museos"],
      image: "https://images.unsplash.com/photo-1670342488992-e0f61e597abe",
    },
    {
      name: "Valle de los Volcanes",
      description: "Paisaje lunar con más de 80 cráteres volcánicos.",
      duration: "1 Día",
      durationDays: 1,
      location: "Andagua",
      difficulty: "Moderado",
      highlights: ["Cráteres", "Geología", "Flora"],
      image: "https://images.unsplash.com/photo-1584625688581-29bae900b7d4",
    },
    {
      name: "Laguna de Salinas",
      description: "Laguna a 4,300 msnm con flamencos y vicuñas.",
      duration: "1 Día",
      durationDays: 1,
      location: "Salinas",
      difficulty: "Moderado",
      highlights: ["Flamencos", "Vicuñas", "Fotografía"],
      image: "https://images.unsplash.com/photo-1576505637280-c88e4358c06f",
    },
    {
      name: "Petroglifos de Toro Muerto",
      description: "Arte rupestre de culturas pre-incas.",
      duration: "1 Día",
      durationDays: 1,
      location: "Majes",
      difficulty: "Fácil",
      highlights: ["Arte", "Historia", "Desierto"],
      image: "https://images.unsplash.com/photo-1442327243508-7a95f66f2290",
    },
    {
      name: "Cotahuasi Canyon",
      description: "El cañón más profundo de América.",
      duration: "3 Días",
      durationDays: 3,
      location: "Cotahuasi",
      difficulty: "Difícil",
      highlights: ["Cañón", "Cascadas", "Aventura"],
      image: "https://images.unsplash.com/photo-1563817714600-1dda672c234e",
    },
    {
      name: "Chivay y Pueblos del Colca",
      description: "Recorrido cultural por pueblos tradicionales.",
      duration: "1 Día",
      durationDays: 1,
      location: "Chivay",
      difficulty: "Fácil",
      highlights: ["Cultura", "Iglesias", "Terrazas"],
      image: "https://images.unsplash.com/photo-1739210856310-b50baecfa9f1",
    },
  ];

  const durationOptions = Array.from(new Set(destinations.map(d => d.duration))).sort((a, b) => {
    const getValue = (str: string) => str.includes("Medio") ? 0.5 : parseInt(str) || 0;
    return getValue(a) - getValue(b);
  });

  const locationOptions = Array.from(new Set(destinations.map(d => d.location))).sort();

  const filteredDestinations = destinations.filter(d =>
    (selectedDuration === "all" || d.duration === selectedDuration) &&
    (selectedLocation === "all" || d.location === selectedLocation)
  );

  const getDifficultyColor = (d: string) => {
    if (d === "Fácil") return "bg-green-500";
    if (d === "Moderado") return "bg-yellow-500";
    if (d === "Difícil") return "bg-red-500";
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1563817714600-1dda672c234e"
          alt="destinos"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
          <div>
            <motion.h1 className="text-5xl text-white font-bold">
              Destinos Increíbles
            </motion.h1>
            <motion.p className="text-xl text-white/90 mt-2">
              Explora los lugares más espectaculares del sur del Perú
            </motion.p>
          </div>
        </div>
      </section>

      {/* FILTROS */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 items-center">

          <Filter className="text-[#d4663a]" />

          <select value={selectedDuration} onChange={e => setSelectedDuration(e.target.value)} className="p-2 border rounded">
            <option value="all">Todas las duraciones</option>
            {durationOptions.map(d => <option key={d}>{d}</option>)}
          </select>

          <select value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)} className="p-2 border rounded">
            <option value="all">Todas las ubicaciones</option>
            {locationOptions.map(l => <option key={l}>{l}</option>)}
          </select>

          {(selectedDuration !== "all" || selectedLocation !== "all") && (
            <button onClick={() => { setSelectedDuration("all"); setSelectedLocation("all"); }} className="bg-[#d4663a] text-white px-4 py-2 rounded">
              Limpiar filtros
            </button>
          )}

        </div>
      </section>

      {/* GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">

          {filteredDestinations.map((d, i) => (
            <motion.div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden group">

              <div className="relative h-64">
                <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition" />

                <div className={`absolute top-4 right-4 ${getDifficultyColor(d.difficulty)} text-white px-2 py-1 rounded`}>
                  {d.difficulty}
                </div>

                <div className="absolute top-4 left-4 bg-[#d4663a] text-white px-2 py-1 rounded">
                  {d.location}
                </div>

                <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  {d.name}
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{d.description}</p>

                <div className="flex gap-4 mb-4 text-sm">
                  <span><Clock size={14}/> {d.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {d.highlights.map((h, idx) => (
                    <span key={idx} className="bg-gray-200 px-2 py-1 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/destinos/${d.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-center bg-[#d4663a] text-white py-2 rounded"
                >
                  Ver Detalle del Tour
                </Link>
              </div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2a1810] text-white text-center">
        <Star className="mx-auto mb-4 text-[#d4663a]" />
        <h2 className="text-4xl font-bold mb-4">
          ¿No Encuentras lo que Buscas?
        </h2>
        <p className="mb-6">Creamos experiencias personalizadas</p>

        <Link href="/booking" className="bg-[#d4663a] px-6 py-3 rounded">
          Solicitar Tour
        </Link>
      </section>

    </div>
  );
}