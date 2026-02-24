"use client";

import { useState } from "react";
import { useMeditationTimer } from "@/hooks/useMeditationTimer";

export function MeditationTimer() {
    const [selectedMinutes, setSelectedMinutes] = useState(10);
    const {
        timeLeftFormatted,
        isActive,
        isCompleted,
        mode,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer
    } = useMeditationTimer(selectedMinutes);

    return (
        <div className="glass-card shimmer-effect iridescent-border rounded-3xl p-6 w-full max-w-sm mx-auto flex flex-col items-center">

            <div className="mb-6 text-center">
                <h3 className="text-sm font-bold tracking-widest uppercase text-white/90">
                    Temporizador Zen
                </h3>
                <p className="text-[10px] text-white/50 tracking-wider mt-1">
                    Encuentra tu centro
                </p>
            </div>

            {/* Timer Display */}
            <div className="relative size-48 flex items-center justify-center mb-8">
                {/* Outer glowing ring */}
                <div className={`absolute inset-0 rounded-full border-[1.5px] border-white/10 transition-all duration-1000 ${isActive ? "animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105" : ""
                    }`}></div>

                {/* Inner progress ring simulated via conic-gradient based on time left */}
                <div className="absolute inset-2 rounded-full border border-primary/20 bg-background-dark/50 flex flex-col items-center justify-center backdrop-blur-md">
                    <span className="text-4xl font-light tracking-[0.1em] text-white">
                        {timeLeftFormatted}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-primary font-bold mt-2">
                        {mode === 'prep' && isActive ? 'Prepárate' : (isCompleted ? 'Completado' : 'Silencio')}
                    </span>
                </div>
            </div>

            {/* Controls */}
            {!isActive && !isCompleted && (
                <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
                    <div className="flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10">
                        {[5, 10, 15, 20, 30].map(min => (
                            <button
                                key={min}
                                onClick={() => setSelectedMinutes(min)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedMinutes === min
                                        ? "bg-primary text-white shadow-lg"
                                        : "text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                {min}m
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => startTimer(selectedMinutes)}
                        className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold uppercase tracking-wider text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                    >
                        Comenzar
                    </button>
                </div>
            )}

            {isActive && (
                <div className="flex items-center gap-4 animate-fade-in">
                    <button
                        onClick={pauseTimer}
                        className="size-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">pause</span>
                    </button>
                    <button
                        onClick={stopTimer}
                        className="size-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">stop</span>
                    </button>
                </div>
            )}

            {!isActive && timeLeftFormatted !== `${selectedMinutes.toString().padStart(2, '0')}:00` && !isCompleted && (
                <div className="flex items-center gap-4 animate-fade-in">
                    <button
                        onClick={resumeTimer}
                        className="px-6 py-3 rounded-xl bg-primary text-white font-bold uppercase tracking-wider text-xs active:scale-95 transition-all"
                    >
                        Continuar
                    </button>
                    <button
                        onClick={stopTimer}
                        className="size-12 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-400 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined">stop</span>
                    </button>
                </div>
            )}

            {isCompleted && (
                <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
                    <div className="bg-success/20 border border-success/30 text-success px-4 py-2 rounded-lg text-xs font-medium text-center">
                        ¡Práctica Completada! Tiempo registrado en tu perfil.
                    </div>
                    <button
                        onClick={stopTimer}
                        className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/20 active:scale-95 transition-all"
                    >
                        Nueva Meditación
                    </button>
                </div>
            )}

        </div>
    );
}
