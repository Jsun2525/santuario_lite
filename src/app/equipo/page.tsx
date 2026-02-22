import TeamSection from "@/components/TeamSection";
import Link from "next/link";

export default function EquipoPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-md">
                    <span>← Volver al Dashboard</span>
                </Link>
            </div>
            <TeamSection />
        </div>
    );
}
