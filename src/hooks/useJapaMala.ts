"use client";

import { useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export function useJapaMala() {
    const { user } = useAuth();
    /**
     * Logs a Japa Mala/Meditation session to Supabase
     */
    const saveSession = useCallback(async (practiceName: string = "Calma mental", durationMinutes: number = 0) => {
        if (!user) return { success: false, error: 'No user authed' };

        try {
            const { error } = await supabase
                .from('practice_logs')
                .insert({
                    user_id: user.id,
                    practice_type: 'japa_mala',
                    notes: practiceName,
                    duration_minutes: durationMinutes
                });

            if (error) throw error;
            return { success: true, error: null };
        } catch (e: any) {
            console.error(e);
            return { success: false, error: e.message };
        }
    }, [user]);

    return { saveSession };
}
