"use client";

import { useMeditationTimer } from "@/hooks/useMeditationTimer";

const AMBIENT_SOUNDS = [
    { label: "Lluvia", icon: "water_drop" },
    { label: "Bosque", icon: "forest" },
    { label: "Cuencos", icon: "graphic_eq" },
    { label: "Viento", icon: "air" },
];

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

    // Derive state
    const isReady = elapsed === 0 && !isActive && !isCompleted;
    const isPaused = !isActive && elapsed > 0 && !isCompleted;

    const statusLabel = isCompleted
        ? "Completado"
        : isActive
            ? "Meditando..."
            : isPaused
                ? "Pausado"
                : "Listo";

    return (
        <div className="flex flex-col items-center gap-10 w-full">
            {/* Circular Timer */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                {/* Breathing ring */}
                <div
                    className={`absolute inset-0 rounded-full border-2 border-[#13ecda]/20 ${isActive ? "animate-pulse" : ""}`}
                    style={{
                        background: "radial-gradient(circle, rgba(19, 236, 218, 0.1) 0%, rgba(19, 236, 218, 0) 70%)",
                    }}
                />
                {/* Inner glow ring */}
                <div
                    className="absolute inset-4 rounded-full border border-[#13ecda]/40"
                    style={{ boxShadow: "0 0 40px -10px rgba(19, 236, 218, 0.3)" }}
                />
                {/* Content */}
                <div className="flex flex-col items-center justify-center z-10">
                    <span
                        className={`text-[#13ecda]/60 text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isActive ? "animate-pulse" : ""}`}
                    >
                        {statusLabel}
                    </span>
                    <h2 className="text-white font-bold text-7xl leading-none tracking-tight tabular-nums">
                        {elapsedFormatted}
                    </h2>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                {/* Ready: play button */}
                {isReady && (
                    <button
                        onClick={start}
                        className="w-20 h-20 flex items-center justify-center rounded-full bg-[#13ecda] text-[#081211] shadow-lg shadow-[#13ecda]/20 active:scale-95 transition-transform"
                    >
                        <span
                            className="material-symbols-outlined text-4xl"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            play_arrow
                        </span>
                    </button>
                )}

                {/* Running: pause + finalizar */}
                {isActive && (
                    <>
                        <button
                            onClick={pause}
                            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#13ecda]/30 bg-[#132a28] text-[#13ecda] active:scale-95 transition-transform"
                        >
                            <span
                                className="material-symbols-outlined text-3xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                pause
                            </span>
                        </button>
                        <button
                            onClick={stop}
                            className="px-8 py-4 rounded-2xl bg-[#13ecda] text-[#081211] font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform shadow-lg shadow-[#13ecda]/20"
                        >
                            Finalizar
                        </button>
                    </>
                )}

                {/* Paused: continuar + stop */}
                {isPaused && (
                    <>
                        <button
                            onClick={resume}
                            className="px-8 py-4 rounded-2xl bg-[#13ecda] text-[#081211] font-bold uppercase tracking-wider text-sm active:scale-95 transition-transform shadow-lg shadow-[#13ecda]/20"
                        >
                            Continuar
                        </button>
                        <button
                            onClick={stop}
                            className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-[#13ecda]/30 bg-[#132a28] text-[#13ecda] active:scale-95 transition-transform"
                        >
                            <span
                                className="material-symbols-outlined text-3xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                stop
                            </span>
                        </button>
                    </>
                )}

                {/* Completed: reset */}
                {isCompleted && (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="bg-[#13ecda]/10 border border-[#13ecda]/30 text-[#13ecda] px-6 py-3 rounded-2xl text-sm font-medium text-center">
                            {elapsedFormatted} de meditaci&oacute;n registrados
                        </div>
                        <button
                            onClick={reset}
                            className="w-20 h-20 flex items-center justify-center rounded-full bg-[#13ecda] text-[#081211] shadow-lg shadow-[#13ecda]/20 active:scale-95 transition-transform"
                        >
                            <span
                                className="material-symbols-outlined text-4xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                replay
                            </span>
                        </button>
                        <span className="text-[#13ecda]/60 text-xs font-bold uppercase tracking-[0.2em]">
                            Nueva Meditaci&oacute;n
                        </span>
                    </div>
                )}
            </div>

            {/* Ambient Sound Selector */}
            <div className="flex gap-3 justify-center">
                {AMBIENT_SOUNDS.map((sound) => (
                    <button
                        key={sound.label}
                        className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#132a28] border border-[#13ecda]/10 text-[#13ecda]/60 hover:border-[#13ecda]/30 hover:text-[#13ecda] transition-colors"
                    >
                        <span className="material-symbols-outlined text-xl">{sound.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider">{sound.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
