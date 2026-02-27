"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function SkoolVerification({ onVerify }: { onVerify: () => void }) {
    const [email, setEmail] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setVerifying(true);
        setError(null);

        try {
            // Forward to n8n webhook for Skool membership check
            // The N8N_WEBHOOK_URL should point to the new verification workflow
            const response = await fetch("/api/webhooks/skool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "member_verification",
                    email: email,
                }),
            });

            const result = await response.json();

            if (result.active) {
                setIsVerified(true);
            } else {
                setError("No pudimos encontrar una suscripción activa con este correo en Skool.");
            }
        } catch (err) {
            setError("Error al verificar. Por favor intenta de nuevo.");
        } finally {
            setVerifying(false);
        }
    };

    if (isVerified) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-4xl text-green-400">✅</div>
                <h2 className="text-2xl font-bold text-white">¡Verificado!</h2>
                <p className="text-center text-gray-300 text-sm">
                    Suscripción activa encontrada. Ahora puedes acceder.
                </p>
                <button
                    onClick={onVerify}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all font-display uppercase tracking-widest text-xs"
                >
                    Continuar al Santuario
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleVerify} className="flex flex-col space-y-4 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md w-full">
            <h2 className="text-2xl font-bold text-white text-center">Bienvenido al Santuario</h2>
            <p className="text-center text-gray-300 text-sm">
                Para ingresar, verifica el correo vinculado a tu suscripción de Skool.
            </p>

            <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all"
            />

            {error && <p className="text-red-400 text-xs text-center">{error}</p>}

            <button
                type="submit"
                disabled={verifying}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
            >
                {verifying ? "Verificando..." : "Verificar Membresía"}
            </button>
        </form>
    );
}
