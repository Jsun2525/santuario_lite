"use client";

import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function SonidosPage() {
    const { isPlaying, togglePlay, volume, setVolume } = useAudioPlayer("/sounds/brainwaves.mp3");
    const [voiceVolume, setVoiceVolume] = useState(0.7);
    const [musicVolume, setMusicVolume] = useState(0.5);
    // Mock progress state
    const [progress] = useState(35);
    const currentTime = "2:14";
    const totalTime = "6:30";

    return (
        <div className="relative flex h-screen w-full flex-col bg-[#191022] text-slate-100 antialiased overflow-hidden font-display">
            {/* Ambient background glow */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-20 size-80 rounded-full bg-[#8c2bee]/15 blur-3xl" />
                <div className="absolute bottom-1/3 -left-20 size-80 rounded-full bg-[#2bc9ee]/10 blur-3xl" />
            </div>

            {/* Header */}
            <header className="flex items-center justify-between px-6 pt-6 pb-4 z-10">
                <button className="p-2 flex items-center justify-center rounded-full bg-[#8c2bee]/10 border border-[#8c2bee]/20">
                    <span className="material-symbols-outlined text-slate-200">expand_more</span>
                </button>
                <h1 className="text-sm font-semibold tracking-widest uppercase text-slate-300">Meditación Profunda</h1>
                <button className="p-2 flex items-center justify-center rounded-full bg-[#8c2bee]/10 border border-[#8c2bee]/20">
                    <span className="material-symbols-outlined text-slate-200">more_vert</span>
                </button>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 gap-6 pb-4 overflow-hidden">

                {/* Circular Album Art */}
                <div className="relative flex items-center justify-center">
                    {/* Outer gradient ring with pulse glow */}
                    <div
                        className={`absolute rounded-full transition-all duration-1000 ${isPlaying ? "animate-pulse" : ""}`}
                        style={{
                            width: 236,
                            height: 236,
                            background: "conic-gradient(from 0deg, #2bc9ee, #8c2bee, #2bc9ee)",
                            filter: isPlaying ? "drop-shadow(0 0 20px rgba(43,201,238,0.4)) drop-shadow(0 0 40px rgba(140,43,238,0.3))" : "none",
                        }}
                    />
                    {/* Inner dark circle for gap */}
                    <div
                        className="absolute rounded-full bg-[#191022]"
                        style={{ width: 228, height: 228 }}
                    />
                    {/* Album art image */}
                    <div
                        className="relative rounded-full overflow-hidden border-4 border-[#191022] bg-gradient-to-br from-[#2bc9ee]/20 via-[#191022] to-[#8c2bee]/20 flex items-center justify-center"
                        style={{ width: 220, height: 220 }}
                    >
                        <span className="material-symbols-outlined text-7xl text-[#8c2bee]/40">self_improvement</span>
                    </div>
                </div>

                {/* Track Info */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Meditación Profunda
                    </h2>
                    <p className="text-sm italic text-slate-400 mt-1">Ondas binaurales · Santuario</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-xs flex flex-col gap-1">
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${progress}%`,
                                background: "linear-gradient(to right, #2bc9ee, #8c2bee)",
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{currentTime}</span>
                        <span>{totalTime}</span>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-8">
                    <button className="text-slate-400 active:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">skip_previous</span>
                    </button>
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
                        style={{
                            background: "linear-gradient(135deg, #8c2bee, #6b1faf)",
                            boxShadow: "0 0 30px rgba(140,43,238,0.5), 0 0 60px rgba(140,43,238,0.2)",
                        }}
                    >
                        <span className="material-symbols-outlined text-5xl fill-[1]">
                            {isPlaying ? "pause" : "play_arrow"}
                        </span>
                    </button>
                    <button className="text-slate-400 active:text-white transition-colors">
                        <span className="material-symbols-outlined text-3xl">skip_next</span>
                    </button>
                </div>
            </main>

            {/* Glass Panel Footer with Sliders */}
            <div
                className="px-6 pt-5 pb-2 z-10"
                style={{
                    background: "rgba(25, 16, 34, 0.6)",
                    backdropFilter: "blur(12px)",
                    borderTop: "1px solid rgba(140,43,238,0.15)",
                }}
            >
                {/* Voice Slider */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-[#2bc9ee] w-14">Voz</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={voiceVolume}
                        onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                        className="flex-1 h-1 appearance-none rounded-full bg-slate-800 cursor-pointer"
                        style={{
                            accentColor: "#2bc9ee",
                        }}
                    />
                    <span className="text-[10px] text-slate-500 w-8 text-right">{Math.round(voiceVolume * 100)}%</span>
                </div>

                {/* Music Slider */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-[#8c2bee] w-14">Música</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={musicVolume}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setMusicVolume(val);
                            setVolume(val);
                        }}
                        className="flex-1 h-1 appearance-none rounded-full bg-slate-800 cursor-pointer"
                        style={{
                            accentColor: "#8c2bee",
                        }}
                    />
                    <span className="text-[10px] text-slate-500 w-8 text-right">{Math.round(musicVolume * 100)}%</span>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
