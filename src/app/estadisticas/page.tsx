"use client";

import Link from "next/link";
import { useStatistics } from "@/hooks/useStatistics";
import { BottomNav } from "@/components/BottomNav";

export default function EstadisticasPage() {
  const { timeframe, setTimeframe, moodData, presenceData, totalMinutes, moodLabel } = useStatistics();

  const maxMood = Math.max(...moodData.map(d => d.value), 1);
  const maxPresence = Math.max(...presenceData.map(d => d.value), 1);

  return (
    <div className="min-h-screen bg-[#1a160d] text-white pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-12 pb-4">
        <Link href="/perfil" className="text-white/70 hover:text-white transition-colors">
          <span className="material-symbols-rounded text-2xl">arrow_back</span>
        </Link>
        <h1 className="text-lg font-bold text-white">Tu Camino</h1>
        <div className="w-9 h-9 rounded-full bg-[#2a2416] flex items-center justify-center">
          <span className="material-symbols-rounded text-[#f9bd24] text-xl">account_circle</span>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="flex justify-center px-5 mb-8">
        <div className="flex bg-[#2a2416] rounded-full p-1 w-full max-w-xs">
          {(["Semana", "Mes"] as const).map(option => (
            <button
              key={option}
              onClick={() => setTimeframe(option)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                timeframe === option
                  ? "bg-[#f9bd24] text-[#1a160d] shadow-lg shadow-[#f9bd24]/20"
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Section */}
      <section className="px-5 mb-10">
        <p className="text-[#f9bd24] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
          Estado de Ánimo
        </p>
        <p className="text-4xl font-bold italic text-white mb-6">{moodLabel}</p>

        {/* Mood Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32 mb-3">
          {moodData.map((d, i) => {
            const heightPct = maxMood > 0 ? (d.value / maxMood) * 100 : 0;
            const isMax = d.value === maxMood && d.value > 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-md bg-[#f9bd24] transition-all duration-500"
                  style={{
                    height: `${Math.max(heightPct, 4)}%`,
                    opacity: d.value > 0 ? 1 : 0.2,
                    boxShadow: isMax ? "0 0 15px rgba(249, 189, 36, 0.3)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between gap-2">
          {moodData.map((d, i) => (
            <span key={i} className="flex-1 text-center text-[10px] text-white/40">
              {d.label}
            </span>
          ))}
        </div>
      </section>

      {/* Presence Section */}
      <section className="px-5 mb-10">
        <p className="text-[#2dd4bf] text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">
          Tiempo de Presencia
        </p>
        <p className="text-4xl font-bold text-white mb-6">
          {totalMinutes} <span className="italic text-2xl text-white/60">min</span>
        </p>

        {/* Presence Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32 mb-3">
          {presenceData.map((d, i) => {
            const heightPct = maxPresence > 0 ? (d.value / maxPresence) * 100 : 0;
            const isMax = d.value === maxPresence && d.value > 0;
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <div
                  className="w-full rounded-t-md bg-[#2dd4bf] transition-all duration-500"
                  style={{
                    height: `${Math.max(heightPct, 4)}%`,
                    opacity: d.value > 0 ? 1 : 0.2,
                    boxShadow: isMax ? "0 0 15px rgba(45, 212, 191, 0.3)" : "none",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between gap-2">
          {presenceData.map((d, i) => (
            <span key={i} className="flex-1 text-center text-[10px] text-white/40">
              {d.label}
            </span>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="px-5 space-y-3">
        <div className="bg-[#2a2416] rounded-2xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#f9bd24]/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-rounded text-[#f9bd24]">trending_up</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">30% más positividad</p>
            <p className="text-xs text-white/50 mt-0.5">
              Tu estado de ánimo ha mejorado comparado con la semana anterior. ¡Sigue así!
            </p>
          </div>
        </div>

        <div className="bg-[#2a2416] rounded-2xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/10 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-rounded text-[#2dd4bf]">dark_mode</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Sueño reparador</p>
            <p className="text-xs text-white/50 mt-0.5">
              Las meditaciones nocturnas están mejorando tu calidad de descanso.
            </p>
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
