"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

export interface AudioSettings {
    voice_volume: number;
    music_volume: number;
    sfx_volume: number;
    active_sfx: string | null;
    active_music: string | null;
    active_voice: string | null;
}

const DEFAULT_SETTINGS: AudioSettings = {
    voice_volume: 1.0,
    music_volume: 0.5,
    sfx_volume: 0.3,
    active_voice: null,
    active_music: null,
    active_sfx: null,
};

export function useAudioMixer() {
    const { user } = useAuth();
    const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
    const [isMasterPlaying, setIsMasterPlaying] = useState(false);

    // Audio references for the 3 layers
    const voiceRef = useRef<HTMLAudioElement | null>(null);
    const musicRef = useRef<HTMLAudioElement | null>(null);
    const sfxRef = useRef<HTMLAudioElement | null>(null);

    // Load saved settings from Supabase
    useEffect(() => {
        if (!user) return;

        const loadSettings = async () => {
            const { data } = await supabase
                .from('user_settings')
                .select('favorite_atmosphere')
                .eq('user_id', user.id)
                .single();

            if (data?.favorite_atmosphere) {
                setSettings({ ...DEFAULT_SETTINGS, ...(data.favorite_atmosphere as any) });
            } else {
                // Initialize default row if not exists
                await supabase.from('user_settings').insert({
                    user_id: user.id,
                    favorite_atmosphere: DEFAULT_SETTINGS
                });
            }
        };

        loadSettings();
    }, [user, DEFAULT_SETTINGS]);

    // Save settings debounced to Supabase
    const saveSettingsToDB = useCallback(async (newSettings: AudioSettings) => {
        if (!user) return;
        await supabase
            .from('user_settings')
            .update({ favorite_atmosphere: newSettings })
            .eq('user_id', user.id);
    }, [user]);

    // Handle audio src initialization and playing state
    useEffect(() => {
        const updateAudioLayer = (ref: React.MutableRefObject<HTMLAudioElement | null>, src: string | null, vol: number) => {
            if (src) {
                // Lazy initialization: ONLY create new Audio if isMasterPlaying is true OR if it already exists
                if (!ref.current && !isMasterPlaying) {
                    return;
                }

                if (!ref.current || ref.current.src !== src) {
                    // Need new Audio object or change src
                    if (ref.current) {
                        ref.current.pause();
                        ref.current.src = src;
                    } else {
                        ref.current = new Audio(src);
                        ref.current.loop = true;
                    }
                }

                if (ref.current) {
                    ref.current.volume = vol;
                    if (isMasterPlaying) {
                        ref.current.play().catch(console.error);
                    } else {
                        ref.current.pause();
                    }
                }
            } else {
                if (ref.current) {
                    ref.current.pause();
                    ref.current.src = "";
                }
            }
        };

        updateAudioLayer(voiceRef, settings.active_voice, settings.voice_volume);
        updateAudioLayer(musicRef, settings.active_music, settings.music_volume);
        updateAudioLayer(sfxRef, settings.active_sfx, settings.sfx_volume);

    }, [settings.active_voice, settings.active_music, settings.active_sfx, isMasterPlaying, settings.voice_volume, settings.music_volume, settings.sfx_volume]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            [voiceRef, musicRef, sfxRef].forEach(ref => {
                if (ref.current) {
                    ref.current.pause();
                    ref.current.src = '';
                }
            });
        };
    }, []);

    const togglePlay = useCallback(() => {
        setIsMasterPlaying(prev => !prev);
    }, []);

    const updateVolume = useCallback((layer: 'voice' | 'music' | 'sfx', volume: number) => {
        setSettings(prev => {
            const next = { ...prev, [`${layer}_volume`]: volume };
            // Optional: debounced save could be added here
            return next;
        });
    }, []);

    const setTrack = useCallback((layer: 'voice' | 'music' | 'sfx', url: string | null) => {
        setSettings(prev => {
            const next = { ...prev, [`active_${layer}`]: url };
            saveSettingsToDB(next);
            return next;
        });
    }, [saveSettingsToDB]);

    return {
        settings,
        isMasterPlaying,
        togglePlay,
        updateVolume,
        setTrack,
        saveSettings: () => saveSettingsToDB(settings)
    };
}
