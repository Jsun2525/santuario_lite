"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGratitude } from "@/hooks/useGratitude";

export default function GratitudeWall() {
    const { user, loading: userLoading } = useAuth();
    const { currentStreak, maxStreak, saveNote, loading: streakLoading } = useGratitude(user?.id || "");
    const [note, setNote] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [synced, setSynced] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!note.trim() || !user) return;

        setIsSaving(true);
        await saveNote(note);

        setNote("");
        setSynced(true);
        setIsSaving(false);
        setTimeout(() => setSynced(false), 3000);
    };

    if (userLoading || streakLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white/50">Cargando racha...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 w-full max-w-2xl mx-auto">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-heading text-success gradient-text">Diario de Gratitud</h1>
                <p className="font-body text-white/70">Reto 28 Días: Eleva tu frecuencia recordando lo bueno.</p>
            </header>

            <div className="flex gap-6 w-full justify-center">
                <div className="glass-card p-6 flex flex-col items-center flex-1 relative group">
                    <span className="text-sm text-white/50 uppercase tracking-widest font-body">Racha Actual</span>
                    <span className="text-4xl font-heading font-bold text-white my-2">{currentStreak} / 28</span>
                    <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">Días Seguidos</span>

                    <div className="absolute top-full mt-2 w-48 text-[10px] text-white/50 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                        Tienes +24h de gracia si olvidas un día. Luego, la racha vuelve a cero.
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col items-center flex-1">
                    <span className="text-sm text-white/50 uppercase tracking-widest font-body">Mejor Racha</span>
                    <span className="text-4xl font-heading font-bold text-accent my-2">{maxStreak}</span>
                    <span className="text-xs text-white/30 px-2 py-1">Histórico</span>
                </div>
            </div>

            <form onSubmit={handleSave} className="glass-card w-full p-6 space-y-6 relative overflow-hidden">
                {synced && (
                    <div className="absolute inset-0 bg-success/20 backdrop-blur-sm z-20 flex items-center justify-center animate-fade-in">
                        <span className="text-2xl font-accent text-white drop-shadow-md">¡Gracias Registradas! ✨</span>
                    </div>
                )}

                <div className="space-y-4">
                    <label htmlFor="gratitude" className="block text-lg font-accent text-white/90">
                        ¿Por qué estás agradecido hoy?
                    </label>
                    <textarea
                        id="gratitude"
                        rows={4}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-success/50 focus:ring-1 focus:ring-success/50 transition-all resize-none"
                        placeholder="Hoy agradezco profundamente por..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSaving || !note.trim()}
                    className="w-full py-4 rounded-xl font-bold font-body tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-success hover:bg-success/80 text-black shadow-[0_0_20px_rgba(46,204,113,0.3)] hover:shadow-[0_0_30px_rgba(46,204,113,0.5)]"
                >
                    {isSaving ? "Sincronizando..." : "SELLAR GRATITUD"}
                </button>
            </form>
        </div>
    );
}
