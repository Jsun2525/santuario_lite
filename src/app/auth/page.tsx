"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import SkoolVerification from "@/components/SkoolVerification";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loadingMsg, setLoadingMsg] = useState("");
    const [isVerified, setIsVerified] = useState(false); // New state for Skool verification
    const router = useRouter();
    const { signIn, signInWithGoogle } = useAuth();

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
            setErrorMsg(error.message || "Error al iniciar sesión");
            setLoadingMsg("");
        } else {
            router.push("/");
        }
    };

    if (!isVerified) {
        return (
            <div className="flex flex-col min-h-screen text-slate-100 relative overflow-hidden bg-background-dark font-display">
                <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(125,48,248,0.15),transparent)]"></div>
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
                    <div className="text-center mb-10">
                        <h1 className="font-accent text-5xl italic font-light tracking-tight text-white mb-2">Inner Path</h1>
                        <p className="text-primary font-light tracking-[0.3em] text-xs uppercase text-center">Santuario de Bienestar</p>
                    </div>
                    {/* Skool Verification Gate */}
                    <div className="w-full max-w-[400px]">
                        <SkoolVerification onVerify={() => setIsVerified(true)} />
                    </div>
                </div>
            </div>
        );
    }

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
                            <button
                                onClick={() => signInWithGoogle()}
                                className="size-12 rounded-full glass-card flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
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
