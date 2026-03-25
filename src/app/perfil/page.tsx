"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

export default function PerfilPage() {
    const { user, signOut } = useAuth();
    const profile = useProfile();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/login");
    };

    const avatarUrl = user?.user_metadata?.avatar_url;
    const fullName = user?.user_metadata?.full_name || "Buscador de Luz";
    const level = Math.floor(profile.meditationMinutes / 60) + 1;
    const cycle = Math.floor(level / 5) + 1;

    return (
        <div className="font-display text-slate-100 antialiased overflow-x-hidden selection:bg-primary/30">
            <div className="relative flex min-h-screen w-full flex-col bg-[#0D0D1A] max-w-[430px] mx-auto overflow-hidden pb-32">

                {/* Header — sticky with backdrop blur */}
                <header className="sticky top-0 z-40 bg-[#0D0D1A]/80 backdrop-blur-md py-6">
                    <h1 className="text-xl font-bold text-center tracking-tight">Perfil del Santuario</h1>
                </header>

                {/* Profile section */}
                <section className="flex flex-col items-center px-6 mt-2">
                    {/* Avatar with gradient ring */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-500 blur-lg opacity-50 scale-110" />
                        <div className="relative z-10 size-24 rounded-full border-2 border-[#0D0D1A] p-0.5 bg-gradient-to-br from-primary to-blue-500">
                            {avatarUrl ? (
                                <Image
                                    alt="Avatar"
                                    width={96}
                                    height={96}
                                    className="w-full h-full object-cover rounded-full"
                                    src={avatarUrl}
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-[#0D0D1A] flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-500">person</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Name */}
                    <h2 className="mt-5 text-2xl font-bold tracking-tight">{fullName}</h2>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Senda de la Iluminación</p>

                    {/* Level badge */}
                    <p className="text-slate-400 text-sm mt-2">
                        Nivel {level} · Ciclo {cycle}
                    </p>

                    {/* Nature element tag */}
                    <div className="mt-3 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium">
                        🌿 Naturaleza [Aire]
                    </div>
                </section>

                {/* Stats grid 2x2 */}
                <section className="px-6 mt-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl">hourglass_bottom</span>
                            <p className="text-xl font-bold">{profile.meditationFormatted}</p>
                            <p className="text-[11px] text-slate-400">Horas de Meditación</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
                            <p className="text-xl font-bold">{profile.streak}</p>
                            <p className="text-[11px] text-slate-400">Días de Práctica</p>
                        </div>
                    </div>
                </section>

                {/* Achievements 2x2 */}
                <section className="px-6 mt-8">
                    <h3 className="text-lg font-bold mb-4">Logros</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Unlocked */}
                        <div className="bg-primary/20 border border-primary/30 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_0_20px_rgba(136,40,226,0.15)]">
                            <span className="material-symbols-outlined text-primary text-3xl fill-[1]">self_improvement</span>
                            <p className="text-sm font-bold">Mente Clara</p>
                        </div>
                        <div className="bg-primary/20 border border-primary/30 rounded-2xl p-5 flex flex-col items-center text-center gap-2 shadow-[0_0_20px_rgba(136,40,226,0.15)]">
                            <span className="material-symbols-outlined text-blue-500 text-3xl fill-[1]">water_drop</span>
                            <p className="text-sm font-bold">Flujo Sereno</p>
                        </div>
                        {/* Locked */}
                        <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-2 opacity-40">
                            <span className="material-symbols-outlined text-slate-400 text-3xl">local_fire_department</span>
                            <p className="text-sm font-bold">Despertar Interior</p>
                        </div>
                        <div className="bg-slate-800/40 border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-2 opacity-40">
                            <span className="material-symbols-outlined text-slate-400 text-3xl">air</span>
                            <p className="text-sm font-bold">Respiro Astral</p>
                        </div>
                    </div>
                </section>

                {/* Settings list */}
                <section className="px-6 mt-8 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
                        <Link href="#" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-slate-300 text-xl">edit</span>
                            <span className="text-sm font-medium">Editar Perfil</span>
                        </Link>
                        <Link href="/quiz" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-slate-300 text-xl">quiz</span>
                            <span className="text-sm font-medium">Rehacer Cuestionario</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-slate-300 text-xl">accessibility_new</span>
                            <span className="text-sm font-medium">Restricciones Físicas</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-slate-300 text-xl">schedule</span>
                            <span className="text-sm font-medium">Duración Preferida</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                            <span className="text-sm font-medium text-primary">Suscripción Premium</span>
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-red-500 text-xl">logout</span>
                            <span className="text-sm font-medium text-red-500">Cerrar Sesión</span>
                        </button>
                    </div>
                </section>

                <BottomNav />
            </div>

            {/* Ambient background blobs */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
