//DASBOARD
"use client";

import { Calendar, MapPin, Car, Clock, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f5eee6] flex flex-col">

      <main className="flex-1 px-8 py-10 max-w-7xl mx-auto w-full">

        <h1 className="text-4xl font-bold text-[#2a1810] mb-2">
          Mi Dashboard
        </h1>

        {/* 👇 AQUÍ el cambio */}
        <p className="text-gray-600 mb-8">
          Bienvenido, {user.name}
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* PERFIL */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-[#b86a3c] rounded-full flex items-center justify-center text-white text-3xl">
                👤
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
          </div>

          {/* RESERVAS */}
          <div className="md:col-span-2 space-y-6">

            <h2 className="text-2xl font-bold text-[#2a1810]">
              Mis Reservas
            </h2>

            {/* RESERVA 1 */}
            <div className="bg-white rounded-2xl p-6 shadow border">
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
                <span>👤 2 pax</span>
                <span className="flex items-center gap-1">
                  <Car size={16} /> Camioneta SUV
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> Confirmado
                </span>
              </div>

              <button className="mt-4 bg-[#d4663a] text-white px-5 py-2 rounded-lg">
                Ver Detalles
              </button>
            </div>

            {/* RESERVA 2 */}
            <div className="bg-white rounded-2xl p-6 shadow border">
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
                <span>👤 1 pax</span>
                <span className="flex items-center gap-1">
                  <Car size={16} /> Transporte turístico
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> Pendiente
                </span>
              </div>

              <button className="mt-4 bg-[#d4663a] text-white px-5 py-2 rounded-lg">
                Ver Detalles
              </button>
            </div>

          </div>
        </div>

        {/* CARDS INFERIORES */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-2xl shadow">
            <Calendar size={28} className="text-[#d4663a] mb-3" />
            <h3 className="font-bold">Nueva Reserva</h3>
            <p className="text-gray-500 text-sm">
              Planifica tu próxima aventura
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <MapPin size={28} className="text-[#d4663a] mb-3" />
            <h3 className="font-bold">Ver Paquetes</h3>
            <p className="text-gray-500 text-sm">
              Explora nuestras ofertas
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <Car size={28} className="text-[#d4663a] mb-3" />
            <h3 className="font-bold">Destinos</h3>
            <p className="text-gray-500 text-sm">
              Descubre nuevos lugares
            </p>
          </div>
        </div>

      </main>

    </div>
  );
}