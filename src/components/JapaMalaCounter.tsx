"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useJapaMala } from "@/hooks/useJapaMala";
import dynamic from 'next/dynamic';
const AudioMixer = dynamic(() => import('./AudioMixer').then(mod => mod.AudioMixer), { ssr: false });

export default function JapaMalaCounter() {
    const { user } = useAuth();
    const { saveSession } = useJapaMala();

    // Auto-save a session log when entering (mocking meditation focus start)
    useEffect(() => {
        if (user) {
            saveSession('Meditación Activa (Geometría)', 5);
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
                        className="animate-pulse-gentle relative w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] rounded-full mix-blend-screen opacity-40 blur-[100px] transition-colors duration-1000 bg-primary"
                    ></div>
                </div>
            </div>

            <main className="relative z-10 flex flex-col h-screen w-full px-6 pt-safe">
                {/* Header */}
                <header className="flex items-center justify-between pt-8 h-16 shrink-0 relative z-20">
                    <Link href="/" className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-100 hover:bg-white/10 transition-all active:scale-90">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </Link>
                </header>

                {/* Central Geometry */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="animate-geometry-glow relative size-64 md:size-80 flex items-center justify-center transition-colors duration-1000 text-primary">
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
                    <div className="w-full max-w-sm mx-auto">
                        <AudioMixer />
                    </div>
                </div>
            </main>

            {/* Bottom Gradient Overlay to smooth out navigation if present */}
            <div className="fixed bottom-0 left-0 w-full h-44 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent pointer-events-none z-20"></div>
        </div>
    );
}
