"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './useAuth';

type Timeframe = 'Semana' | 'Mes';

interface DayData {
  label: string;
  value: number;
}

export interface Insight {
  icon: string;
  color: string;
  title: string;
  description: string;
}

const MOOD_SCORES: Record<string, number> = { sad: 1, neutral: 2, happy: 3, joyful: 4, transcendent: 5 };
const MOOD_LABELS = ['Sin datos', 'Bajo', 'Regular', 'Bien', 'Muy bueno', 'Excelente'];

function formatDateLabel(date: Date): string {
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

function getDayOfWeekLabel(date: Date): string {
  return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][date.getDay()];
}

function buildWeekData(
  logs: { duration_minutes: number; created_at: string }[],
  moods: { mood: string; created_at: string }[]
) {
  const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const presence = labels.map(label => ({ label, value: 0 }));
  const moodAcc = labels.map(label => ({ label, value: 0 }));
  const moodCounts = labels.map(() => 0);
  let total = 0;

  logs.forEach(log => {
    const idx = (new Date(log.created_at).getDay() + 6) % 7;
    presence[idx].value += log.duration_minutes || 0;
    total += log.duration_minutes || 0;
  });

  moods.forEach(m => {
    const idx = (new Date(m.created_at).getDay() + 6) % 7;
    moodAcc[idx].value += MOOD_SCORES[m.mood] || 3;
    moodCounts[idx]++;
  });

  moodAcc.forEach((d, i) => {
    if (moodCounts[i] > 0) d.value = d.value / moodCounts[i];
  });

  return { presence, mood: moodAcc, total };
}

function buildMonthData(
  logs: { duration_minutes: number; created_at: string }[],
  moods: { mood: string; created_at: string }[]
) {
  const now = new Date();
  const buckets: { label: string; presenceVal: number; moodSum: number; moodCount: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    buckets.push({
      label: i % 5 === 0 ? formatDateLabel(d) : getDayOfWeekLabel(d),
      presenceVal: 0,
      moodSum: 0,
      moodCount: 0,
    });
    // Tag with date key for matching
    (buckets[buckets.length - 1] as Record<string, unknown>)._key = key;
  }

  let total = 0;
  logs.forEach(log => {
    const key = new Date(log.created_at).toISOString().split('T')[0];
    const b = buckets.find(b => (b as Record<string, unknown>)._key === key);
    if (b) {
      b.presenceVal += log.duration_minutes || 0;
      total += log.duration_minutes || 0;
    }
  });

  moods.forEach(m => {
    const key = new Date(m.created_at).toISOString().split('T')[0];
    const b = buckets.find(b => (b as Record<string, unknown>)._key === key);
    if (b) {
      b.moodSum += MOOD_SCORES[m.mood] || 3;
      b.moodCount++;
    }
  });

  // Show every 5th label to avoid crowding
  const presence = buckets.map((b, i) => ({
    label: i % 5 === 0 ? b.label : '',
    value: b.presenceVal,
  }));
  const mood = buckets.map((b, i) => ({
    label: i % 5 === 0 ? b.label : '',
    value: b.moodCount > 0 ? b.moodSum / b.moodCount : 0,
  }));

  return { presence, mood, total };
}

