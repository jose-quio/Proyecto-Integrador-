"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Map,
  CalendarCheck,
  Users,
  Truck,
  Settings,
  PanelLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      
      {/* SIDEBAR DESKTOP */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-white sm:flex">
        <nav className="flex flex-col items-center gap-4 py-6">

          {/* LOGO */}
          <Link
            href="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4663a] text-white font-bold"
          >
            A
          </Link>

          <NavItem href="/admin" icon={<Home size={20} />} />
          <NavItem href="/admin/tours" icon={<Map size={20} />} />
          <NavItem href="/admin/reservas" icon={<CalendarCheck size={20} />} />
          <NavItem href="/admin/usuarios" icon={<Users size={20} />} />
          <NavItem href="/admin/proveedores" icon={<Truck size={20} />} />
        </nav>

        {/* SETTINGS */}
        <div className="mt-auto mb-6 flex justify-center">
          <NavItem href="/admin/settings" icon={<Settings size={20} />} />
        </div>
      </aside>

      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 sm:pl-16">
        
        {/* HEADER */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b bg-white px-4">
          
          {/* MOBILE MENU */}
          <MobileNav />

          <h1 className="font-semibold text-sm text-gray-700">
            Panel Administrativo
          </h1>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
        isActive
          ? "bg-[#d4663a] text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
    </Link>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <nav className="flex flex-col gap-4 mt-6 text-sm">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/tours">Tours</Link>
          <Link href="/admin/reservas">Reservas</Link>
          <Link href="/admin/usuarios">Usuarios</Link>
          <Link href="/admin/proveedores">Proveedores</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}