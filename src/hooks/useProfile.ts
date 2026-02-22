import { useState, useEffect } from 'react';

export interface SpiritualProfile {
    name: string;
    level: string;
    meditationMinutes: number;
    journalEntries: number;
    streak: number;
    achievements: string[];
}

export function useProfile() {
    const [profile, setProfile] = useState<SpiritualProfile>({
        name: 'Buscador Espiritual',
        level: 'Iniciado',
        meditationMinutes: 0,
        journalEntries: 0,
        streak: 0,
        achievements: ['El Primer Paso', 'Mente Abierta'],
    });

    useEffect(() => {
        // Load aggregated stats from localStorage for MVP rendering
        const journals = JSON.parse(localStorage.getItem('innerpath_journal') || '[]');
        const malaLogs = JSON.parse(localStorage.getItem('innerpath_japa_mala_logs') || '[]');
        const streakData = JSON.parse(localStorage.getItem('innerpath_gratitude_streak') || '{}');

        setProfile(p => ({
            ...p,
            journalEntries: journals.length,
            // Mocking 10 mins per mala session
            meditationMinutes: malaLogs.length * 10,
            streak: streakData.current_streak || 0,
            level: malaLogs.length > 5 || journals.length > 5 ? 'Guardián de la Paz' : 'Iniciado',
        }));
    }, []);

    return profile;
}
