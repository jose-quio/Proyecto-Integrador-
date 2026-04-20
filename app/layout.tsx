import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AqpGo - Tours en Arequipa",
  description: "Explora Arequipa con los mejores tours y experiencias únicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white">
        
        {/* NAVBAR */}
        <Navigation />

        {/* CONTENIDO */}
        <main className="flex-1">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}