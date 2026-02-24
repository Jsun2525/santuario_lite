"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export interface TimerSettings {
    duration_minutes: number;
    preparation_seconds: number;
}

export function useMeditationTimer(initialDuration = 10) {
    const { user } = useAuth();
    const [timeLeft, setTimeLeft] = useState(initialDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [mode, setMode] = useState<'prep' | 'meditation'>('prep');

    // Track total time for DB insertion on completion.
    const durationRef = useRef(initialDuration);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            if (mode === 'prep') {
                // Switch from preparation to meditation
                setMode('meditation');
                setTimeLeft(durationRef.current * 60);
                // Optional: Play a starting bell sound here
            } else {
                // Meditation completed
                setIsActive(false);
                setIsCompleted(true);
                handleCompletion();
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, mode]);

    const handleCompletion = useCallback(async () => {
        if (!user) return;

        // 1. Log practice session
        await supabase.from('practice_logs').insert({
            user_id: user.id,
            practice_type: 'Meditación Silenciosa',
            duration_minutes: durationRef.current,
            notes: 'Completado desde el Timer de Meditación'
        });

        // 2. Add to total minutes in profile and handle Gamification
        const { data: profile } = await supabase
            .from('profiles')
            .select('total_meditation_minutes')
            .eq('id', user.id)
            .single();

        if (profile) {
            const newTotal = (profile.total_meditation_minutes || 0) + durationRef.current;
            await supabase
                .from('profiles')
                .update({ total_meditation_minutes: newTotal })
                .eq('id', user.id);
        }
    }, [user]);

    const startTimer = (durationMinutes: number) => {
        durationRef.current = durationMinutes;
        setMode('prep');
        setTimeLeft(5); // 5 seconds of prep time
        setIsActive(true);
        setIsCompleted(false);
    };

    const pauseTimer = () => setIsActive(false);
    const resumeTimer = () => setIsActive(true);
    const stopTimer = () => {
        setIsActive(false);
        setTimeLeft(initialDuration * 60);
        setMode('prep');
    };

    // Format mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return {
        timeLeftFormatted: formatTime(timeLeft),
        timeLeft,
        isActive,
        isCompleted,
        mode,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer
    };
}
