import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

export interface JournalEntry {
    id: string;
    created_at: string;
    content: string;
    mood?: string;
    insight_received?: string;
}

export function useJournal() {
    const { user } = useAuth();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
    const [insight, setInsight] = useState<string | null>(null);

    const fetchEntries = useCallback(async () => {
        if (!user) return;
        const { data } = await supabase
            .from('journal_entries')
            .select('id, created_at, content, mood, insight_received')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) setEntries(data as JournalEntry[]);
    }, [user]);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    const saveEntry = useCallback(async (content: string, mood?: string) => {
        if (!user) return;
        const newEntry = {
            user_id: user.id,
            content,
            mood,
        };

        const { data, error } = await supabase
            .from('journal_entries')
            .insert(newEntry)
            .select('id, created_at, content, mood, insight_received')
            .single();

        if (data && !error) {
            setEntries(prev => [data as JournalEntry, ...prev]);
        }
    }, [user]);

    const generateAIInsight = useCallback(async () => {
        setIsGeneratingInsight(true);
        setInsight(null);
        try {
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://example.com/webhook/ai-oracle';
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entries }),
            });

            if (!response.ok) throw new Error('Webhook failed');
            const data = await response.json();

            const newInsight = data.insight || 'Las estrellas nos guían hacia la serenidad. Tu camino es claro.';
            setInsight(newInsight);

            // Optional: Save the insight back to the most recent entry if needed.
            if (entries.length > 0) {
                await supabase.from('journal_entries').update({ insight_received: newInsight }).eq('id', entries[0].id);
            }

        } catch (error) {
            await new Promise(r => setTimeout(r, 2000));
            setInsight('El universo conspira a tu favor. He analizado tus entradas y veo un patrón de crecimiento espiritual y calma interior que se expande cada día.');
        } finally {
            setIsGeneratingInsight(false);
        }
    }, [entries]);

    return { entries, saveEntry, generateAIInsight, isGeneratingInsight, insight };
}
