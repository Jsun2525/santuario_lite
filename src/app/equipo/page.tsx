import TeamSection from "@/components/TeamSection";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function EquipoPage() {
    return (
        <div className="relative min-h-screen pb-24">
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-md">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    <span>Volver al Inicio</span>
                </Link>
            </div>
            <TeamSection />
            <BottomNav />
        </div>
    );
}
