"use client";

import { useState, useEffect } from "react";

interface GratitudeData {
    currentStreak: number;
    maxStreak: number;
    lastDate: string | null;
    notes: { id: string; text: string; date: string }[];
}

export function useGratitude(userId: string) {
    const [data, setData] = useState<GratitudeData>({
        currentStreak: 0,
        maxStreak: 0,
        lastDate: null,
        notes: []
    });
    const [loading, setLoading] = useState(true);

    // Load from local storage on mount
    useEffect(() => {
        if (!userId) return;

        const stored = localStorage.getItem(`gratitude_data_${userId}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Validate streak logic on load (freeze vs reset)
            const now = new Date();
            if (parsed.lastDate) {
                const last = new Date(parsed.lastDate);
                const diffHours = (now.getTime() - last.getTime()) / (1000 * 60 * 60);

                // If more than 48 hours passed, streak resets to 0. 
                // 24h to 48h is the freeze grace period.
                if (diffHours > 48) {
                    parsed.currentStreak = 0;
                    parsed.lastDate = null; // Forces them to start day 1 again
                    localStorage.setItem(`gratitude_data_${userId}`, JSON.stringify(parsed));
                }
            }
            setData(parsed);
        }
        setLoading(false);
    }, [userId]);

    const saveNote = async (text: string) => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 600));

        const now = new Date();
        const newData = { ...data };

        // Check if they already saved today (prevent double increment)
        const isSameDay = newData.lastDate && new Date(newData.lastDate).toDateString() === now.toDateString();

        if (!isSameDay) {
            newData.currentStreak += 1;
            newData.maxStreak = Math.max(newData.maxStreak, newData.currentStreak);
            newData.lastDate = now.toISOString();
        }

        newData.notes.push({
            id: "note-" + Date.now(),
            text,
            date: now.toISOString()
        });

        localStorage.setItem(`gratitude_data_${userId}`, JSON.stringify(newData));
        setData(newData);

        // Webhook logic (mocked or actual fetch can stay here)
        if (newData.currentStreak === 28) {
            console.log("¡Racha de 28 días completada! (Webhook local trigger)");
            fetch("/api/webhooks/skool", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: userId + "@innerpath.app", // Mock
                    challenge_id: "gratitud_28",
                    completion_date: new Date().toISOString(),
                    user_name: "Usuario MVP"
                })
            }).catch(e => console.warn("Webhook failed in local MVP mode", e));
        }

        return { success: true };
    };

    return { ...data, loading, saveNote };
}
