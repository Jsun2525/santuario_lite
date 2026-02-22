import { useState, useEffect, useRef, useCallback } from 'react';

export const FREQUENCIES = {
    NORMAL: 1.0,
    HEALING_432: 0.9818, // 432Hz / 440Hz approx pitch shift for standard audio (mock)
    DNA_528: 1.2,
};

export function useAudioPlayer(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [frequency, setFrequency] = useState(FREQUENCIES.NORMAL);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audio.playbackRate = frequency; // Using playbackRate to simulate frequency shift safely in JS without Web Audio API complex logic for MVP

        // Attempt auto-play if it was previously playing or based on user interaction policy
        // But browsers block auto-play without gesture.
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = ''; // cleanup
            audioRef.current = null;
        };
    }, [src]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = frequency;
        }
    }, [frequency]);

    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    }, [isPlaying]);

    const play = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }, []);

    const pause = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
    }, []);

    return { isPlaying, togglePlay, play, pause, volume, setVolume, frequency, setFrequency };
}
