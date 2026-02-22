"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJournal } from "@/hooks/useJournal";

export default function OraculoPage() {
    const { insight, isGeneratingInsight, generateAIInsight } = useJournal();
    const router = useRouter();
    const generatedRef = useRef(false);

    useEffect(() => {
        // Only generate once per mount if we don't have an insight or if we explicitly came to generate
        if (!generatedRef.current && !isGeneratingInsight && !insight) {
            generatedRef.current = true;
            generateAIInsight();
        }
    }, [insight, isGeneratingInsight, generateAIInsight]);

    return (
        <div className="font-display text-slate-100 bg-[#120D1A] min-h-screen selection:bg-[#F4C025]/30">
            {/* Background Animations */}
            <div className="fixed top-0 left-0 w-full h-full z-0 opacity-60 bg-[radial-gradient(circle_at_20%_30%,rgba(139,92,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15)_0%,transparent_50%)]"></div>
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 size-1 bg-[#F4C025]/30 rounded-full blur-[1px]"></div>
                <div className="absolute top-2/3 right-1/3 size-2 bg-indigo-500/20 rounded-full blur-[2px]"></div>
                <div className="absolute bottom-1/4 right-1/4 size-1 bg-white/20 rounded-full blur-[1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120D1A]/20 to-[#120D1A]"></div>
            </div>

            <div className="relative z-10 flex h-screen w-full flex-col max-w-[430px] mx-auto overflow-hidden">
                <header className="flex items-center justify-between px-6 pt-14 pb-4 shrink-0">
                    <button onClick={() => router.back()} className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-90">
                        <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                    </button>
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#F4C025]/80 font-bold">Inner Path</p>
                        <h1 className="text-lg font-bold tracking-tight text-white">Santuario</h1>
                    </div>
                    <button className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-90">
                        <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                </header>

                <main className="flex-1 flex flex-col items-center px-6 pt-4 overflow-y-auto scrollbar-hide pb-32">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-tight">
                            El Oráculo Dice
                        </h2>
                        {isGeneratingInsight ? (
                            <p className="text-[#F4C025]/60 text-sm mt-1 italic animate-pulse">Sintonizando tu frecuencia actual...</p>
                        ) : (
                            <p className="text-[#F4C025]/60 text-sm mt-1 italic">Revelación Completada</p>
                        )}
                    </div>

                    <div className="relative w-full group">
                        <div className={`absolute -inset-1 bg-[#F4C025]/10 rounded-xl blur-2xl transition-all duration-1000 ${isGeneratingInsight ? 'animate-pulse scale-105' : ''}`}></div>
                        <div className="relative bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[#F4C025]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_0_15px_rgba(244,192,37,0.05)] rounded-xl p-8 flex flex-col items-center text-center space-y-6">

                            <div className={`size-16 rounded-full bg-gradient-to-tr from-[#F4C025]/20 to-[#F4C025]/40 border border-[#F4C025]/50 flex items-center justify-center shadow-inner transition-transform duration-1000 ${isGeneratingInsight ? 'animate-spin' : ''}`}>
                                <span className={`material-symbols-outlined text-[#F4C025] text-3xl ${isGeneratingInsight ? '' : 'animate-bounce'}`}>auto_awesome</span>
                            </div>

                            <div className="space-y-4">
                                <p className="text-white/60 uppercase text-[10px] tracking-widest font-bold">Mensaje Canalizado</p>

                                {isGeneratingInsight ? (
                                    <div className="space-y-4 flex flex-col items-center">
                                        <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                                        <div className="h-4 bg-white/10 rounded w-full animate-pulse"></div>
                                        <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse"></div>
                                    </div>
                                ) : (
                                    <p className="text-xl md:text-2xl font-light leading-relaxed text-slate-100 italic">
                                        "{insight || "El universo está en silencio hoy. Sigue observando."}"
                                    </p>
                                )}

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-xs text-[#F4C025]/70 font-medium">Análisis de diario con Inteligencia Artificial</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isGeneratingInsight && (
                        <div className="w-full grid grid-cols-3 gap-4 mt-10 animate-fade-in">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="size-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center backdrop-blur-md relative">
                                    <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-md"></div>
                                    <span className="material-symbols-outlined text-indigo-400">favorite</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Emoción</p>
                                    <p className="text-xs text-white/80 font-medium">Serenidad</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center space-y-3">
                                <div className="size-20 -mt-2 rounded-full bg-[#F4C025]/20 border border-[#F4C025]/40 flex items-center justify-center backdrop-blur-md relative shadow-[0_0_30px_rgba(244,192,37,0.4)]">
                                    <div className="absolute inset-0 bg-[#F4C025]/10 rounded-full blur-xl"></div>
                                    <span className="material-symbols-outlined text-[#F4C025] text-3xl">wb_sunny</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-[#F4C025] uppercase font-bold tracking-tighter">Patrón de Luz</p>
                                    <p className="text-xs text-white font-medium">Resiliencia</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center space-y-3">
                                <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-md relative">
                                    <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-md"></div>
                                    <span className="material-symbols-outlined text-emerald-400">explore</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Guía</p>
                                    <p className="text-xs text-white/80 font-medium">Paciencia</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full mt-10 mb-8">
                        <button
                            onClick={generateAIInsight}
                            disabled={isGeneratingInsight}
                            className="w-full h-14 rounded-full bg-[#F4C025] text-[#120D1A] font-bold text-base shadow-[0_0_20px_rgba(244,192,37,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none"
                        >
                            <span className="material-symbols-outlined">magic_exchange</span>
                            Nuevas Revelaciones
                        </button>
                    </div>
                </main>

                <footer className="absolute bottom-0 left-0 w-full p-4 pb-10 bg-gradient-to-t from-[#120D1A] via-[#120D1A]/90 to-transparent">
                    <nav className="flex w-full items-center justify-between px-2 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl">
                        <Link href="/" className="flex flex-1 flex-col items-center justify-center py-1 text-white/40 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">home</span>
                        </Link>
                        <Link href="/japamala" className="flex flex-1 flex-col items-center justify-center py-1 text-white/40 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">self_improvement</span>
                        </Link>
                        <Link href="/diario" className="flex flex-1 flex-col items-center justify-center py-1 text-[#F4C025] relative">
                            <div className="relative filter drop-shadow-[0_0_8px_rgba(244,192,37,0.6)]">
                                <span className="material-symbols-outlined text-[28px] fill-[1]">auto_awesome</span>
                                <div className="absolute -top-1 -right-1 size-1.5 bg-[#F4C025] rounded-full shadow-[0_0_8px_#F4C025]"></div>
                            </div>
                            <div className="absolute -bottom-1 w-1 h-1 bg-[#F4C025] rounded-full"></div>
                        </Link>
                        <Link href="/biblioteca" className="flex flex-1 flex-col items-center justify-center py-1 text-white/40 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">local_library</span>
                        </Link>
                        <Link href="/perfil" className="flex flex-1 flex-col items-center justify-center py-1 text-white/40 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[24px]">person</span>
                        </Link>
                    </nav>
                </footer>
            </div>
        </div>
    );
}
