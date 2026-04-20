"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Lógica de registro aquí
    router.push("/");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#0f0f0f]">

      {/* Panel izquierdo - Imagen (ahora a la izquierda en register) */}
      <div className="hidden lg:block lg:w-[45%] relative order-1">
        <Image
          src="/arequipa.jpg"
          alt="Arequipa Ciudad Blanca"
          fill
          sizes="55vw"
          className="object-cover"
          priority
        />
        {/* Overlay gradiente (de derecha a izquierda, invertido) */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Texto sobre la imagen */}
        <div className="absolute bottom-12 left-10 max-w-xs">
          <p className="text-white/90 text-2xl font-bold leading-snug drop-shadow-xl">
            Únete a nuestra comunidad
          </p>
          <p className="text-white/50 text-sm mt-2 drop-shadow">
            Reserva tours, guarda favoritos y vive Arequipa al máximo.
          </p>
        </div>

        {/* Badge decorativo */}
        <div className="absolute top-10 left-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
          <p className="text-amber-400 font-bold text-lg leading-none">4.9 ★</p>
          <p className="text-white/50 text-xs mt-1">Valoración promedio</p>
        </div>
      </div>

      {/* Panel derecho - Formulario (ahora a la derecha en register) */}
      <div className="relative z-10 flex flex-col justify-center max-h-screen overflow-hidden w-full lg:w-[55%] sm:px-10 lg:px-16 py-4 py-6 bg-[#0f0f0f] order-2">

        {/* Logo */}
        <div className="mb-0">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <Image
                src="/logo.svg"
                alt="Arequipa Tours Logo"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none tracking-wide">AQP GO</p>
              <p className="text-amber-400 text-xs tracking-[0.3em] uppercase font-medium">Tours & Travels</p>
            </div>
          </div>
        </div>

        {/* Encabezado */}
        <div className="mb-2 text-right">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Crea tu<br />
            <span className="text-amber-400">cuenta.</span>
          </h1>
          <p className="mt-3 text-white/50 text-sm">Completa el formulario para comenzar tu aventura.</p>
        </div>

        {/* Formulario */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Pérez"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repite tu contraseña"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 focus:bg-white/8 transition-all duration-200"
            />
          </div>

          {/* Términos */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5 w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/50 transition-colors">
              <input type="checkbox" className="sr-only" />
            </div>
            <span className="text-white/40 text-xs leading-relaxed">
              Acepto los{" "}
              <Link href="/terms" className="text-amber-400/80 hover:text-amber-400 transition-colors">
                Términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link href="/privacy" className="text-amber-400/80 hover:text-amber-400 transition-colors">
                Política de privacidad
              </Link>
            </span>
          </label>

          <button
            onClick={handleSubmit}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-2.5 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99]"
          >
            Crear cuenta
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs">O regístrate con</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 transition-all duration-200 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors">Google</span>
          </button>
        </div>

        {/* Volver a login */}
        <p className="mt-4 text-center text-white/40 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}