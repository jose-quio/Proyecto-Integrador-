"use client";

import {
    Car,
    UserCheck,
    MapPin,
    Phone,
    Mail,
    User,
    Calendar,
    Users
} from "lucide-react";

export default function ReservarPage() {
    return (
        <div className="bg-[#f5efe9] min-h-screen py-16 px-6 animate-fadeIn">

            {/* TITULO */}
            <div className="text-center mb-12 animate-slideUp">
                <h1 className="text-4xl font-bold text-[#3b1f0f]">
                    Cotiza y Reserva tu Viaje
                </h1>
                <p className="text-gray-600 mt-2">
                    Completa el formulario y nos pondremos en contacto contigo
                </p>
            </div>

            {/* CONTENIDO */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500">

                {/* IZQUIERDA */}
                <div className="bg-[#c7663c] text-white p-10 flex flex-col justify-between">

                    <div>
                        <h2 className="text-2xl font-bold mb-8">
                            ¿Por qué reservar con nosotros?
                        </h2>

                        <ul className="space-y-6">

                            <li className="flex items-start gap-4 group">
                                <div className="bg-white/20 p-3 rounded-full transition group-hover:scale-110 group-hover:rotate-6">
                                    <Car size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold">Transporte Premium</p>
                                    <p className="text-sm opacity-80">
                                        Vehículos modernos y cómodos para tu viaje
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-4 group">
                                <div className="bg-white/20 p-3 rounded-full transition group-hover:scale-110 group-hover:rotate-6">
                                    <UserCheck size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold">Guías Expertos</p>
                                    <p className="text-sm opacity-80">
                                        Personal bilingüe con amplia experiencia
                                    </p>
                                </div>
                            </li>

                            <li className="flex items-start gap-4 group">
                                <div className="bg-white/20 p-3 rounded-full transition group-hover:scale-110 group-hover:rotate-6">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold">Mejor Precio</p>
                                    <p className="text-sm opacity-80">
                                        Sin intermediarios, tarifas directas
                                    </p>
                                </div>
                            </li>

                        </ul>
                    </div>

                    {/* CONTACTO */}
                    <div className="mt-10 bg-white/20 p-5 rounded-xl space-y-3 backdrop-blur-sm hover:bg-white/30 transition">
                        <p className="font-semibold text-lg">¿Necesitas ayuda?</p>

                        <div className="flex items-center gap-2 text-sm">
                            <Phone size={16} />
                            <span>+51 954 123 456</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Mail size={16} />
                            <span>info@arequipatours.pe</span>
                        </div>
                    </div>
                </div>

                {/* DERECHA */}
                <div className="bg-white p-10">
                    <form className="space-y-5">

                        {/* MENSAJE */}
                        <div className="bg-[#f5efe9] text-sm p-3 rounded-lg animate-pulse">
                            💡 Inicia sesión para una experiencia más rápida
                        </div>

                        {/* NOMBRE + EMAIL */}
                        <div className="grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="text-sm font-medium">Nombre Completo</label>
                                <div className="relative mt-1 group">
                                    <User size={18} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#c7663c] transition" />
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[#c7663c] outline-none transition duration-300 transform focus:scale-105 focus:shadow-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Email</label>
                                <div className="relative mt-1 group">
                                    <Mail size={18} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#c7663c] transition" />
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[#c7663c] outline-none transition duration-300 transform focus:scale-105 focus:shadow-lg"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* TELEFONO */}
                        <div>
                            <label className="text-sm font-medium">Teléfono</label>
                            <div className="relative mt-1 group">
                                <Phone size={18} className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#c7663c]" />
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[#c7663c] outline-none transition transform focus:scale-105 focus:shadow-lg"
                                />
                            </div>
                        </div>

                        {/* DESTINO */}
                        <div>
                            <label className="text-sm font-medium">Destino Principal</label>
                            <div className="relative mt-1">
                                <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                                <select className="w-full border border-gray-300 p-3 pl-10 rounded-lg hover:border-[#c7663c] transition">
                                    <option>Selecciona un destino</option>
                                </select>
                            </div>
                        </div>

                        {/* PAQUETE */}
                        <div>
                            <label className="text-sm font-medium">Paquete Turístico</label>
                            <select className="w-full border border-gray-300 p-3 rounded-lg mt-1 hover:border-[#c7663c] transition">
                                <option>Selecciona un paquete</option>
                            </select>
                        </div>

                        {/* FECHA + PASAJEROS */}
                        <div className="grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="text-sm font-medium">Fecha de Viaje</label>
                                <div className="relative mt-1">
                                    <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full border border-gray-300 p-3 pl-10 rounded-lg focus:ring-2 focus:ring-[#c7663c] transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium">Pasajeros</label>
                                <div className="relative mt-1">
                                    <Users size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <select className="w-full border border-gray-300 p-3 pl-10 rounded-lg hover:border-[#c7663c] transition">
                                        <option>1 persona</option>
                                        <option>2 personas</option>
                                        <option>3 personas</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        {/* VEHICULO */}
                        <div>
                            <label className="text-sm font-medium">Tipo de Vehículo</label>
                            <div className="relative mt-1">
                                <Car size={18} className="absolute left-3 top-3 text-gray-400" />
                                <select className="w-full border border-gray-300 p-3 pl-10 rounded-lg hover:border-[#c7663c] transition">
                                    <option>Selecciona un vehículo</option>
                                </select>
                            </div>
                        </div>

                        {/* MENSAJE */}
                        <div>
                            <label className="text-sm font-medium">Mensaje Adicional</label>
                            <textarea
                                placeholder="Cuéntanos sobre tus preferencias, necesidades especiales, etc."
                                className="w-full border border-gray-300 p-3 rounded-lg h-24 mt-1 resize-none focus:ring-2 focus:ring-[#c7663c] transition"
                            ></textarea>
                        </div>

                        {/* BOTON */}
                        <button className="w-full bg-[#c7663c] hover:bg-[#a9552f] transition text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-2xl transform hover:-translate-y-1 active:scale-95">
                            Enviar Solicitud de Reserva
                        </button>

                    </form>

                </div>

            </div>

            {/* MENSAJE INFORMATIVO */}
            <p className="text-sm text-gray-600 mt-3 text-center">
                Al enviar este formulario, nos pondremos en contacto contigo en menos de 24 horas para confirmar tu reserva y coordinar los detalles del pago.
            </p>
        </div>
    );
}