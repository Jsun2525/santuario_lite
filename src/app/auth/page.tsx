"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingMsg, setLoadingMsg] = useState("");
    const router = useRouter();
    const { signIn } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingMsg("Conectando con el Santuario...");
        setErrorMsg("");

        if (!email || !password) {
            setErrorMsg("Por favor, ingresa tu email y contraseña");
            setLoadingMsg("");
            return;
        }

        const { error } = await signIn(email, password);

        if (error) {
            // For MVP mock user, this shouldn't fail, but let's handle it
            setErrorMsg(error.message || "Error al iniciar sesión");
            setLoadingMsg("");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-slate-100 relative overflow-hidden bg-background-dark font-display">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(125,48,248,0.15),transparent),radial-gradient(circle_at_bottom_left,rgba(125,48,248,0.1),transparent)]"></div>
            <div className="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-5%] left-[-5%] w-[250px] h-[250px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col min-h-screen w-full">
                {/* Top Navigation */}
                <header className="flex items-center justify-between p-6">
                    <Link href="/" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        <span className="text-sm font-medium tracking-wide">Volver</span>
                    </Link>
                    <div className="w-8"></div> {/* Spacer for symmetry */}
                </header>

                {/* Main Content Container */}
                <main className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
                    {/* Branding */}
                    <div className="text-center mb-10">
                        <h1 className="font-accent text-5xl md:text-6xl italic font-light tracking-tight text-white mb-2">Inner Path</h1>
                        <p className="text-primary font-light tracking-[0.3em] text-xs uppercase">Santuario de Bienestar</p>
                    </div>

                    {/* Auth Glass Card */}
                    <div className="glass-card w-full max-w-[400px] p-8 rounded-xl shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-4">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-full h-14 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-4">Contraseña</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-full h-14 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base pr-12"
                                        placeholder="••••••••"
                                    />
                                    <button className="absolute right-4 text-slate-500 hover:text-white transition-colors" type="button">
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded border border-red-500/20">
                                    {errorMsg}
                                </div>
                            )}

                            {/* Forgot Password */}
                            <div className="flex justify-end px-2">
                                <button className="text-xs text-slate-400 hover:text-primary transition-colors" type="button">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {/* Main Action Button */}
                            <button
                                type="submit"
                                disabled={!!loadingMsg}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-full shadow-[0_0_20px_rgba(125,48,248,0.3)] tracking-[0.1em] text-sm uppercase transition-all active:scale-[0.98] disabled:opacity-50"
                            >
                                {loadingMsg || "Entrar"}
                            </button>
                        </form>

                        {/* Footer Toggle */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400 text-sm">
                                ¿Nuevo en el santuario?
                                <button className="text-primary font-bold ml-1 hover:underline underline-offset-4">Crear cuenta</button>
                            </p>
                        </div>
                    </div>

                    {/* Social Auth */}
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">O conecta con</span>
                        <div className="flex gap-4">
                            <button className="size-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
                                <img alt="Apple Icon" className="w-5 h-5 invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLm75w7HK01vpOZzspY19lzaZtFE9GPFPv0jZDyabZKmzsrDcBRuOuoF6bnPZghlXWE5SAGCqGjtTnFIjiknbkN_Za-FTr0vjvYuNZVVuW3MTZ0une6vAvBGnzRRAM1fIhY-YpmkIdVId4ItsCe6XvUgkBmVwkJ3NOekjhoylPprXO40TJaZQF_yqn0DwjpXW0_sxBKebK9kKNO4VCsyey1wMRck-Ty7iRgm5zwAiIk4KUGCAn2g0F1I0jy4zAEAXFopg6JF8ciz2S" />
                            </button>
                            <button className="size-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-white">mail</span>
                            </button>
                        </div>
                    </div>
                </main>

                {/* Bottom Safe Area */}
                <footer className="h-8"></footer>
            </div>
        </div>
    );
}
