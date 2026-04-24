"use client";

import {
  Calendar,
  MapPin,
  Car,
  Clock,
  Mail,
  Phone,
  User,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  /*useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.replace("/");
      return;
    }
    
    setIsLoading(false);
  }, [router]);*/

  // Muestra un loading mientras verifica la autenticación
  /*if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5eee6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4663a] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }*/

  return (
    <div className="bg-[#f5eee6] min-h-screen">
      <div className="px-8 py-10 max-w-7xl mx-auto w-full">
        {/* TITULO CON GRADIENTE */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2a1810] to-[#d4663a] bg-clip-text text-transparent mb-2">
          Mi Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Bienvenido, {user.name}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* PERFIL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col items-center">

              {/* AVATAR */}
              <div className="w-24 h-24 bg-[#b86a3c] rounded-full flex items-center justify-center shadow-lg">
                <User size={40} className="text-white" />
              </div>

              <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <hr className="my-6" />

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> +51 954 XXX XXX
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> Arequipa, Perú
              </div>
            </div>
          </motion.div>

          {/* RESERVAS */}
          <div className="md:col-span-2 space-y-6">

            <h2 className="text-2xl font-bold text-[#2a1810]">
              Mis Reservas
            </h2>

            {/* RESERVA 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-500">#B001</span>
                  <span className="ml-2 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    Confirmado
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    Cañón del Colca
                  </h3>
                  <p className="text-gray-500">
                    Explorador Completo
                  </p>
                </div>

                <span className="text-xl font-bold text-[#d4663a]">
                  S/ 950
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">

                <span className="flex items-center gap-1">
                  <Calendar size={16} /> 2026-05-15
                </span>

                <span className="flex items-center gap-1">
                  <Users size={16} /> 2 pax
                </span>

                <span className="flex items-center gap-1">
                  <Car size={16} /> Camioneta SUV
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={16} /> Confirmado
                </span>

              </div>

              <button className="mt-4 bg-[#d4663a] text-white px-5 py-2 rounded-lg 
              hover:bg-[#b8542d] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Detalles
              </button>
            </motion.div>

            {/* RESERVA 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm text-gray-500">#B002</span>
                  <span className="ml-2 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    Pendiente
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    Volcán Misti
                  </h3>
                  <p className="text-gray-500">
                    Aventura Full Day
                  </p>
                </div>

                <span className="text-xl font-bold text-[#d4663a]">
                  S/ 450
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-4">

                <span className="flex items-center gap-1">
                  <Calendar size={16} /> 2026-06-10
                </span>

                <span className="flex items-center gap-1">
                  <Users size={16} /> 1 pax
                </span>

                <span className="flex items-center gap-1">
                  <Car size={16} /> Transporte turístico
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={16} /> Pendiente
                </span>

              </div>

              <button className="mt-4 bg-[#d4663a] text-white px-5 py-2 rounded-lg 
              hover:bg-[#b8542d] hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Detalles
              </button>
            </motion.div>

          </div>
        </div>

        {/* CARDS INFERIORES */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {[
            { icon: Calendar, title: "Nueva Reserva", desc: "Planifica tu próxima aventura" },
            { icon: MapPin, title: "Ver Paquetes", desc: "Explora nuestras ofertas" },
            { icon: Car, title: "Destinos", desc: "Descubre nuevos lugares" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2 }}
              className="group bg-white p-6 rounded-2xl shadow cursor-pointer 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <item.icon
                size={28}
                className="text-[#d4663a] mb-3 group-hover:scale-110 transition"
              />
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-500 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}