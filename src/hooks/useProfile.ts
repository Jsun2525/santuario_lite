import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

export interface SpiritualProfile {
    name: string;
    level: string;
    meditationMinutes: number;
    journalEntries: number;
    streak: number;
    achievements: string[];
}

export function useProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<SpiritualProfile>({
        name: 'Buscador Espiritual',
        level: 'Iniciado',
        meditationMinutes: 0,
        journalEntries: 0,
        streak: 0,
        achievements: ['El Primer Paso', 'Mente Abierta'],
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            // Fetch core profile stats
            const { data: profileData } = await supabase
                .from('profiles')
                .select('total_meditation_minutes, current_streak')
                .eq('id', user.id)
                .single();

            // Fetch journal entries count
            const { count: journalCount } = await supabase
                .from('journal_entries')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id);

            setProfile(p => ({
                ...p,
                name: user.user_metadata?.full_name || p.name,
                journalEntries: journalCount || 0,
                meditationMinutes: profileData?.total_meditation_minutes || 0,
                streak: profileData?.current_streak || 0,
                level: (profileData?.total_meditation_minutes || 0) > 60 ? 'Guardián de la Paz' : 'Iniciado',
            }));
        };

        fetchProfile();
    }, [user]);

    return profile;
}
