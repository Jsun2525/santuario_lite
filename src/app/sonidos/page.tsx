"use client";

import { useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { useAudioPlayer, FREQUENCIES } from "@/hooks/useAudioPlayer";

// Mock data mapping to UI
const SOUND_PROFILES = [
    { id: "alpha", name: "Relajación", freq: "Alpha (8Hz)", icon: "waves", value: FREQUENCIES.NORMAL },
    { id: "delta", name: "Sueño Profundo", freq: "Delta (4Hz)", icon: "nightlight", value: FREQUENCIES.HEALING_432 },
    { id: "beta", name: "Enfoque", freq: "Beta (14Hz)", icon: "bolt", value: FREQUENCIES.DNA_528 },
];

export default function SonidosPage() {
    // For MVP, using a default sound file path to be added in public/sounds
    const { isPlaying, togglePlay, volume, setVolume, frequency, setFrequency } = useAudioPlayer("/sounds/brainwaves.mp3");

    // Helper to find current profile active based on frequency value
    const activeProfile = SOUND_PROFILES.find(p => p.value === frequency) || SOUND_PROFILES[0];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
            <div className="relative flex h-screen w-full flex-col bg-[#0a070f] bg-[radial-gradient(at_0%_0%,rgba(125,48,248,0.15)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(125,48,248,0.1)_0px,transparent_50%)] overflow-hidden">
                <header className="flex items-center p-6 justify-between z-10">
                    <Link href="/biblioteca" className="size-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-100">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </Link>
                    <div className="text-center">
                        <h1 className="text-sm font-semibold tracking-widest uppercase opacity-70">Inner Path</h1>
                        <p className="text-xs font-medium text-primary">Santuario</p>
                    </div>
                    <button className="size-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-100">
                        <span className="material-symbols-outlined text-2xl">more_horiz</span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto scrollbar-hide pb-32">
                    <div className="flex flex-col items-center justify-center px-6 gap-8 pt-4">

                        {/* Interactive Orb */}
                        <div className="relative flex items-center justify-center w-full aspect-square max-w-[280px]">
                            {isPlaying && (
                                <>
                                    <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '3s' }}></div>
                                    <div className="absolute inset-0 rounded-full border border-primary/5 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                                </>
                            )}
                            <div className={`relative size-56 rounded-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-primary/20 transition-shadow duration-1000 ${isPlaying ? 'shadow-[0_0_60px_10px_rgba(125,48,248,0.3)] bg-[radial-gradient(circle,rgba(125,48,248,0.2)_0%,rgba(13,11,24,0)_70%)]' : ''}`}>
                                <span className="text-primary text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">Frecuencia</span>
                                <span className="text-5xl font-light tracking-tighter">
                                    {activeProfile.freq.split('(')[1].replace(')', '')}
                                </span>
                                <div className={`mt-4 flex gap-1 items-center transition-opacity duration-500 ${isPlaying ? 'opacity-80' : 'opacity-20'}`}>
                                    <div className="w-1 h-4 bg-primary rounded-full animate-bounce"></div>
                                    <div className="w-1 h-8 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-1 h-12 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    <div className="w-1 h-6 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-10 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight mb-1">{activeProfile.name}</h2>
                            <p className="text-primary/60 font-medium text-sm">Sesión de Ondas {activeProfile.id}</p>
                        </div>

                        <div className="w-full max-w-xs flex items-center gap-4">
                            <span className="material-symbols-outlined text-slate-400 text-sm">volume_down</span>
                            <div className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer" onClick={(e) => {
                                const bounds = e.currentTarget.getBoundingClientRect();
                                const x = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
                                setVolume(x);
                            }}>
                                <div className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all" style={{ width: `${volume * 100}%` }}></div>
                                <div className="absolute top-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-[0_0_10px_#7d30f8] transition-all" style={{ left: `${volume * 100}%`, transform: 'translate(-50%, -50%)' }}></div>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-sm">volume_up</span>
                        </div>

                        <div className="flex items-center gap-8">
                            <button className="size-12 flex items-center justify-center rounded-full text-slate-400 active:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">replay_10</span>
                            </button>
                            <button
                                onClick={togglePlay}
                                className="size-20 bg-primary flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(125,48,248,0.5)] text-white active:scale-95 transition-transform"
                            >
                                <span className="material-symbols-outlined text-5xl fill-[1]">{isPlaying ? 'pause_circle' : 'play_circle'}</span>
                            </button>
                            <button className="size-12 flex items-center justify-center rounded-full text-slate-400 active:text-white transition-colors">
                                <span className="material-symbols-outlined text-3xl">forward_10</span>
                            </button>
                        </div>

                        <section className="w-full mt-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center px-1">
                                    <h3 className="text-xs font-bold tracking-wide uppercase opacity-50">Perfiles de Sonido</h3>
                                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">{activeProfile.id.toUpperCase()}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {SOUND_PROFILES.map((profile) => {
                                        const isActive = frequency === profile.value;
                                        return (
                                            <button
                                                key={profile.id}
                                                onClick={() => setFrequency(profile.value)}
                                                className={`p-4 rounded-xl flex items-center justify-between text-left transition-all ${isActive
                                                        ? 'bg-primary/5 border-l-4 border-l-primary backdrop-blur-md border border-white/5'
                                                        : 'bg-white/5 border border-white/5 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className={`flex items-center gap-4 ${isActive ? '' : 'opacity-70'}`}>
                                                    <div className={`size-10 rounded-full flex items-center justify-center ${isActive ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-300'}`}>
                                                        <span className="material-symbols-outlined">{profile.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-bold text-sm ${isActive ? '' : 'text-slate-200'}`}>{profile.name}</h4>
                                                        <p className={`text-xs ${isActive ? 'text-primary/70' : 'text-slate-500'}`}>{profile.freq}</p>
                                                    </div>
                                                </div>
                                                {isActive && <span className="material-symbols-outlined text-primary">check_circle</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 -right-20 size-80 rounded-full bg-primary/10 blur-3xl"></div>
                    <div className="absolute bottom-1/4 -left-20 size-80 rounded-full bg-primary/5 blur-3xl"></div>
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
