"use client";

import { useMeditationTimer } from "@/hooks/useMeditationTimer";

export function MeditationTimer() {
    const {
        elapsedFormatted,
        elapsed,
        isActive,
        isCompleted,
        start,
        pause,
        resume,
        stop,
        reset
    } = useMeditationTimer();

    return (
        <div className="glass-card shimmer-effect iridescent-border rounded-3xl p-6 w-full max-w-sm mx-auto flex flex-col items-center">

            <div className="mb-6 text-center">
                <h3 className="text-sm font-bold tracking-widest uppercase text-white/90">
                    Cronómetro Zen
                </h3>
                <p className="text-[10px] text-white/50 tracking-wider mt-1">
                    Medita sin límites
                </p>
            </div>

            {/* Chronometer Display */}
            <div className="relative size-48 flex items-center justify-center mb-8">
                <div className={`absolute inset-0 rounded-full border-[1.5px] border-white/10 transition-all duration-1000 ${isActive ? "animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105" : ""}`}></div>

                <div className="absolute inset-2 rounded-full border border-primary/20 bg-background-dark/50 flex flex-col items-center justify-center backdrop-blur-md">
                    <span className="text-4xl font-light tracking-[0.1em] text-white">
                        {elapsedFormatted}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-primary font-bold mt-2">
                        {isCompleted ? 'Completado' : (isActive ? 'Meditando...' : (elapsed > 0 ? 'Pausado' : 'Listo'))}
                    </span>
                </div>
            </div>

            {/* Start Button */}
            {!isActive && !isCompleted && elapsed === 0 && (
                <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
                    <button
                        onClick={start}
                        className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold uppercase tracking-wider text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                    >
                        Comenzar
                    </button>
                </div>
            )}

            {/* Active Controls */}
            {isActive && (
                <div className="flex items-center gap-4 animate-fade-in">
                    <button
                        onClick={pause}
                        className="size-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">pause</span>
                    </button>
                    <button
                        onClick={stop}
                        className="px-6 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-xs active:scale-95 transition-all"
                    >
                        Finalizar
                    </button>
                </div>
            )}

            {/* Paused Controls */}
            {!isActive && !isCompleted && elapsed > 0 && (
                <div className="flex items-center gap-4 animate-fade-in">
                    <button
                        onClick={resume}
                        className="px-6 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-xs active:scale-95 transition-all"
                    >
                        Continuar
                    </button>
                    <button
                        onClick={stop}
                        className="size-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">stop</span>
                    </button>
                </div>
            )}

            {/* Completed */}
            {isCompleted && (
                <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
                    <div className="bg-success/20 border border-success/30 text-success px-4 py-2 rounded-lg text-xs font-medium text-center">
                        ¡{elapsedFormatted} de práctica registrados en tu perfil!
                    </div>
                    <button
                        onClick={reset}
                        className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/20 active:scale-95 transition-all"
                    >
                        Nueva Meditación
                    </button>
                </div>
            )}
        </div>
    );
}
