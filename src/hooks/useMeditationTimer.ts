"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export function useMeditationTimer() {
    const { user } = useAuth();
    const [elapsed, setElapsed] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const startTimeRef = useRef<number | null>(null);
    const pausedElapsedRef = useRef(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive) {
            interval = setInterval(() => {
                if (startTimeRef.current !== null) {
                    setElapsed(pausedElapsedRef.current + Math.floor((Date.now() - startTimeRef.current) / 1000));
                }
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive]);

    const handleCompletion = useCallback(async (totalSeconds: number) => {
        if (!user || totalSeconds < 10) return; // min 10 seconds to count

        const durationMinutes = Math.round(totalSeconds / 60);
        const actualMinutes = Math.max(durationMinutes, 1); // at least 1 minute

        // 1. Log practice session
        await supabase.from('practice_logs').insert({
            user_id: user.id,
            practice_type: 'Meditación Silenciosa',
            duration_minutes: actualMinutes,
            notes: `Sesión de ${formatTime(totalSeconds)} completada`
        });

        // 2. Add to total minutes in profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('total_meditation_minutes')
            .eq('id', user.id)
            .single();

        if (profile) {
            const newTotal = (profile.total_meditation_minutes || 0) + actualMinutes;
            await supabase
                .from('profiles')
                .update({ total_meditation_minutes: newTotal })
                .eq('id', user.id);
        }
    }, [user]);

    const start = () => {
        startTimeRef.current = Date.now();
        pausedElapsedRef.current = 0;
        setElapsed(0);
        setIsActive(true);
        setIsCompleted(false);
    };

    const pause = () => {
        pausedElapsedRef.current = elapsed;
        startTimeRef.current = null;
        setIsActive(false);
    };

    const resume = () => {
        startTimeRef.current = Date.now();
        setIsActive(true);
    };

    const stop = async () => {
        const finalElapsed = elapsed;
        setIsActive(false);
        setIsCompleted(true);
        startTimeRef.current = null;
        pausedElapsedRef.current = 0;
        if (finalElapsed >= 10) {
            await handleCompletion(finalElapsed);
        }
    };

    const reset = () => {
        setIsActive(false);
        setIsCompleted(false);
        setElapsed(0);
        startTimeRef.current = null;
        pausedElapsedRef.current = 0;
    };

    return {
        elapsed,
        elapsedFormatted: formatTime(elapsed),
        isActive,
        isCompleted,
        start,
        pause,
        resume,
        stop,
        reset
    };
}

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
