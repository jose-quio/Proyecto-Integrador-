"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#0f0f0f]">

      {/* ── FORMULARIO LOGIN ─────────────────────────── */}
      <div
        className={`
          absolute top-0 left-0 w-full lg:w-1/2 h-full z-20
          flex flex-col justify-center
          px-8 sm:px-14 lg:px-16 pb-16 lg:pb-0
          bg-[#0f0f0f]
          transition-all duration-700 ease-in-out
          ${isRegister
            ? "opacity-0 pointer-events-none lg:-translate-x-full"
            : "opacity-100 pointer-events-auto lg:translate-x-0"}
        `}
      >
        <Logo />
        <div className="mb-6 mt-5">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Bienvenido<br />
            <span className="text-amber-400">de vuelta.</span>
          </h1>
          <p className="mt-3 text-white/50 text-sm">Inicia sesión para continuar explorando Arequipa.</p>
        </div>

        <div className="space-y-4">
          <Field label="Correo electrónico" type="email" placeholder="tu@correo.com" />
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">Contraseña</span>
              <button className="text-xs text-amber-400/80 hover:text-amber-400 transition-colors">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            Ingresar
          </button>
        </div>

        <Divider text="O continúa con" />
        <GoogleBtn />

        {/* Mobile toggle */}
        <p className="mt-6 text-center text-white/40 text-sm lg:hidden">
          ¿Aún no tienes cuenta?{" "}
          <button onClick={() => setIsRegister(true)} className="text-amber-400 font-semibold">
            Crear cuenta
          </button>
        </p>
      </div>

      {/* ── FORMULARIO REGISTER ──────────────────────── */}
      <div
        className={`
          absolute top-0 left-0 lg:left-1/2 w-full lg:w-1/2 h-full z-20
          flex flex-col justify-center
          px-8 sm:px-14 lg:px-16 pb-16 lg:pb-0
          bg-[#0f0f0f]
          transition-all duration-700 ease-in-out
          ${isRegister
            ? "opacity-100 pointer-events-auto lg:translate-x-0"
            : "opacity-0 pointer-events-none lg:translate-x-full"}
        `}
      >
        <Logo />
        <div className="mb-4 mt-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Crea tu<br />
            <span className="text-amber-400">cuenta.</span>
          </h1>
          <p className="mt-2 text-white/50 text-sm">Completa el formulario para comenzar tu aventura.</p>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre" type="text" placeholder="Juan Pérez" />
            <Field label="Correo" type="email" placeholder="tu@correo.com" />
          </div>
          <Field label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" />
          <Field label="Confirmar contraseña" type="password" placeholder="Repite tu contraseña" />

          <label className="flex items-start gap-3 cursor-pointer group pt-0.5">
            <div className="mt-0.5 w-4 h-4 rounded border border-white/20 bg-white/5 flex-shrink-0 group-hover:border-amber-400/50 transition-colors" />
            <span className="text-white/40 text-xs leading-relaxed">
              Acepto los{" "}
              <Link href="/terms" className="text-amber-400/80 hover:text-amber-400">Términos</Link>
              {" "}y la{" "}
              <Link href="/privacy" className="text-amber-400/80 hover:text-amber-400">Política de privacidad</Link>
            </span>
          </label>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl transition-all duration-200 text-sm tracking-wide shadow-lg shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99]"
          >
            Crear cuenta
          </button>
        </div>

        <Divider text="O regístrate con" />
        <GoogleBtn />

        {/* Mobile toggle */}
        <p className="mt-4 text-center text-white/40 text-sm lg:hidden">
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => setIsRegister(false)} className="text-amber-400 font-semibold">
            Iniciar sesión
          </button>
        </p>
      </div>

      {/* ── PANEL IMAGEN DESLIZANTE (solo desktop) ───── */}
      <div
        className={`
          hidden lg:block
          absolute top-0 h-full w-1/2 z-30
          transition-all duration-700 ease-in-out
        `}
        style={{
          left: isRegister ? "0%" : "50%",
          borderRadius: isRegister ? "0 100px 80px 0" : "100px 0 0 80px",
          transition: "left 0.7s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.7s ease-in-out",
          overflow: "hidden",
        }}
      >
        {/* Imagen de fondo */}
        <Image
          src="/arequipa.jpg"
          alt="Arequipa Ciudad Blanca"
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            isRegister
              ? "bg-gradient-to-r from-[#0f0f0f]/50 via-transparent to-transparent"
              : "bg-gradient-to-l from-[#0f0f0f]/50 via-transparent to-transparent"
          }`}
        />

        {/* Contenido del panel */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-10 text-center">
          <div className="mb-6 bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4">
            <p className="text-amber-400 font-bold text-2xl leading-none">
              {isRegister ? "4.9 ★" : "+500"}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {isRegister ? "Valoración promedio" : "Tours realizados"}
            </p>
          </div>

          <h2 className="text-white text-3xl font-bold leading-snug drop-shadow-xl">
            {isRegister ? "¡Hola, amigo!" : "¡Bienvenido de vuelta!"}
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-[240px] leading-relaxed">
            {isRegister
              ? "Ingresa tus datos para disfrutar de los mejores tours en Arequipa."
              : "Regístrate y empieza a explorar la Ciudad Blanca con nosotros."}
          </p>

          <button
            onClick={() => setIsRegister(!isRegister)}
            className="mt-8 px-8 py-2.5 border-2 border-white/80 text-white font-bold text-sm rounded-xl hover:bg-white hover:text-black transition-all duration-300 tracking-wide backdrop-blur-sm"
          >
            {isRegister ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </div>
      </div>

      {/* ── BARRA INFERIOR MOBILE ────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f0f0f]/95 backdrop-blur border-t border-white/10 px-6 py-3 flex justify-center gap-6">
        <button
          onClick={() => setIsRegister(false)}
          className={`text-sm font-semibold pb-1 transition-all border-b-2 ${
            !isRegister ? "text-amber-400 border-amber-400" : "text-white/30 border-transparent"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setIsRegister(true)}
          className={`text-sm font-semibold pb-1 transition-all border-b-2 ${
            isRegister ? "text-amber-400 border-amber-400" : "text-white/30 border-transparent"
          }`}
        >
          Crear cuenta
        </button>
      </div>

    </div>
  );
}

/* ── COMPONENTES AUXILIARES ─────────────────────────────────────── */

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
        <Image src="/logo.svg" alt="AQP GO" width={44} height={44} className="object-cover w-full h-full" />
      </div>
      <div>
        <p className="text-white font-bold text-base leading-none tracking-wide">AQP GO</p>
        <p className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-medium">Tours & Travels</p>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-amber-400/50 transition-all duration-200"
      />
    </div>
  );
}

function Divider({ text }: { text: string }) {
  return (
    <div className="my-4 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-white/30 text-xs">{text}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function GoogleBtn() {
  return (
    <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-2.5 transition-all duration-200 group">
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span className="text-white/60 text-xs font-medium group-hover:text-white/90 transition-colors">
        Continuar con Google
      </span>
    </button>
  );
}