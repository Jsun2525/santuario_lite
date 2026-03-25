"use client";

import { Mood, EnergyLevel } from "@/hooks/useMoodCheckin";

const MOODS: { key: Mood; emoji: string; color: string }[] = [
  { key: "sad", emoji: "\ud83d\ude14", color: "bg-red-500" },
  { key: "neutral", emoji: "\ud83d\ude10", color: "bg-orange-500" },
  { key: "happy", emoji: "\ud83d\ude0a", color: "bg-yellow-400" },
  { key: "joyful", emoji: "\ud83d\ude01", color: "bg-emerald-500" },
  { key: "transcendent", emoji: "\u2728", color: "bg-primary" },
];

const ENERGY_LEVELS: EnergyLevel[] = ["Baja", "Media", "Alta"];

interface MoodCheckinProps {
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood) => void;
  energyLevel: EnergyLevel;
  setEnergyLevel: (level: EnergyLevel) => void;
  submit: () => void;
  isSubmitting: boolean;
  dismiss: () => void;
}

export function MoodCheckin({
  selectedMood,
  setSelectedMood,
  energyLevel,
  setEnergyLevel,
  submit,
  isSubmitting,
  dismiss,
}: MoodCheckinProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-[#0D0D1A] border-t border-white/10 rounded-t-3xl shadow-2xl flex flex-col pb-10 pt-2 px-6 animate-slide-up">
        {/* Drag Handle */}
        <div className="flex h-6 w-full items-center justify-center mb-4">
          <div className="h-1.5 w-12 rounded-full bg-white/10" />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-slate-100 font-serif text-3xl leading-tight">
            \u00bfC\u00f3mo te sientes hoy?
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Tu energ\u00eda gu\u00eda tu pr\u00e1ctica diaria
          </p>
        </div>

        {/* Mood Selector */}
        <div className="flex justify-between items-center mb-10 px-2">
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.key;
            return (
              <button
                key={mood.key}
                onClick={() => setSelectedMood(mood.key)}
                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected
                    ? `w-16 h-16 ${mood.color}/20 ring-2 ring-offset-2 ring-offset-[#0D0D1A]`
                    : "w-12 h-12 bg-white/5 hover:bg-white/10"
                }`}
                style={
                  isSelected
                    ? {
                        boxShadow:
                          mood.key === "transcendent"
                            ? "0 0 0 2px #854ef4"
                            : undefined,
                      }
                    : undefined
                }
              >
                <span
                  className={`transition-all duration-200 ${
                    isSelected ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {mood.emoji}
                </span>
              </button>
            );
          })}
        </div>

        {/* Energy Level */}
        <div className="mb-10">
          <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
            Nivel de Energ\u00eda
          </h4>
          <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level}
                onClick={() => setEnergyLevel(level)}
                className={`flex-1 py-3 text-sm font-semibold transition-all duration-200 ${
                  energyLevel === level
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={submit}
          disabled={!selectedMood || isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all"
        >
          {isSubmitting ? (
            "Guardando..."
          ) : (
            <>
              Ver mis recomendaciones
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
