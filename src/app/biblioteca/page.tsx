"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

const filters = [
    { label: "Explorar", id: "explorar" },
    { label: "Favoritos", id: "favoritos" },
    { label: "Zen", id: "zen" },
];

const categories = [
    { label: "Iniciación", emoji: "🧘", gradient: "from-indigo-600 to-purple-700" },
    { label: "Cuerpo Luz", emoji: "✨", gradient: "from-violet-600 to-fuchsia-700" },
    { label: "Sueño Profundo", emoji: "🌙", gradient: "from-blue-600 to-cyan-700" },
    { label: "Abundancia", emoji: "💎", gradient: "from-rose-600 to-orange-600" },
];

const newArrivals = [
    {
        title: "Frecuencia de Oro",
        description: "528Hz binaural",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA94bWIIRUnDpsY31afssg52wa9EmwOIP2Mcy0-dYm1LkTJdMPs66Uft01d7L4Qq8EQNwzzQk-9gq81VVWdKD9ZpnUh7tqSZ3wQFlvSx3wef2oW0LLGy6rgOl2NFBpSu67bD9K_RMzAdSFSPX6EdOpN7jtUNPUJ1gGYxcnmqjUdpLGdW_XyATZgKH7FioFTTi77bxJrjN38hS7MBfW_MnJZqVyPUZa6ijoOJ3wsoZYU3go4iG2wQWnulXQUqk8-ZjeP0BAhBq1Wd_Fq",
    },
    {
        title: "Sanación Ancestral",
        description: "Chamánica",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB80eK-bNcrS1zSqZ4NwsHGSaArXpRl1-srstxM09Dvl8PuHMyxGkNmZhAy_p8RHdV5SPdcHOkzE2RzwW53EvgB-gqG5tJJ-H7tm6oHk8tk3GHCAH9zpPWIFE6bHTTR2V1Alp51Y45XUM5dKk7Rj5UWEauQU8v0FZrYDAxvZkt_YHQJNpTp1sjDi-Ki_-L-haTxIm3ruN6OB6pFU8IIkDEnii3hYw9Cba6ud4bU2LYe4kfq6cIIt9IzBWngeVBLkTuODuFPztKGS979",
    },
];

export default function BibliotecaPage() {
    const [activeFilter, setActiveFilter] = useState("explorar");

    return (
        <div className="min-h-screen bg-[#0D0D1A] text-white font-[Manrope] max-w-[430px] mx-auto relative">
            {/* Header */}
            <header className="px-5 pt-12 pb-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-[#854ef4]/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#854ef4] text-[20px]">person</span>
                        </div>
                        <h1 className="font-[Playfair_Display] text-3xl font-bold">Biblioteca</h1>
                    </div>
                    <button className="size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/70 text-[20px]">notifications</span>
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#ad92c9]">search</span>
                    </div>
                    <input
                        className="w-full bg-[#222240] rounded-xl h-12 pl-12 pr-4 text-sm placeholder:text-[#ad92c9]/60 outline-none focus:ring-2 focus:ring-[#854ef4]/40 transition-all"
                        placeholder="Explorar el cosmos interior..."
                        type="text"
                    />
                </div>

                {/* Filter pills */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setActiveFilter(f.id)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                                activeFilter === f.id
                                    ? "bg-[#854ef4] text-white"
                                    : "bg-[#362348] text-[#ad92c9]"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-5 pb-32">
                {/* Featured Card */}
                <section className="mt-4">
                    <Link href="/sonidos" className="relative block rounded-2xl overflow-hidden aspect-[4/5]">
                        <Image
                            width={600}
                            height={750}
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt81yXdVlDXcTs-lQH7CViFa9wdcPG314d9zMhliXVPYwXxTUNk4pFQAMqVkbLs1HSTgSPK7ad1D49MlaHfxn75JS_tGZ3LzmDapmxkJdTvwGnPQUEblrlGEGDC_OKPEBWzaQBN7yOWJ1PYSwGtUBA6BHsq1EgTvfcUxa7Lo6WjM1zTt2kB0lD1traap8UoUyXxn_O9mYPesg9MjDKK0mWGIP4-olurBZqwLVSXoz3JVQlbpKnQwG8OsM-syWBsWHY8tjokG2xW5MN"
                            alt="Conexión Estelar con la Fuente"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-[#854ef4] rounded-full text-xs font-bold uppercase tracking-wider">
                                Destacado
                            </span>
                        </div>
                        <div className="absolute bottom-6 left-5 right-5">
                            <h2 className="font-[Playfair_Display] text-3xl font-bold leading-tight mb-2">
                                Conexión Estelar con la Fuente
                            </h2>
                            <p className="text-sm text-white/70 mb-4">22 min · Avanzado</p>
                            <div className="size-14 rounded-full bg-[#854ef4] flex items-center justify-center shadow-lg shadow-[#854ef4]/50">
                                <span className="material-symbols-outlined text-white text-3xl fill-1">play_arrow</span>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Categories */}
                <section className="mt-8">
                    <h2 className="font-[Playfair_Display] text-xl font-bold mb-4">Categorías</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                className={`h-32 rounded-2xl bg-gradient-to-br ${cat.gradient} flex flex-col items-center justify-center gap-2 transition-transform active:scale-95`}
                            >
                                <span className="text-3xl">{cat.emoji}</span>
                                <span className="text-sm font-semibold">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Nuevas Llegadas */}
                <section className="mt-8">
                    <h2 className="font-[Playfair_Display] text-xl font-bold mb-4">Nuevas Llegadas</h2>
                    <div className="space-y-3">
                        {newArrivals.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
                            >
                                <div className="size-16 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        width={200}
                                        height={200}
                                        className="w-full h-full object-cover"
                                        src={item.image}
                                        alt={item.title}
                                    />
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <h4 className="text-sm font-bold truncate">{item.title}</h4>
                                    <p className="text-xs text-[#ad92c9] mt-0.5">{item.description}</p>
                                </div>
                                <button className="shrink-0 ml-2">
                                    <span className="material-symbols-outlined text-white/40">more_vert</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
