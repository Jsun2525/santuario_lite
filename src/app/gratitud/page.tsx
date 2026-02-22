"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useJournal } from "@/hooks/useJournal";
import { useProfile } from "@/hooks/useProfile";

export default function GratitudPage() {
    const [content, setContent] = useState("");
    const router = useRouter();
    const { user } = useAuth();
    const { saveEntry } = useJournal();
    const profile = useProfile();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !user) return;

        // Save entry and navigate back to journal
        await saveEntry(content);
        router.push("/diario");
    };

    return (
        <div className="bg-background-light dark:bg-[#0a070e] font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden relative selection:bg-primary/30">
            {/* Mystic Background Orbs */}
            <div className="absolute top-[-50px] left-[-100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(125,48,248,0.1)_0%,rgba(125,48,248,0)_70%)] blur-[40px] -z-10"></div>
            <div className="absolute bottom-[100px] right-[-100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(125,48,248,0.1)_0%,rgba(125,48,248,0)_70%)] blur-[40px] opacity-60 -z-10"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(125,48,248,0.15)_0%,rgba(10,7,14,0)_60%)] pointer-events-none"></div>
            <img alt="Nebula" className="fixed inset-0 w-full h-full object-cover opacity-10 mix-blend-screen pointer-events-none" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_PnDSwn67PMp9nSdkiiHc_iiWAKYNqBCK-GLw-Ahs7qDAZKTqQigkxUVkbp2luJXp8ygwe1bp2iBIMmjivL0rwBXNSE0vYHbIcIkQ0l8Ng3iPHvfxZR0Hx3rBZKCYoKeFdd3RCl6YlMRG18m9sMrMVW_BUrQSJ9AybiXOgJT1DZnHvqrDCBmNltRrnF2TOe_0UAzbKW-Q6nf81cvsUfI9SJQ3SSYfN9oRPrOJXEsDLf5WvmRojvfn8sVaIv9SWZFaLFYfpuYg2wdX" />

            <header className="flex items-center justify-between p-6 pt-12 relative z-10">
                <Link href="/" className="size-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-slate-100">arrow_back_ios_new</span>
                </Link>
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Santuario de Bienestar</span>
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-100">Racha de Gratitud</h1>
                </div>
                <button className="size-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-slate-100">settings</span>
                </button>
            </header>

            <main className="flex-1 px-6 pb-32 relative z-10 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/5 backdrop-blur-md border border-primary/20 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
                        <span className="text-primary material-symbols-outlined text-3xl mb-1">local_fire_department</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Racha Actual</p>
                        <p className="text-3xl font-extrabold text-white">{profile.streak} <span className="text-sm font-light text-slate-400">días</span></p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-1">
                        <span className="text-primary/60 material-symbols-outlined text-3xl mb-1">auto_awesome</span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Diarios</p>
                        <p className="text-3xl font-extrabold text-white">{profile.journalEntries} <span className="text-sm font-light text-slate-400">entradas</span></p>
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-2 mt-6 mb-8 px-4 py-2.5 rounded-full bg-primary/5 border border-primary/10 w-fit mx-auto">
                    <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                    <p className="text-[12px] text-slate-300 font-medium italic">Periodo de gracia de 24h activo para tu paz mental.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-[0.1em]">Tu santuario hoy</h3>
                        <span className="text-[11px] text-primary/80 font-medium">Auto-guardado activo</span>
                    </div>

                    <div className="relative group mt-2">
                        <div className="absolute -inset-0.5 bg-primary/20 rounded-xl blur opacity-30 group-focus-within:opacity-100 transition duration-1000"></div>
                        <div className="relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full min-h-[250px] bg-[rgba(125,48,248,0.05)] backdrop-blur-md border border-white/5 rounded-xl p-6 text-slate-100 placeholder:text-slate-500 text-lg leading-relaxed focus:ring-1 focus:ring-primary/50 focus:border-primary/50 resize-none transition-all outline-none"
                                placeholder="¿Por qué estás agradecido hoy? Deja que tu alma se exprese..."
                            ></textarea>
                            <div className="absolute bottom-4 right-4 flex space-x-2">
                                <button className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">mic</span>
                                </button>
                                <button className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-xl">palette</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-full shadow-[0_4px_14px_0_rgba(125,48,248,0.25)] transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:shadow-none"
                    >
                        <span className="material-symbols-outlined">auto_fix_high</span>
                        <span className="text-lg tracking-wide uppercase font-extrabold">Guardar Entendimiento</span>
                    </button>
                    <p className="text-center text-slate-500 text-[11px] mt-4 font-light uppercase tracking-widest">
                        Cada entrada es una semilla en tu jardín espiritual.
                    </p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
