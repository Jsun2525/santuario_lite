"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event) => {
            if (event === "SIGNED_IN") {
                router.push("/");
            }
        });
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background-dark text-white">
            <div className="text-center space-y-4">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-slate-400 text-sm">Conectando con el Santuario...</p>
            </div>
        </div>
    );
}
