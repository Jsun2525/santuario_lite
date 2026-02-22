"use client";

import { useCallback } from "react";

export function useJapaMala() {
    /**
     * Logs a Japa Mala session
     * MVP: Saves to LocalStorage array. Future: Supabase insert
     */
    const saveSession = useCallback(async (userId: string, emotion: string = "Calma mental") => {
        try {
            // Simulate network request
            await new Promise(r => setTimeout(r, 100));

            const logsStr = localStorage.getItem("japa_mala_logs");
            const logs = logsStr ? JSON.parse(logsStr) : [];

            logs.push({
                id: "log-" + Date.now(),
                user_id: userId,
                emotion: emotion,
                completed_at: new Date().toISOString()
            });

            localStorage.setItem("japa_mala_logs", JSON.stringify(logs));
            return { success: true, error: null };
        } catch (e: any) {
            console.error(e);
            return { success: false, error: e.message };
        }
    }, []);

    return { saveSession };
}
