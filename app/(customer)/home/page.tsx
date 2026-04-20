"use client";
import Link from "next/link";
import { ArrowRight, Car, Globe, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";
const features = [
  {
    icon: Star,
    title: "Excelencia",
    description: "Calificación 5 estrellas de nuestros clientes",
  },
  {
    icon: Car,
    title: "Flota Premium",
    description: "Vehículos modernos y bien mantenidos",
  },
  {
    icon: Globe,
    title: "Tours Únicos",
    description: "Experiencias auténticas y memorables",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description: "Personal certificado y seguros completos",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1584625688581-29bae900b7d4"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2a1810]/90"></div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >

              <div className="inline-block px-4 py-2 bg-[#d4663a]/90 rounded-full text-white mb-6">
                Descubre la Ciudad Blanca
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white font-bold mb-6">
                Tu Aventura en Arequipa Comienza Aquí
              </h1>

              <p className="text-xl text-white/90 mb-8">
                Explora los majestuosos volcanes, el impresionante Cañón del Colca y la rica cultura del sur del Perú con nuestros tours personalizados y servicio de transporte premium.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tours"
                  className="group px-8 py-4 bg-[#d4663a] text-white rounded-full hover:bg-[#c15530] flex items-center gap-2"
                >
                  Ver Tours
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/about"
                  className="px-8 py-4 bg-white/10 text-white rounded-full border border-white/30"
                >
                  Conócenos
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl text-[#2a1810] font-bold mb-4">
            Por Qué Elegirnos
          </h2>
          <p className="text-lg text-[#6b5849] max-w-2xl mx-auto">
            Más de 10 años de experiencia brindando los mejores tours y
            servicios de transporte en Arequipa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center p-8 rounded-2xl bg-[#faf8f5] hover:bg-[#d4663a] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4663a] group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-white group-hover:text-[#d4663a] transition-colors duration-300" />
              </div>
              <h3 className="text-xl text-[#2a1810] group-hover:text-white font-semibold mb-2 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-[#6b5849] group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

      {/* DESTINOS */}
      <section className="py-20 bg-gradient-to-br from-[#f4e8d9] to-[#e8dfd2]">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#2a1810] font-bold mb-4">
              Destinos Populares
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {["Colca", "Misti", "Centro"].map((name, i) => (
              <div key={i} className="relative h-80 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1570958228554-b56a15c31489"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{name}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2a1810] text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          ¿Listo para tu Próxima Aventura?
        </h2>

        <Link
          href="/checkout"
          className="px-8 py-4 bg-[#d4663a] rounded-full"
        >
          Reservar Ahora
        </Link>
      </section>

    </div>
  );
}