"use client";

import Image from "next/image";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export default function PerfilPage() {
    const { user } = useAuth();
    const profile = useProfile();

    return (
        <div className="font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden selection:bg-primary/30">
            <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-[#0a0a0c] max-w-[430px] mx-auto overflow-hidden pb-32">
                <div className="flex items-center justify-between p-6 pt-12">
                    <button className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight">Mi Camino</h1>
                    <button className="p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">settings</span>
                    </button>
                </div>

                <div className="flex flex-col items-center px-6 mt-4">
                    <div className="relative">
                        <div className="absolute inset-0 shadow-[0_0_40px_10px_rgba(122,49,246,0.4)] rounded-full scale-110"></div>
                        <div className="relative z-10 size-32 rounded-full border-2 border-primary/50 p-1 overflow-hidden bg-background-dark">
                            <Image alt="Avatar" width={200} height={200} className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3G7VayEH6Qb0o0GpQO2REIKC4LFhkMPgux5Z0CO5ef2Oic_3duP_GW9A_1S0KBza6nQljL1pa6LsvgIpyJZGZ8z_94Xo2R5edtm8DU8ihXEGzeLZiOBQTu3LjIyMiX6cesGkpVEJf_34T-uhCC107ls6zrbUU4ZmGMbXRf8hQDqfuISbayhvA-FMyEtBTT_u0mpdKlM-zENf3C526o2yqdcuQcr7JjGRJSBQRDYcO2awMuNRXo6O7umMKbDzVfw8sC6LEW2pObyHq" />
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                            Despierto
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{user?.user_metadata?.full_name || "Buscador de Luz"}</h2>
                        <p className="text-primary font-medium mt-1">Senda de la Iluminación</p>
                        <div className="mt-4 flex gap-2 justify-center">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs text-slate-400">Nivel de Consciencia: {Math.floor(profile.meditationMinutes / 60) + 1}</div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs text-slate-400">Racha: {profile.streak} Días</div>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">Logros Espirituales</h3>
                        <span className="text-primary text-sm font-medium">Ver todos</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center gap-3 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-20">
                                <span className="material-symbols-outlined text-4xl">energy_savings_leaf</span>
                            </div>
                            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(122,49,246,0.6)]">
                                <span className="material-symbols-outlined text-primary text-3xl">self_improvement</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-100">Mente en Calma</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">10 Días Seguidos</p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center gap-3 relative overflow-hidden">
                            <div className="size-16 rounded-full bg-[#ffd700]/10 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                                <span className="material-symbols-outlined text-[#ffd700] text-3xl">favorite</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-100">Corazón Agradecido</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">50 Reflexiones</p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center gap-3 relative overflow-hidden">
                            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(122,49,246,0.6)]">
                                <span className="material-symbols-outlined text-primary text-3xl">all_inclusive</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-100">Presencia Constante</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">Maestro de Presencia</p>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex flex-col items-center text-center gap-3 relative overflow-hidden">
                            <div className="size-16 rounded-full bg-[#ffd700]/10 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]">
                                <span className="material-symbols-outlined text-[#ffd700] text-3xl">dark_mode</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-100">Maestro del Silencio</p>
                                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">24h de Silencio</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-12 mb-12">
                    <h3 className="text-lg font-bold mb-4">Estadísticas del Camino</h3>
                    <div className="space-y-3">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Minutos de Meditación</p>
                                    <p className="text-xs text-slate-500">Tiempo total acumulado</p>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-primary">{profile.meditationMinutes}m</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">Diarios Escritos</p>
                                    <p className="text-xs text-slate-500">Reflexiones guardadas</p>
                                </div>
                            </div>
                            <div className="text-lg font-bold text-primary">{profile.journalEntries}</div>
                        </div>
                    </div>
                </div>

                <BottomNav />
            </div>
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
            </div>
        </div>
    );
}