function computeInsights(
  currentMoods: { mood: string }[],
  prevMoods: { mood: string }[],
  totalMinutes: number,
  prevTotalMinutes: number,
): Insight[] {
  const insights: Insight[] = [];

  // Mood comparison
  if (currentMoods.length > 0 && prevMoods.length > 0) {
    const currAvg = currentMoods.reduce((s, m) => s + (MOOD_SCORES[m.mood] || 3), 0) / currentMoods.length;
    const prevAvg = prevMoods.reduce((s, m) => s + (MOOD_SCORES[m.mood] || 3), 0) / prevMoods.length;
    const diff = prevAvg > 0 ? Math.round(((currAvg - prevAvg) / prevAvg) * 100) : 0;

    if (diff > 0) {
      insights.push({
        icon: 'trending_up',
        color: '#f9bd24',
        title: `${diff}% más positividad`,
        description: 'Tu estado de ánimo ha mejorado respecto al periodo anterior. ¡Sigue así!',
      });
    } else if (diff < 0) {
      insights.push({
        icon: 'trending_down',
        color: '#f9bd24',
        title: `${Math.abs(diff)}% menos positividad`,
        description: 'Tu estado de ánimo ha bajado un poco. Una meditación corta puede ayudarte.',
      });
    } else {
      insights.push({
        icon: 'trending_flat',
        color: '#f9bd24',
        title: 'Ánimo estable',
        description: 'Tu estado de ánimo se mantiene constante. La consistencia es clave.',
      });
    }
  } else if (currentMoods.length === 0) {
    insights.push({
      icon: 'mood',
      color: '#f9bd24',
      title: 'Sin registros de ánimo',
      description: 'Registra cómo te sientes cada día para ver tu evolución aquí.',
    });
  }

  // Practice comparison
  if (totalMinutes > 0 && prevTotalMinutes > 0) {
    const diff = Math.round(((totalMinutes - prevTotalMinutes) / prevTotalMinutes) * 100);
    if (diff > 0) {
      insights.push({
        icon: 'local_fire_department',
        color: '#2dd4bf',
        title: `${diff}% más práctica`,
        description: `Practicaste ${totalMinutes} min este periodo vs ${prevTotalMinutes} min el anterior.`,
      });
    } else if (diff < 0) {
      insights.push({
        icon: 'schedule',
        color: '#2dd4bf',
        title: `${Math.abs(diff)}% menos práctica`,
        description: `Practicaste ${totalMinutes} min este periodo. ¡Intenta dedicar unos minutos hoy!`,
      });
    }
  } else if (totalMinutes > 0) {
    insights.push({
      icon: 'emoji_events',
      color: '#2dd4bf',
      title: `${totalMinutes} min de presencia`,
      description: 'Estás construyendo tu práctica. Cada minuto cuenta.',
    });
  } else {
    insights.push({
      icon: 'self_improvement',
      color: '#2dd4bf',
      title: 'Comienza tu práctica',
      description: 'Aún no hay sesiones registradas. Prueba el Cronómetro Zen.',
    });
  }

  return insights;
}

export function useStatistics() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<Timeframe>('Semana');
  const [moodData, setMoodData] = useState<DayData[]>([]);
  const [presenceData, setPresenceData] = useState<DayData[]>([]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [moodLabel, setMoodLabel] = useState('--');
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const days = timeframe === 'Semana' ? 7 : 30;
      const since = new Date();
      since.setDate(since.getDate() - days);
      const prevSince = new Date(since);
      prevSince.setDate(prevSince.getDate() - days);

      // Current period
      const [{ data: logs }, { data: moods }] = await Promise.all([
        supabase
          .from('practice_logs')
          .select('duration_minutes, created_at')
          .eq('user_id', user.id)
          .gte('created_at', since.toISOString()),
        supabase
          .from('mood_checkins')
          .select('mood, created_at')
          .eq('user_id', user.id)
          .gte('created_at', since.toISOString()),
      ]);

      // Previous period (for comparison)
      const [{ data: prevLogs }, { data: prevMoods }] = await Promise.all([
        supabase
          .from('practice_logs')
          .select('duration_minutes, created_at')
          .eq('user_id', user.id)
          .gte('created_at', prevSince.toISOString())
          .lt('created_at', since.toISOString()),
        supabase
          .from('mood_checkins')
          .select('mood, created_at')
          .eq('user_id', user.id)
          .gte('created_at', prevSince.toISOString())
          .lt('created_at', since.toISOString()),
      ]);

      const currentLogs = logs || [];
      const currentMoods = moods || [];

      // Build chart data based on timeframe
      const chartData = timeframe === 'Semana'
        ? buildWeekData(currentLogs, currentMoods)
        : buildMonthData(currentLogs, currentMoods);

      // Overall mood label
      const avgMood = currentMoods.length > 0
        ? currentMoods.reduce((s, m) => s + (MOOD_SCORES[m.mood] || 3), 0) / currentMoods.length
        : 0;

      // Previous period total minutes
      const prevTotal = (prevLogs || []).reduce((s, l) => s + (l.duration_minutes || 0), 0);

      setPresenceData(chartData.presence);
      setMoodData(chartData.mood);
      setTotalMinutes(chartData.total);
      setMoodLabel(MOOD_LABELS[Math.min(Math.round(avgMood), 5)]);
      setInsights(computeInsights(currentMoods, prevMoods || [], chartData.total, prevTotal));
    };

    fetchStats();
  }, [user, timeframe]);

  return { timeframe, setTimeframe, moodData, presenceData, totalMinutes, moodLabel, insights };
}
