import { useState, useEffect, useCallback } from 'react';

export interface JournalEntry {
    id: string;
    date: string;
    content: string;
    mood?: string;
}

export function useJournal() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
    const [insight, setInsight] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('innerpath_journal');
        if (stored) {
            setEntries(JSON.parse(stored));
        }
    }, []);

    const saveEntry = useCallback((content: string, mood?: string) => {
        const newEntry: JournalEntry = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            content,
            mood,
        };
        const updated = [newEntry, ...entries];
        setEntries(updated);
        localStorage.setItem('innerpath_journal', JSON.stringify(updated));
    }, [entries]);

    const generateAIInsight = useCallback(async () => {
        setIsGeneratingInsight(true);
        setInsight(null);
        try {
            // Mocked N8N webhook call
            // Replace with your actual n8n webhook URL
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://example.com/webhook/ai-oracle';
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entries }),
            });

            // For MVP without real webhook, we mock response after delay if it fails
            if (!response.ok) throw new Error('Webhook failed');
            const data = await response.json();
            setInsight(data.insight || 'Las estrellas nos guían hacia la serenidad. Tu camino es claro.');
        } catch (error) {
            // Fallback response for MVP
            await new Promise(r => setTimeout(r, 2000));
            setInsight('El universo conspira a tu favor. He analizado tus entradas y veo un patrón de crecimiento espiritual y calma interior que se expande cada día.');
        } finally {
            setIsGeneratingInsight(false);
        }
    }, [entries]);

    return { entries, saveEntry, generateAIInsight, isGeneratingInsight, insight };
}
