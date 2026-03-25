import JapaMalaCounter from "@/components/JapaMalaCounter";
import { BottomNav } from "@/components/BottomNav";

export default function JapaMalaPage() {
    return (
        <div className="relative min-h-screen">
            <JapaMalaCounter />
            <BottomNav />
        </div>
    );
}
