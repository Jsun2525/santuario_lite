"use client";

import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { MoodCheckin } from "@/components/MoodCheckin";
import { useAuth } from "@/hooks/useAuth";
import { useMoodCheckin } from "@/hooks/useMoodCheckin";

function getGreeting(): { label: string; greeting: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { label: "Amanecer Sagrado", greeting: "Buenos d\u00edas" };
  if (hour >= 12 && hour < 18) return { label: "Luz Interior", greeting: "Buenas tardes" };
  if (hour >= 18 && hour < 22) return { label: "Atardecer Dorado", greeting: "Buenas noches" };
  return { label: "Noche Estelar", greeting: "Buenas noches" };
}

function getFirstName(user: { user_metadata?: { full_name?: string } } | null): string {
  const fullName = user?.user_metadata?.full_name;
  if (!fullName) return "Viajero";
  return fullName.split(" ")[0];
}

const QUICK_ACTIONS = [
  { href: "/tu-camino", icon: "route", title: "Tu Camino", subtitle: "Progreso y Desbloqueos" },
  { href: "/japamala", icon: "self_improvement", title: "Japa Mala", subtitle: "Pr\u00e1ctica Sagrada" },
  { href: "/meditacion-libre", icon: "timer", title: "Pr\u00e1ctica Libre", subtitle: "Cron\u00f3metro" },
  { href: "/diario", icon: "auto_stories", title: "Diario", subtitle: "Or\u00e1culo Interior" },
  { href: "/sonidos", icon: "graphic_eq", title: "Sonidos", subtitle: "Frecuencias" },
  { href: "/gratitud", icon: "favorite", title: "Gratitud", subtitle: "Diario 28 D\u00edas" },
  { href: "/oraculo", icon: "auto_awesome", title: "Or\u00e1culo", subtitle: "Sabidur\u00eda Divina" },
  { href: "/biblioteca", icon: "local_library", title: "Biblioteca", subtitle: "Meditaciones" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const mood = useMoodCheckin();
  const { label, greeting } = getGreeting();
  const name = getFirstName(user);

  return (
    <>
      {/* Ambient glow */}
      <div className="fixed top-[-10%] left-[-20%] w-[80%] h-[60%] mystic-glow rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[80%] h-[60%] mystic-glow rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto px-6 pb-32">
        {/* Header */}
        <header className="flex justify-between items-center pt-8 pb-6">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-primary/80">
              {label}
            </span>
            <h1 className="text-2xl font-bold text-slate-100 mt-0.5">
              {greeting},{" "}
              <span className="text-gradient">{name}</span>
            </h1>
          </div>
          <Link
            href="/perfil"
            className="w-11 h-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-primary text-xl">
              auto_awesome
            </span>
          </Link>
        </header>

        <main className="flex flex-col gap-5">
          {/* Daily Quote */}
          <section className="glass-card shimmer-effect iridescent-border rounded-2xl p-5 text-center relative overflow-hidden">
            <div className="absolute -top-2 -left-2 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-5xl text-primary">format_quote</span>
            </div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-bold text-primary/90 mb-2">Cita del D\u00eda</h3>
            <p className="font-serif text-base leading-relaxed text-slate-100 italic px-2 mb-1">
              &ldquo;El dolor es inevitable, el sufrimiento es optativo&rdquo;
            </p>
            <cite className="text-[9px] uppercase tracking-widest text-slate-500 not-italic">&mdash; Buda</cite>
          </section>

          {/* Featured Meditation Card */}
          <Link
            href="/biblioteca"
            className="glass-card shimmer-effect iridescent-border rounded-2xl overflow-hidden block relative h-40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-accent/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-primary/90 mb-1">
                Meditaci\u00f3n Diaria
              </span>
              <h2 className="font-serif text-xl text-white leading-tight">
                Encuentra tu Paz Interior
              </h2>
              <p className="text-slate-400 text-xs mt-1">15 min &middot; Gu\u00eda de Presencia</p>
            </div>
            <div className="absolute top-5 right-5 bg-primary/30 backdrop-blur-sm p-3 rounded-full border border-white/10">
              <span className="material-symbols-outlined text-white text-2xl">play_arrow</span>
            </div>
          </Link>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="glass-card shimmer-effect iridescent-border rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.97] transition-transform"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {action.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-100">{action.title}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                    {action.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-12 mb-8 text-center">
          <p className="text-slate-700 text-[9px] tracking-[0.4em] uppercase font-bold">
            Inner Path | Santuario de Bienestar
          </p>
        </footer>
      </div>

      {/* Mood Check-in Modal */}
      {mood.showCheckin && (
        <MoodCheckin
          selectedMood={mood.selectedMood}
          setSelectedMood={mood.setSelectedMood}
          energyLevel={mood.energyLevel}
          setEnergyLevel={mood.setEnergyLevel}
          submit={mood.submit}
          isSubmitting={mood.isSubmitting}
          dismiss={mood.dismiss}
        />
      )}

      <BottomNav />
    </>
  );
}
