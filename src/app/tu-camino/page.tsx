"use client";

import { usePracticePath, PathStep } from "@/hooks/usePracticePath";
import { PracticePath } from "@/components/PracticePath";
import { BottomNav } from "@/components/BottomNav";
import Link from "next/link";
import { useState } from "react";

export default function TuCaminoPage() {
    const { steps, loading, completeStep } = usePracticePath();
    const [selectedStep, setSelectedStep] = useState<PathStep | null>(null);

    const handleStepClick = (step: PathStep) => {
        setSelectedStep(step);
    };

    const handleComplete = async () => {
        if (!selectedStep) return;
        await completeStep(selectedStep.id);
        setSelectedStep(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 glass backdrop-blur-md border-b border-white/5">
                <div className="max-w-md mx-auto flex items-center gap-4">
                    <Link href="/" className="w-10 h-10 rounded-full glass flex items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="text-xl font-serif font-bold">Tu Camino</h1>
                        <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Progreso Sagrado</p>
                    </div>
                </div>
            </header>

            <main className="pt-28 pb-32">
                <div className="max-w-md mx-auto px-6">
                    <div className="text-center mb-8">
                        <p className="text-sm text-slate-400 font-light italic">
                            "Cada paso es una meta, y cada meta un nuevo comienzo."
                        </p>
                    </div>

                    <PracticePath steps={steps} onStepClick={handleStepClick} />
                </div>
            </main>

            {/* Modal for step details */}
            {selectedStep && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="w-full max-w-md glass-card p-8 rounded-3xl animate-in slide-in-from-bottom-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-1 block">
                                    {selectedStep.type === 'class' ? 'Lección' : 'Sesión de Práctica'}
                                </span>
                                <h2 className="text-2xl font-serif font-bold">{selectedStep.title}</h2>
                            </div>
                            <button onClick={() => setSelectedStep(null)} className="text-slate-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed mb-8">
                            {selectedStep.description || "Esta sesión te ayudará a profundizar en tu autoconocimiento y conexión espiritual."}
                        </p>

                        {selectedStep.status === 'completed' ? (
                            <div className="w-full py-4 bg-success/10 border border-success/30 rounded-2xl flex items-center justify-center gap-2 text-success font-bold">
                                <span className="material-symbols-outlined">check_circle</span>
                                COMPLETADO
                            </div>
                        ) : (
                            <button
                                onClick={handleComplete}
                                className="w-full py-4 bg-primary rounded-2xl text-white font-bold shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
                            >
                                COMPLETAR Y DESBLOQUEAR EN SKOOL
                            </button>
                        )}
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}
