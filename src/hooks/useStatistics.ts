"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

type Timeframe = 'Semana' | 'Mes';

interface DayData {
  label: string;
  value: number;
}

export function useStatistics() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<Timeframe>('Semana');
  const [moodData, setMoodData] = useState<DayData[]>([]);
  const [presenceData, setPresenceData] = useState<DayData[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [moodLabel, setMoodLabel] = useState('--');

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const days = timeframe === 'Semana' ? 7 : 30;
      const since = new Date();
      since.setDate(since.getDate() - days);

      // Fetch practice logs for presence data
      const { data: logs } = await supabase
        .from('practice_logs')
        .select('duration_minutes, created_at')
        .eq('user_id', user.id)
        .gte('created_at', since.toISOString());

      // Fetch mood checkins
      const { data: moods } = await supabase
        .from('mood_checkins')
        .select('mood, created_at')
        .eq('user_id', user.id)
        .gte('created_at', since.toISOString());

      // Aggregate by day of week for Semana view
      const dayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

      // Build presence chart data (minutes per day)
      const presenceByDay = dayLabels.map(label => ({ label, value: 0 }));
      let total = 0;
      (logs || []).forEach(log => {
        const d = new Date(log.created_at);
        const dayIndex = (d.getDay() + 6) % 7; // Monday=0
        presenceByDay[dayIndex].value += log.duration_minutes || 0;
        total += log.duration_minutes || 0;
      });

      // Build mood chart data (score per day, 1-5 scale)
      const moodScores: Record<string, number> = { sad: 1, neutral: 2, happy: 3, joyful: 4, transcendent: 5 };
      const moodByDay = dayLabels.map(label => ({ label, value: 0 }));
      const moodCounts = dayLabels.map(() => 0);
      (moods || []).forEach(m => {
        const d = new Date(m.created_at);
        const dayIndex = (d.getDay() + 6) % 7;
        moodByDay[dayIndex].value += moodScores[m.mood] || 3;
        moodCounts[dayIndex]++;
      });
      moodByDay.forEach((d, i) => {
        if (moodCounts[i] > 0) d.value = d.value / moodCounts[i];
      });

      // Overall mood label
      const avgMood = moods && moods.length > 0
        ? moods.reduce((s, m) => s + (moodScores[m.mood] || 3), 0) / moods.length
        : 0;
      const labels = ['Sin datos', 'Bajo', 'Regular', 'Bien', 'Muy bueno', 'Excelente'];
      setMoodLabel(labels[Math.min(Math.round(avgMood), 5)]);

      setPresenceData(presenceByDay);
      setMoodData(moodByDay);
      setTotalMinutes(total);
    };

    fetchStats();
  }, [user, timeframe]);

  return { timeframe, setTimeframe, moodData, presenceData, totalMinutes, moodLabel };
}
