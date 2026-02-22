import JapaMalaCounter from "@/components/JapaMalaCounter";
import Link from "next/link";

export default function JapaMalaPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="text-white/50 hover:text-white transition-colors flex items-center gap-2">
                    <span>← Volver</span>
                </Link>
            </div>
            <JapaMalaCounter />
        </div>
    );
}
