"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useJapaMala } from "@/hooks/useJapaMala";
import { useAudioPlayer, FREQUENCIES } from "@/hooks/useAudioPlayer";

const SOUNDS = [
    { id: "rain", name: "Lluvia Zen", hex: "#3B82F6", icon: "water_drop" },
    { id: "bowls", name: "Cuencos Tibetanos", hex: "#D4AF37", icon: "graphic_eq" },
    { id: "wind", name: "Viento Estelar", hex: "#7B2FF7", icon: "air" },
    { id: "noise", name: "Ruido Blanco", hex: "#FFFFFF", icon: "blur_on" },
];

export default function JapaMalaCounter() {
    const [activeSoundIndex, setActiveSoundIndex] = useState(0);
    const activeColor = SOUNDS[activeSoundIndex].hex;

    const { user } = useAuth();
    const { saveSession } = useJapaMala();
    // For MVP, we'll just mock the src, as we'll place mp3 files in /public/sounds later.
    const audioSrc = `/sounds/${SOUNDS[activeSoundIndex].id}.mp3`;
    const { isPlaying, togglePlay, volume, setVolume } = useAudioPlayer(audioSrc);

    // Auto-save a session log when entering (mocking meditation focus start)
    useEffect(() => {
        if (user) {
            saveSession(user.id, 'Meditación Activa (Geometría)');
        }
    }, [user, saveSession]);

    return (
        <div className="bg-background-dark font-display text-slate-100 overflow-hidden antialiased min-h-screen relative flex flex-col">
            {/* Background Animations */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-[#0f0a1d] to-background-dark"></div>

                {/* CSS Particles */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-[-20px] bg-white rounded-full w-1 h-1 left-[15%] animate-[float-up_12s_infinite_1s]"></div>
                    <div className="absolute bottom-[-20px] bg-white rounded-full w-0.5 h-0.5 left-[35%] animate-[float-up_15s_infinite_4s]"></div>
                    <div className="absolute bottom-[-20px] bg-white rounded-full w-1.5 h-1.5 left-[55%] animate-[float-up_10s_infinite_0s]"></div>
                    <div className="absolute bottom-[-20px] bg-white rounded-full w-1 h-1 left-[75%] animate-[float-up_18s_infinite_7s]"></div>
                    <div className="absolute bottom-[-20px] bg-white rounded-full w-0.5 h-0.5 left-[95%] animate-[float-up_14s_infinite_2s]"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="animate-pulse-gentle relative w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full mix-blend-screen opacity-40 blur-[100px] transition-colors duration-1000"
                        style={{ backgroundColor: activeColor }}
                    ></div>
                </div>
            </div>

            <main className="relative z-10 flex flex-col h-screen w-full px-6 pt-safe">
                {/* Header */}
                <header className="flex items-center justify-between pt-8 h-16 shrink-0 relative z-20">
                    <Link href="/" className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-100 hover:bg-white/10 transition-all active:scale-90">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </Link>
                    <div className="flex items-center gap-3 p-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10">
                        {SOUNDS.slice(0, 3).map((sound, idx) => (
                            <button
                                key={sound.id}
                                onClick={() => setActiveSoundIndex(idx)}
                                className={`size-6 rounded-full transition-all ${activeSoundIndex === idx ? 'scale-110 shadow-lg' : 'opacity-50'}`}
                                style={{ backgroundColor: sound.hex }}
                                title={sound.name}
                            />
                        ))}
                    </div>
                </header>

                {/* Central Geometry */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="animate-geometry-glow relative size-64 md:size-80 flex items-center justify-center transition-colors duration-1000" style={{ color: activeColor }}>
                        {/* Sacred Geometry SVG (Flower of Life style) */}
                        <svg className="w-full h-full fill-none stroke-current stroke-[0.8] animate-rotate-slow" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="30"></circle>
                            <circle cx="100" cy="70" r="30"></circle>
                            <circle cx="100" cy="130" r="30"></circle>
                            <circle cx="74" cy="85" r="30"></circle>
                            <circle cx="126" cy="85" r="30"></circle>
                            <circle cx="74" cy="115" r="30"></circle>
                            <circle cx="126" cy="115" r="30"></circle>
                            <circle className="opacity-20" cx="100" cy="100" r="90" strokeDasharray="4 4"></circle>
                            <circle className="opacity-60" cx="100" cy="100" r="98"></circle>
                        </svg>
                    </div>
                    <div className="mt-14 text-center">
                        <p className="text-white/30 text-[10px] font-bold tracking-[0.6em] uppercase">Meditación Activa</p>
                        <p className="text-white text-xl font-light tracking-[0.2em] mt-3">Om Mani Padme Hum</p>
                    </div>
                </div>

                {/* Sound Player Wrapper */}
                <div className="mb-32 shrink-0">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 w-full max-w-sm mx-auto shadow-2xl">
                        <div className="flex items-center justify-between mb-5 px-1">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Atmósfera</span>
                                <span className="text-xs text-white/80 font-medium">{SOUNDS[activeSoundIndex].name}</span>
                            </div>
                            <button
                                onClick={togglePlay}
                                className="size-10 flex items-center justify-center rounded-full text-white active:scale-90 transition-all opacity-85 hover:opacity-100 shadow-lg"
                                style={{ backgroundColor: activeColor }}
                            >
                                <span className="material-symbols-outlined text-xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
                            </button>
                        </div>

                        {/* Sound Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {SOUNDS.map((sound, idx) => {
                                const isActive = activeSoundIndex === idx;
                                return (
                                    <button
                                        key={sound.id}
                                        onClick={() => setActiveSoundIndex(idx)}
                                        className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${isActive
                                                ? 'border-transparent bg-white/10 shadow-[0_0_15px_-2px_var(--color-primary)]'
                                                : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                        style={isActive ? { borderColor: sound.hex, boxShadow: `0 0 15px -2px ${sound.hex}` } : {}}
                                    >
                                        <span className="material-symbols-outlined text-lg" style={isActive ? { color: sound.hex } : {}}>
                                            {sound.icon}
                                        </span>
                                        <span className="text-[11px] font-semibold tracking-tight">{sound.name}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Volume Control */}
                        <div className="mt-6 px-1 flex items-center gap-4">
                            <span className="material-symbols-outlined text-sm text-white/30">volume_down</span>
                            <div className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer" onClick={(e) => {
                                const bounds = e.currentTarget.getBoundingClientRect();
                                const x = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
                                setVolume(x);
                            }}>
                                <div className="absolute left-0 top-0 h-full rounded-full transition-all" style={{ backgroundColor: activeColor, width: `${volume * 100}%` }}></div>
                                <div className="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-lg border-2 border-slate-900 transition-all" style={{ left: `${volume * 100}%`, transform: 'translate(-50%, -50%)' }}></div>
                            </div>
                            <span className="material-symbols-outlined text-sm text-white/30">volume_up</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Gradient Overlay to smooth out navigation if present */}
            <div className="fixed bottom-0 left-0 w-full h-44 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none z-20"></div>
        </div>
    );
}
