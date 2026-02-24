"use client";

import { useState } from "react";
import { useAudioMixer } from "@/hooks/useAudioMixer";

const SFX_OPTIONS = [
    { id: "rain", name: "Lluvia Zen", url: "/sounds/rain.mp3", icon: "water_drop" },
    { id: "fire", name: "Fuego Sagrado", url: "/sounds/fire.mp3", icon: "local_fire_department" },
    { id: "birds", name: "Cantos del Alba", url: "/sounds/birds.mp3", icon: "forest" },
];

export function AudioMixer({ voiceUrl = null }: { voiceUrl?: string | null }) {
    const { settings, isMasterPlaying, togglePlay, updateVolume, setTrack } = useAudioMixer();
    const [expanded, setExpanded] = useState(false);

    // Sync external props (like a voice guide) if passed
    if (voiceUrl && settings.active_voice !== voiceUrl) {
        setTrack('voice', voiceUrl);
    }

    return (
        <div className="w-full glass-card p-4 rounded-3xl mt-6 relative overflow-visible transition-all">
            {/* Master Play Button / Header */}
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <div>
                    <p className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">tune</span>
                        Mezclador de Atmósfera
                    </p>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Crea tu santuario</p>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className={`size-12 flex items-center justify-center rounded-full transition-all shadow-[0_0_20px_rgba(122,49,246,0.2)] ${isMasterPlaying ? 'bg-primary text-white scale-110 shadow-[0_0_30px_rgba(122,49,246,0.5)]' : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    <span className="material-symbols-outlined text-2xl">{isMasterPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
            </div>

            {/* Mixer Controls */}
            {expanded && (
                <div className="mt-6 space-y-6 border-t border-white/5 pt-6 animate-fade-in">

                    {/* Layer 1: Voz (If provided) */}
                    {settings.active_voice && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <label className="text-xs font-semibold text-white/80">Voz Guía</label>
                                <span className="text-[10px] text-primary">{Math.round(settings.voice_volume * 100)}%</span>
                            </div>
                            <input
                                type="range" min="0" max="1" step="0.05"
                                value={settings.voice_volume}
                                onChange={(e) => updateVolume('voice', parseFloat(e.target.value))}
                                className="w-full accent-primary h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Layer 2: Frecuencia/Música Base */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <label className="text-xs font-semibold text-white/80">Frecuencia Base (432Hz)</label>
                            <span className="text-[10px] text-[#ffd700]">{Math.round(settings.music_volume * 100)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.05"
                            value={settings.music_volume}
                            onChange={(e) => updateVolume('music', parseFloat(e.target.value))}
                            className="w-full accent-[#ffd700] h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                        />
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => setTrack('music', settings.active_music ? null : '/sounds/brainwaves.mp3')}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${settings.active_music
                                        ? 'bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30'
                                        : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {settings.active_music ? 'Desactivar Cuencos' : 'Activar Cuencos'}
                            </button>
                        </div>
                    </div>

                    {/* Layer 3: Atmósfera */}
                    <div className="space-y-2 pb-2">
                        <div className="flex justify-between items-end">
                            <label className="text-xs font-semibold text-white/80">Efecto Atmosférico</label>
                            <span className="text-[10px] text-success">{Math.round(settings.sfx_volume * 100)}%</span>
                        </div>
                        <input
                            type="range" min="0" max="1" step="0.05"
                            value={settings.sfx_volume}
                            onChange={(e) => updateVolume('sfx', parseFloat(e.target.value))}
                            className="w-full accent-success h-1 bg-white/10 rounded-full appearance-none cursor-pointer mb-3"
                        />

                        <div className="grid grid-cols-3 gap-2">
                            {SFX_OPTIONS.map(sfx => {
                                const isActive = settings.active_sfx === sfx.url;
                                return (
                                    <button
                                        key={sfx.id}
                                        onClick={() => setTrack('sfx', isActive ? null : sfx.url)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1 ${isActive
                                                ? 'bg-success/20 border-success/30 shadow-[0_0_15px_-2px_rgba(46,204,113,0.3)]'
                                                : 'bg-white/5 border-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-xl ${isActive ? 'text-success drop-shadow-md' : 'text-white/40'}`}>
                                            {sfx.icon}
                                        </span>
                                        <span className={`text-[9px] font-bold uppercase tracking-tight text-center ${isActive ? 'text-success' : 'text-white/50'}`}>
                                            {sfx.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
