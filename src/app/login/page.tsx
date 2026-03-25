"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [googleLoading, setGoogleLoading] = useState(false);
    const [magicLoading, setMagicLoading] = useState(false);
    const { signInWithGoogle, signInWithMagicLink } = useAuth();

    const handleMagicLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!email) {
            setErrorMsg("Por favor, ingresa tu correo electrónico");
            return;
        }

        setMagicLoading(true);
        const { error } = await signInWithMagicLink(email);

        if (error) {
            setErrorMsg(error.message || "Error al enviar el enlace");
        } else {
            setSuccessMsg("Revisa tu correo");
        }
        setMagicLoading(false);
    };

    const handleGoogleLogin = async () => {
        setErrorMsg("");
        setGoogleLoading(true);
        const { error } = await signInWithGoogle();
        if (error) {
            setErrorMsg(error.message || "Error al conectar con Google");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full flex-col overflow-x-hidden violet-glow bg-background-dark font-heading text-slate-100">
            {/* Top spacer */}
            <div className="h-12 w-full"></div>

            {/* Main content */}
            <div className="flex flex-col items-center justify-center flex-1 px-8 pb-12">
                {/* Brand */}
                <div className="mb-12 text-center">
                    <h1 className="font-accent text-[48px] font-bold leading-tight text-white text-glow mb-2">
                        Santuario
                    </h1>
                    <p className="font-sans text-slate-400 text-lg font-medium tracking-wide">
                        Tu espacio sagrado
                    </p>
                </div>

                {/* Google button */}
                <div className="w-full max-w-sm mb-8">
                    <button
                        onClick={handleGoogleLogin}
                        disabled={googleLoading}
                        className="flex w-full items-center justify-center rounded-full h-14 px-6 bg-white text-slate-900 gap-3 font-bold transition-transform active:scale-95 shadow-xl disabled:opacity-70"
                    >
                        {googleLoading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        <span className="font-sans">Continuar con Google</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full max-w-sm flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-slate-800"></div>
                    <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">o</span>
                    <div className="h-px flex-1 bg-slate-800"></div>
                </div>

                {/* Magic link form */}
                <form onSubmit={handleMagicLink} className="w-full max-w-sm space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-14 bg-input-bg border-none rounded-xl px-6 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:outline-none transition-all font-sans"
                        placeholder="Tu correo electrónico"
                    />

                    {errorMsg && (
                        <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg border border-red-500/20">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="text-emerald-400 text-sm text-center bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/20 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            {successMsg}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={magicLoading}
                        className="w-full h-14 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {magicLoading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                                <span className="font-sans">Enviar link magico</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer text */}
                <div className="mt-8 text-center px-4">
                    <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[240px] mx-auto font-sans opacity-80">
                        Accede sin contrasena — te enviamos un link seguro
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="h-8 w-full flex justify-center items-end pb-2">
                <div className="w-32 h-1 bg-slate-800 rounded-full opacity-50"></div>
            </div>

            {/* Background blurs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute top-[60%] -right-[20%] w-[70%] h-[50%] bg-primary-dark/5 blur-[100px] rounded-full"></div>
            </div>
        </div>
    );
}
