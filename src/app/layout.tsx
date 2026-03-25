import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import PwaRegister from "@/components/PwaRegister";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Inner Path | Santuario de Bienestar",
  description: "Herramienta de práctica diaria exclusiva para la comunidad de Skool Santuario de Bienestar.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Inner Path",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <PwaRegister />
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-aurora mix-blend-screen" />
          <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-accent/10 blur-[100px] rounded-full animate-aurora mix-blend-screen" style={{ animationDelay: '2s' }} />
        </div>
        <main className="relative z-10 min-h-screen flex flex-col pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
