"use client";

import Link from "next/link";
import { MeditationTimer } from "@/components/MeditationTimer";
import { BottomNav } from "@/components/BottomNav";

export default function MeditacionLibrePage() {
    return (
        <div className="bg-[#081211] font-display text-slate-100 min-h-screen relative flex flex-col antialiased">
            {/* Teal ambient background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1a18] to-[#081211]" />
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#13ecda]/8 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: "4s" }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#13ecda]/5 blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: "6s" }} />
            </div>

            <main className="relative z-10 flex flex-col flex-1 w-full px-6 pt-safe overflow-y-auto pb-28">
                {/* Header */}
                <header className="flex items-center justify-between pt-12 pb-4 shrink-0">
                    <Link
                        href="/"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#132a28]/50 text-[#13ecda]/80 hover:bg-[#132a28] transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Cron&oacute;metro Zen
                    </h1>
                    <div className="w-10 h-10" /> {/* Spacer */}
                </header>

                {/* Timer Content */}
                <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full py-8">
                    <MeditationTimer />
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
