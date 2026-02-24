"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJournal } from "@/hooks/useJournal";
import { BottomNav } from "@/components/BottomNav";

export default function DiarioPage() {
    const { entries } = useJournal();
    const router = useRouter();

    const handleGenerateInsight = () => {
        router.push("/oraculo");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen pb-32 overflow-x-hidden selection:bg-primary/30">
            <header className="sticky top-0 z-50 px-6 pt-12 pb-4 border-b border-white/5 bg-[rgba(23,15,35,0.8)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-full">
                            <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Tu Oráculo Interior</h1>
                    </div>
                </div>
            </header>

            <main className="px-5 py-6 space-y-8 bg-[radial-gradient(circle_at_50%_50%,rgba(125,48,248,0.15)_0%,rgba(23,15,35,0)_70%)]">

                <section className="space-y-4">
                    <button
                        onClick={handleGenerateInsight}
                        disabled={entries.length === 0}
                        className="w-full flex items-center justify-center gap-3 bg-primary py-4 px-6 rounded-xl text-white font-bold text-lg shadow-[0_0_30px_5px_rgba(125,48,248,0.4)] hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:shadow-none"
                    >
                        <span className="material-symbols-outlined">psychology</span>
                        {entries.length > 0 ? "Generar Insights con IA" : "Escribe para Generar Insights"}
                    </button>

                    {entries.length > 0 && (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-primary font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">colors_spark</span>
                                    Recordatorio
                                </h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                Tienes {entries.length} reflexiones documentadas. El oráculo de IA está listo para analizar tus patrones y ofrecerte sabiduría.
                            </p>
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 italic">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">lock</span> Encriptado localmente
                                </span>
                            </div>
                        </div>
                    )}
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-lg font-bold">Tus Reflexiones</h3>
                    </div>

                    <div className="space-y-3">
                        {entries.length === 0 ? (
                            <div className="text-center text-slate-500 py-10 opacity-70">
                                <span className="material-symbols-outlined text-4xl mb-2">ink_pen</span>
                                <p className="text-sm">Aún no hay entradas en tu diario.</p>
                                <p className="text-xs mt-1">Presiona el botón + para empezar a escribir.</p>
                            </div>
                        ) : (
                            entries.map(entry => {
                                const date = new Date(entry.created_at);
                                const monthName = date.toLocaleString('es-ES', { month: 'short' });
                                const dayName = date.getDate();
                                return (
                                    <div key={entry.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex gap-4 hover:border-primary/50 transition-colors cursor-pointer group">
                                        <div className="flex flex-col items-center justify-center min-w-[50px] bg-white/5 rounded-lg py-2 h-fit">
                                            <span className="text-xs font-bold uppercase text-slate-400">{monthName}</span>
                                            <span className="text-xl font-black text-white">{dayName}</span>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold group-hover:text-primary transition-colors">Entrada</h4>
                                                <span className="material-symbols-outlined text-primary text-sm fill-[1]">auto_stories</span>
                                            </div>
                                            <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                                {entry.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>

            {/* Add Entry FAB */}
            <Link
                href="/diario/nuevo"
                className="fixed bottom-28 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(125,48,248,0.4)] active:scale-90 transition-transform z-40"
            >
                <span className="material-symbols-outlined text-3xl font-bold">edit</span>
            </Link>

            {/* Nav Background Blobs */}
            <div className="fixed top-[-10%] left-[-10%] w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            <BottomNav />
        </div>
    );
}
