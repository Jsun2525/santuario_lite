"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useJournal } from "@/hooks/useJournal";

export default function NuevoDiarioPage() {
    const [content, setContent] = useState("");
    const router = useRouter();
    const { user } = useAuth();
    const { saveEntry } = useJournal();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !user) return;

        await saveEntry(content);
        router.push("/diario");
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            <header className="flex items-center justify-between px-6 pt-14 pb-4">
                <Link href="/diario" className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-white transition-all active:scale-90">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </Link>
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Inner Path</p>
                    <h1 className="text-lg font-bold tracking-tight text-white">Nueva Reflexión</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="flex items-center justify-center size-10 rounded-full bg-primary text-white transition-all active:scale-90 disabled:opacity-50 disabled:bg-white/10 disabled:text-slate-500"
                >
                    <span className="material-symbols-outlined text-[20px]">check</span>
                </button>
            </header>

            <main className="px-6 py-6 h-[calc(100vh-120px)] flex flex-col">
                <p className="text-slate-400 text-sm mb-4 italic">
                    Lo que se escribe desde el corazón, el universo lo escucha.
                </p>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escribe tus pensamientos, emociones o gratitud del día..."
                    className="flex-1 w-full bg-transparent border-none outline-none resize-none text-lg text-slate-200 placeholder:text-slate-600 focus:ring-0"
                    autoFocus
                />
            </main>
        </div>
    );
}
