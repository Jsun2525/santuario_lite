import Link from "next/link";
import { MeditationTimer } from "@/components/MeditationTimer";
import dynamic from 'next/dynamic';
const AudioMixer = dynamic(() => import('@/components/AudioMixer').then(mod => mod.AudioMixer));

export default function MeditacionLibrePage() {
    return (
        <div className="bg-background-dark font-display text-slate-100 min-h-screen relative flex flex-col antialiased">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0f0a1d] to-background-dark"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse-gentle"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-success/5 blur-[100px] mix-blend-screen animate-pulse-gentle" style={{ animationDelay: '2s' }}></div>
            </div>

            <main className="relative z-10 flex flex-col h-screen w-full px-6 pt-safe overflow-y-auto pb-12">
                {/* Header */}
                <header className="flex items-center justify-between pt-8 h-16 shrink-0 relative z-20 mb-6">
                    <Link href="/biblioteca" className="flex items-center justify-center size-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-slate-100 hover:bg-white/10 transition-all active:scale-90">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </Link>
                    <div className="text-center">
                        <h2 className="text-sm font-bold tracking-widest text-white/90 uppercase">Silencio Interior</h2>
                    </div>
                    <div className="size-10"></div> {/* Spacer for centering */}
                </header>

                <div className="flex-1 flex flex-col gap-6 max-w-md mx-auto w-full">
                    <MeditationTimer />

                    <div className="mt-4">
                        <AudioMixer />
                    </div>
                </div>
            </main>
        </div>
    );
}
