"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

interface GratitudeData {
    currentStreak: number;
    maxStreak: number;
    lastDate: string | null;
}

export function useGratitude() {
    const { user } = useAuth();
    const [data, setData] = useState<GratitudeData>({
        currentStreak: 0,
        maxStreak: 0,
        lastDate: null,
    });
    const [loading, setLoading] = useState(true);

    const fetchChallenge = useCallback(async () => {
        if (!user) return;

        // MVP: Using current_day as currentStreak for the Gratitude Challenge
        const { data: challengeData, error } = await supabase
            .from('user_mantra_challenges')
            .select('current_day, last_logged_date')
            .eq('user_id', user.id)
            .eq('status', 'active')
            .single();

        // Also fetch profile max streak to display
        const { data: profileData } = await supabase
            .from('profiles')
            .select('max_streak')
            .eq('id', user.id)
            .single();

        if (challengeData) {
            // Validate freeze logic
            const now = new Date();
            const last = challengeData.last_logged_date ? new Date(challengeData.last_logged_date) : null;
            let currentStrk = challengeData.current_day || 0;
            let resetNeeded = false;

            if (last) {
                const diffHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);
                if (diffHours > 48) {
                    currentStrk = 0;
                    resetNeeded = true;
                }
            }

            if (resetNeeded) {
                await supabase
                    .from('user_mantra_challenges')
                    .update({ current_day: 0, last_logged_date: null })
                    .eq('user_id', user.id)
                    .eq('status', 'active');
            }

            setData({
                currentStreak: currentStrk,
                lastDate: challengeData.last_logged_date,
                maxStreak: profileData?.max_streak || 0
            });
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchChallenge();
    }, [fetchChallenge]);

    const saveNote = async (text: string) => {
        if (!user) return { success: false };

        const now = new Date();
        const isSameDay = data.lastDate && new Date(data.lastDate).toDateString() === now.toDateString();

        let newStreak = data.currentStreak;

        if (!isSameDay) {
            newStreak += 1;
            const newMaxStreak = Math.max(data.maxStreak, newStreak);

            // 1. Update Profile max streak if needed
            if (newMaxStreak > data.maxStreak) {
                await supabase.from('profiles').update({ max_streak: newMaxStreak, current_streak: newStreak }).eq('id', user.id);
            } else {
                await supabase.from('profiles').update({ current_streak: newStreak }).eq('id', user.id);
            }

            // 2. Update Challenge tracking table
            // In a real app we'd get the actual challenge ID, for MVP we do a general update or upsert
            const { data: existingChallenge } = await supabase
                .from('user_mantra_challenges')
                .select('id')
                .eq('user_id', user.id)
                .eq('status', 'active')
                .single();

            if (existingChallenge) {
                await supabase
                    .from('user_mantra_challenges')
                    .update({ current_day: newStreak, last_logged_date: now.toISOString() })
                    .eq('id', existingChallenge.id);
            } else {
                await supabase
                    .from('user_mantra_challenges')
                    .insert({ user_id: user.id, current_day: newStreak, last_logged_date: now.toISOString(), status: 'active' });
            }

            setData({ currentStreak: newStreak, maxStreak: newMaxStreak, lastDate: now.toISOString() });
        }

        // 3. Save gratitude note as a journal entry
        await supabase.from('journal_entries').insert({
            user_id: user.id,
            content: text,
            mood: 'gratitud'
        });

        // Webhook logic
        if (newStreak === 21) {
            // 21 days challenge completed
            await supabase
                .from('user_mantra_challenges')
                .update({ status: 'completed' })
                .eq('user_id', user.id)
                .eq('status', 'active');

            fetch("/api/webhooks/skool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    challenge_id: "gratitud_21",
                    completion_date: now.toISOString(),
                    user_name: user.user_metadata?.full_name
                })
            }).catch(e => console.warn("Webhook failed", e));
        }

        return { success: true };
    };

    return { ...data, loading, saveNote };
}
