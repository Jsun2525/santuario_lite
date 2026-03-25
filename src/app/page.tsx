import Image from "next/image";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function Dashboard() {
  return (
    <>
      <div className="fixed top-[-10%] left-[-20%] w-[80%] h-[60%] mystic-glow rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[80%] h-[60%] mystic-glow rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen max-w-md mx-auto px-6 pb-32">
        <header className="flex justify-between items-center pt-8 pb-10">
          <div className="flex flex-col">
            <h1 className="text-gradient text-2xl font-extrabold tracking-tight">La Presencia</h1>
            <p className="text-[8px] tracking-[0.2em] uppercase font-light text-slate-400">Santuario de Bienestar</p>
          </div>
          <Link href="/perfil" className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-slate-100 text-xs font-medium active:scale-95 transition-all">
            Mi Perfil
          </Link>
        </header>

        <main className="flex flex-col gap-5">
          {/* Daily Quote */}
          <section className="glass-card shimmer-effect iridescent-border rounded-2xl p-6 text-center">
            <div className="absolute -top-2 -left-2 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-6xl text-primary">format_quote</span>
            </div>
            <h3 className="text-[9px] tracking-[0.3em] uppercase font-bold text-primary/90 mb-3">Cita del Día</h3>
            <p className="font-serif text-lg leading-relaxed text-slate-100 italic px-2 mb-2">
              "El dolor es inevitable, el sufrimiento es optativo"
            </p>
            <cite className="text-[9px] uppercase tracking-widest text-slate-500 not-italic">— Buda</cite>
          </section>

          {/* Tu Camino - Duolingo Style Path */}
          <Link href="/tu-camino" className="glass-card shimmer-effect iridescent-border rounded-2xl overflow-hidden group h-32 block cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10"></div>
            <div className="absolute inset-0 flex items-center p-6 gap-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(123,47,247,0.3)]">
                <span className="material-symbols-outlined text-white text-3xl">route</span>
              </div>
              <div>
                <h2 className="font-serif text-xl text-white">Tu Camino</h2>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Progreso y Desbloqueos</p>
              </div>
              <div className="ml-auto">
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </div>
            </div>
          </Link>

          {/* Japa Mala */}
          <Link href="/japamala" className="glass-card shimmer-effect iridescent-border rounded-2xl overflow-hidden group h-48 block cursor-pointer">
            <Image alt="Japa Mala" width={800} height={600} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjlm8tCQWnRn8P--lvkFYwDd2co4XzZ3Hm3EqhkZMxPp0SPQqd5ecgbit8jnyVjbEHDx_8-8NkRnNm4W4O0X9RIEEMB63rlcttfghEoBEh4eoE0G1e3sx4GBzeEG495nXpWYM8GZavsGAAjcYJIiAmdOkKU6nNyn6CRjcr-9r4HsOviLiD-zPh7xKL7PcfBheb-K0wSdDegU_z2V4A1yDqxq2sjMkRbHedlH9gfz36bAwxxQoRuEA0X6AYhyjqd2c2FBcAW92M_2YH" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
              <div>
                <h2 className="font-serif text-2xl text-white">El Arte de Ver a Dios</h2>
                <p className="text-slate-300 text-xs font-light">Práctica Sagrada de Japa Mala</p>
              </div>
              <div className="bg-primary/40 backdrop-blur-xl p-3 rounded-full border border-white/20 shadow-lg">
                <span className="material-symbols-outlined text-white text-2xl">self_improvement</span>
              </div>
            </div>
          </Link>

          {/* Library Link */}
          <Link href="/biblioteca" className="glass-card shimmer-effect iridescent-border rounded-2xl p-5 flex items-center gap-5 active:bg-white/5 transition-colors cursor-pointer">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl">local_library</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Meditaciones</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Biblioteca de Sabiduría</p>
            </div>
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </Link>

          {/* Journal Link */}
          <Link href="/diario" className="glass-card shimmer-effect iridescent-border rounded-2xl p-5 flex items-center gap-5 active:bg-white/5 transition-colors cursor-pointer">
            <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl">auto_stories</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Diario &amp; IA</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Tu Oráculo Interior</p>
            </div>
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </Link>

          {/* Binaural Player */}
          <Link href="/sonidos" className="glass-card shimmer-effect iridescent-border rounded-2xl p-5 flex items-center gap-5 active:bg-white/5 transition-colors cursor-pointer">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center border border-primary/20">
              <span className="material-symbols-outlined text-primary text-2xl">graphic_eq</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Sonidos Binaurales</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Frecuencias de Sanación</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary/80">play_circle</span>
            </div>
          </Link>

          {/* Team / Gratitude (Replaced Team with Gratitude to maintain parity) */}
          <Link href="/gratitud" className="glass-card shimmer-effect iridescent-border rounded-2xl p-5 flex items-center gap-5 active:bg-white/5 transition-colors cursor-pointer">
            <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center border border-primary/20 overflow-hidden">
              <span className="material-symbols-outlined text-primary text-2xl">favorite</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Gratitud</h3>
              <p className="text-[11px] text-slate-500 uppercase tracking-wider">Diario de 28 Días</p>
            </div>
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </Link>
        </main>

        <footer className="mt-16 mb-8 text-center">
          <p className="text-slate-700 text-[9px] tracking-[0.4em] uppercase font-bold">
            Inner Path | Santuario de Bienestar
          </p>
        </footer>
      </div>

      <BottomNav />
    </>
  );
}
