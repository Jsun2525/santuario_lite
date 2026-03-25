"use client";

import Link from "next/link";
import { useJournal } from "@/hooks/useJournal";
import { BottomNav } from "@/components/BottomNav";

const DATE_GRADIENTS = [
    "bg-gradient-to-br from-indigo-500 to-[#8c25f4]",
    "bg-gradient-to-br from-pink-500 to-rose-500",
    "bg-gradient-to-br from-emerald-500 to-teal-500",
];

const MOCK_TAGS = [
    ["gratitud", "calma"],
    ["reflexión", "energía"],
    ["meditación", "sueños"],
    ["intención", "amor"],
];

export default function DiarioPage() {
    const { entries } = useJournal();

    return (
        <div className="min-h-screen bg-[#0D0D1A] text-slate-100 pb-32 overflow-x-hidden">
            {/* Sticky Glass Header */}
            <header className="sticky top-0 z-50 px-5 pt-12 pb-4 border-b border-white/5 bg-[rgba(13,13,26,0.85)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#8c25f4] text-3xl">auto_awesome</span>
                        <h1 className="text-xl font-bold tracking-tight">Diario Espiritual</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-[#8c25f4]/10 px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-[#8c25f4] text-sm">verified_user</span>
                            <span className="text-[11px] text-[#8c25f4] font-medium">Encriptado</span>
                        </div>
                        <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-slate-400 text-xl">settings</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="px-5 py-6 space-y-6">
                {/* AI Insight Card */}
                <section className="relative bg-[#151528] border border-[#D4AF37]/20 rounded-2xl p-6 overflow-hidden">
                    {/* Decorative blur orbs */}
                    <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-[#8c25f4]/30 blur-[60px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-[-20px] left-[-20px] w-28 h-28 bg-[#D4AF37]/20 blur-[50px] rounded-full pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                        <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.15em]">
                            Cristal de Sabiduría
                        </p>
                        <h2 className="text-2xl font-extrabold text-[#D4AF37]">
                            Tu Esencia Semanal
                        </h2>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            Tus reflexiones revelan un patrón de crecimiento interior y conexión profunda con tu propósito. La calma que cultivas se expande cada día.
                        </p>
                        <Link
                            href="/oraculo"
                            className="inline-flex items-center gap-2 bg-[#8c25f4] text-white text-sm font-semibold px-5 py-2.5 rounded-xl mt-2 hover:opacity-90 transition-opacity active:scale-95"
                        >
                            Ver Análisis Detallado
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </section>

                {/* Entries Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-bold px-1">Tus Reflexiones</h3>

                    <div className="space-y-3">
                        {entries.length === 0 ? (
                            <div className="text-center text-slate-500 py-12">
                                <span className="material-symbols-outlined text-4xl mb-3 block">ink_pen</span>
                                <p className="text-sm">Aún no hay entradas en tu diario.</p>
                                <p className="text-xs mt-1 text-slate-600">Presiona el botón + para empezar a escribir.</p>
                            </div>
                        ) : (
                            entries.map((entry, index) => {
                                const date = new Date(entry.created_at);
                                const monthName = date.toLocaleString("es-ES", { month: "short" }).toUpperCase();
                                const day = date.getDate();
                                const gradient = DATE_GRADIENTS[index % DATE_GRADIENTS.length];
                                const tags = MOCK_TAGS[index % MOCK_TAGS.length];

                                return (
                                    <div
                                        key={entry.id}
                                        className="bg-[#151528] border border-slate-800/50 rounded-xl p-4 flex gap-4 hover:border-[#8c25f4]/40 transition-colors cursor-pointer group"
                                    >
                                        {/* Date Badge */}
                                        <div className={`flex flex-col items-center justify-center w-14 h-14 min-w-[56px] rounded-lg ${gradient} shrink-0`}>
                                            <span className="text-[10px] font-bold uppercase text-white/90 leading-none">{monthName}</span>
                                            <span className="text-xl font-extrabold text-white leading-tight">{day}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 space-y-1.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-bold text-sm group-hover:text-[#8c25f4] transition-colors truncate">
                                                    {entry.mood ? `Entrada · ${entry.mood}` : "Entrada"}
                                                </h4>
                                                <span className="material-symbols-outlined text-slate-600 text-sm shrink-0">lock</span>
                                            </div>
                                            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                                {entry.content}
                                            </p>
                                            <div className="flex gap-1.5 flex-wrap">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-slate-800 rounded text-[10px] uppercase text-slate-400 font-medium"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>

            {/* FAB */}
            <Link
                href="/diario/nuevo"
                className="fixed bottom-28 right-6 w-16 h-16 bg-[#8c25f4] rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(140,37,244,0.4)] active:scale-90 transition-transform z-40"
            >
                <span className="material-symbols-outlined text-4xl">add</span>
            </Link>

            <BottomNav />
        </div>
    );
}
